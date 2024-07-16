const express=require('express');
const app=express();
const db=require('./db');
// const Person=require('./models/person');
// const MenuItem=require('./models/menu');
const passport=require('./auth');
// const localStrategy=require('passport-local').Strategy;

const bodyParser=require('body-parser');
app.use(bodyParser.json())


const router1=require('./routes/personRoutes');
const router2=require('./routes/menuRoutes');

//middleware function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`)
    next();
}

app.use(logRequest)


app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false});

app.use('/menu',localAuthMiddleware,router2);
app.use('/person',localAuthMiddleware,router1);

app.get('/',localAuthMiddleware,function(req, res){
    res.send("hello dude")
})
//comment for testing purposes
app.listen(3000);