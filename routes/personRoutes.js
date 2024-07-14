const express=require('express');
const router=express.Router();
const Person=require('./../models/person');
const { validate } = require('../models/menu');

router.post('/',async(req, res)=>{
    try {
     const data=req.body
     const newPerson=new Person(data);
     
     const response=await newPerson.save();
     console.log("data saved", response);
     res.status(200).json(response);
    } catch (error) {
     console.log(error);
     res.status(500).json({error:'got error internally'})
    }
 })
 
 router.get('/',async(req, res)=>{
     try {
         const data=await Person.find();
         console.log("data find successfully");
         res.json(data);
     } catch (error) {
         console.log("got internal error ",error);
         res.status(500).json({error: 'got error'});
     }
 })
 
 router.get('/:worktype', async(req, res)=>{
     try {
         const worktype=req.params.worktype;
         if(worktype=='chef' || worktype=='manager' || worktype=='waiter'){
             const response=await Person.find({work:worktype});
             res.status(200).json(response);
         }else{
             res.status(404).json({error:'invalid work type'})
         }
     } catch (error) {
         console.log("got internal error ",error);
         res.status(500).json({error: 'got error'});
     }
 })

 router.put('/:id',async(req, res)=>{
    try {
        const personId=req.params.id;
    const updatedperson=req.body;
    const response=await Person.findByIdAndUpdate(personId,updatedperson,{
        new:true,
        runValidators:true,
    })
    if(!response){
        res.status(404).json({
            error: 'id is not valid'
        })
    }

    res.status(200).json("data updated successfully");

    } catch (error) {
        console.log("got internal error ",error);
        res.status(500).json({error: 'got error'});
    }
})

router.delete('/:id',async(req, res)=>{
    try {
        const personId=req.params.id;
     
    const response=await Person.findByIdAndDelete(personId)
    if(!response){
        res.status(404).json({
            error: 'id is not valid'
        })
    }

    res.status(200).json("data deleted successfully");

    } catch (error) {
        console.log("got internal error ",error);
        res.status(500).json({error: 'got error'});
    }
})


 module.exports=router;