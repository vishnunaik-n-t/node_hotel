const express=require('express');
const router=express.Router();
const MenuItem=require('./../models/menu');

router.post('/', async(req, res)=>{
    try{
        const data=req.body
    const newMenu=new MenuItem(data);
    const response=await newMenu.save();
    console.log("data saved successfully");
    res.status(200).json(response);
    }catch(error){
        console.log("got an internal error");
        res.status(500).json({error:'ineternal error accured'})
    }
})

router.get('/',async (req,res)=>{
    try {
        const response=await MenuItem.find()
        res.status(200).json(response);
    } catch (error) {
        console.log("got internal error ",error);
        res.status(500).json({error: 'got error'});
    }
})

router.get('/:taste',async (req,res)=>{
    try {
         const taste=req.params.taste;
         if(taste=='sweet' || taste=='spicy' || taste=='sour')
         {
            const response=await MenuItem.find({taste:taste})
            res.status(200).json(response);
         }else
         {
            res.status(404).json({error: 'invalid taste'})
         }
    } catch (error) {
        console.log("got internal error ",error);
        res.status(500).json({error: 'got error'});
    }
})


router.put('/:id',async(req, res)=>{
    try {
        const menuid=req.params.id;
    const updatedItems=req.body;
    const response=await MenuItem.findByIdAndUpdate(menuid,updatedItems,{
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
        const menuid=req.params.id;
     
    const response=await MenuItem.findByIdAndDelete(menuid)
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