const mongoose=require('mongoose');

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    age:{ 
        type:Number
    },

    work:{
        type:String,
        enum:['chef', 'waiter', 'manager'],
        required:true,
    },

    mobile:{
        type:Number,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    address:{
        type:String,

    },
    salary:{
        type:Number,
        required:true
    },

    username:{
        type:String,
        require:true
    },

    password:{
        type:String,
        require:true
    }
})


const person=mongoose.model('Person',personSchema);
module.exports=person;