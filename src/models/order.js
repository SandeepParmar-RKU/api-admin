const mongoose = require("mongoose");
const validator = require("validator");
const OrderSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: true,
			trim: true,
		},
		delivered: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;
