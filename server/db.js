
require('dotenv').config();

const mongoose=require("mongoose")

const URL=process.env.MONGO_URI;

const mongoDB=async()=>{
    try {
        await mongoose.connect(URL,{
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
        })
        console.log("mongodb connection successfull");
    } catch (error) {
        console.log("Error in connection");
    }
}

module.exports=mongoDB;