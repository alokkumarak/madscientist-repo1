const express =require('express');
const router=express.Router();
const mongoose=require('mongoose')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const users=mongoose.model("users");

const Mustlogin=require('../middleWares/Mustlogin.js');

router.post('/signup',(req,res)=>{
    const {username,email,password,confirmPassword,profile}=req.body;

    if(!username || !email || !password || !confirmPassword){
        return res.status(405).json({ error: "fill all the required field!!" });

    }
    if(password!=confirmPassword){
        return res.status(405).json({error:"password are not matching"});
    }
    
    users.findOne({email:email})
     .then((saveUser)=>{
         if(saveUser){
             return res.status(405).json({error:"user is already exist with this same email"})
         }
         bcrypt.hash(password,15)
           .then(hashedPassword=>{
               const user=new user({
                   email,
                   username,
                   password:hashedPassword,
                   profile
               })
               user.save()
                  .then(user=>{
                      res.json({message:"Successfully registered"});
                  })
                  .catch(error=>{
                      console.log(error.message);
                  })

           })
     })
     .catch(error=>{
         console.log(error.message)
     })

})


router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(405).json({ error: "Enter email and password" });
    }
    users.findOne({ email: email })
        .then(presendUser => {
            if (!presendUser) {
                return res.status(405).json({ error: "Invalid email and password" });
            }
            //compare password with bcryptpassword
            bcrypt.compare(password, presendUser.password)
                .then(ifMatchedPassword => {
                    if (ifMatchedPassword) {
                        const generateToken = jwt.sign({ _id: presendUser._id }, process.env.JSON_WEB_TOKEN)
                        const { _id, username, profile } = presendUser;
                        res.json({ token: generateToken, message: "successfully logged in !!!", user: { _id, username, profile } });

                    }
                    else {
                        res.status(405).json({ error: "Invalid email and password" })
                    }
                })
                .catch(error => {
                    console.log(error.message);
                })
        })
        .catch(error => {
            console.log(error.message);
        })
})



module.exports = router;