const mongoose = require("mongoose")

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
	} catch (err) {
		console.log(err);

	}
}

module.exports = connectDB