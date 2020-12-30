const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connnection = await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("MONGO_DB Connected", connnection.connection.host);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB