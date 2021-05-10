const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URL;

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

//

// const add_task = new Task({
//     description:'Go out',
//     completed:true
// })
// add_task.save().then(()=>{
//     console.log(add_task);
// }).catch((error)=>{
//     console.log('error!',error);
// })
