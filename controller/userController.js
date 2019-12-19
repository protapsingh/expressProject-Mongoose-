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
        const msg="Email already exists!";
        res.render('user/signUp',{viewTitle:'Sign Up Here!' ,layout:'welcomeLayout.hbs',message:msg,user:req.body}); 
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

exports.userLogin=(req,res)=>{
    res.render("user/login",{viewTitle:'Login Here!',layout:'welcomeLayout.hbs'});
}

exports.userLoginPost= async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    const user= await User.findOne({email:email});
    if(user){
        bcrypt.compare(password, user.password, function(err, match) {
            if(match) {
             
             req.session.user_id=user._id;
             const data= User.findById({_id:req.session.user_id},(err,data)=>{
                 if (err) throw err;
                 res.send( data.fullname);
             });
            }else {
                const msg="Invalid password!";
                res.render("user/login",{viewTitle:'Login Here!', error:msg,layout:'welcomeLayout.hbs'});
            } 
          });
       
    }else{
        const msg="Invalid email address!"
        res.render("user/login",{viewTitle:'Login Here!', error:msg,layout:'welcomeLayout.hbs'});
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
           const msg="Successfully Registered! Login now!"
         res.render("user/login",{viewTitle:'Login Here!', message:msg,layout:'welcomeLayout.hbs'});

       }else{
        if(err.name=='ValidationError'){
            handleValidationError(err,req.body);
            res.render('user/signUp',{viewTitle:'Sign Up Here!' ,layout:'welcomeLayout.hbs',user:req.body}); 
            }
            else{
                 console.log('error during record insertion: '+ err);
            }
       } 
   })
  });
  
   
}

function handleValidationError(err,body){
    for(field in err.errors)
    {
         switch(err.errors[field].path)
         {
              case 'fullname':
              body['fullNameError']=err.errors[field].message;
              break;
              case 'email':
              body['emailError']=err.errors[field].message;
              break;
              case 'password':
              body['passwordError']=err.errors[field].message;
              break;
              case 'city':
              body['cityError']=err.errors[field].message;
              break;
              case 'mobile':
              body['mobileError']=err.errors[field].message;
              break;
              case 'image':
              body['imageError']=err.errors[field].message;
              break;
         }
    }
}


