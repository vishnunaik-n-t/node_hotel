const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const Person=require('./models/person');


passport.use(new localStrategy(async (username, password, done)=>{
    //authentication 
    try {
        // console.log("recived credentials ",username,password);
        const user=await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message: 'INVALID USERNAME'});
        }
        const isPasswordMatch=user.password===password?true:false;
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null,false,{message: 'INVALID PASSWORD'});
        }
    } catch (error) {   
        return done(error);
    }
}))

module.exports=passport;

