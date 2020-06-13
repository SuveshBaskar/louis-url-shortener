const mongoose = require('mongoose');
const config = require('../config.json');

const dbURI = config.MONGO.MONGO_URI;

const connectDB = async ()=>{
    try {
        await mongoose.connect(dbURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connected");
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB; 