const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

// Define the mongodb connection url

const mongoURL='mongodb://localhost:27017/hoteldb';

mongoose.connect(mongoURL)

const db=mongoose.connection;


db.on('connected',()=>{
    console.log("connected man");
});

db.on('disconnected',()=>{
    console.log("disconnected man");
});

db.on('error',(err)=>{
    console.log("got error man",err);
});

module.exports=db;