const express=require('express');
const mongoose=require('mongoose');
const User=mongoose.model('User');
const bcrypt = require('bcrypt');

exports.userCreate=(req,res)=>{
    res.render("user/signUp",{viewTitle:'Sign Up Here!',layout:'welcomeLayout.hbs'});
}
exports.userStore=async (req,res,next)=>{
    // res.send(req.file);
    var exist_user= await User.findOne({email:req.body.email});
    if(exist_user){
        res.send("User Exist");
    }else{

        const user= new User();
        var file=req.file;
        if(!file){
            req.body.image="";
        }else{
            req.body.image=file.filename;
        }
        add_user(req,res);
    }
   

}

function add_user(req,res){

   bcrypt.hash(req.body.password, 10, function(err, hash) {
   var password=hash;
   const user= new User();
   user.fullname=req.body.fullname;
   user.email=req.body.email;
   user.password=password;
   user.city=req.body.city;
   user.mobile=req.body.mobile;
   user.image=req.body.image;

   user.save((err,doc)=>{
       if (!err){
           res.send('successfully saved');
       }else{
        throw err;
       } 
   })
  });
  
   
}

exports.userLogin=(req,res)=>{
    res.render("user/login",{viewTitle:'Login Here!',layout:'welcomeLayout.hbs'});
}