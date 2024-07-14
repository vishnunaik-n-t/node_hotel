const express=require('express');
const app=express();
const db=require('./db');
const Person=require('./models/person');
const MenuItem=require('./models/menu');

const bodyParser=require('body-parser');
app.use(bodyParser.json())



const router1=require('./routes/personRoutes');
const router2=require('./routes/menuRoutes');
app.use('/menu',router2);
app.use('/person',router1);

app.get('/',function(req, res){
    res.send("hello dude")
})
//comment for testing purposes
app.listen(3000);