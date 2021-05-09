const express = require("express");
const Order = require("../models/order");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/orders", auth, async (req, res) => {
	const order = new Order({
		...req.body,
		owner: req.user._id,
	});

	try {
		await order.save();
		res.status(201).send(order);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.get("/orders", auth, async (req, res) => {
	const match = {};
	if (req.query.completed) {
		match.completed = req.query.completed === "true";
	}

	const sort = {};

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(":");
		sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
	}

	try {
		await req.user
			.populate({
				path: "orders",
				match,
				options: {
					limit: parseInt(req.query.limit),
					skip: parseInt(req.query.skip),
					sort,
				},
			})
			.execPopulate();

		res.set("Content-Range", req.user.orders.length);
		var orders = JSON.parse(
			JSON.stringify(req.user.orders).split('"_id":').join('"id":')
		);

		res.status(200).send(orders);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.get("/orders/:id", auth, async (req, res) => {
	const _id = req.params.id;

	try {
		var orders = await Order.findOne({ _id, owner: req.user._id });
		if (!orders) {
			return res.status(404).send({ message: "Order not found" });
		}

		orders = JSON.parse(JSON.stringify(orders).split('"_id":').join('"id":'));

		res.status(200).send(orders);

		res.send(orders);
	} catch (e) {
		res.status(500).send(e.message);
	}
});

router.patch("/orders/:id", auth, async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "delivered"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const orders = await Order.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!orders) {
			return res.status(404).send();
		}
		updates.forEach((update) => (orders[update] = req.body[update]));
		await orders.save();
		res.send(orders);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/orders/:id", auth, async (req, res) => {
	try {
		const orders = await Order.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!orders) {
			res.status(404).send();
		}

		res.send(orders);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
