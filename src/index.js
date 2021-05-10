const app = require("./app");
require("dotenv").config();
const port = process.env.PORT;
app.listen(port || 3000, () => {
	console.log("Server is up on port " + port);
});
