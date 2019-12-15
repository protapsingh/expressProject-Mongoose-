var express=require('express');
const router=express.Router();
const path=require('path');
const employeeController=require('../controller/employeeController');
const multer= require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })  
  var upload = multer({ storage: storage })
  // or use this
//   // const upload = multer({dest: './uploads/'});

router.get('/signUp',(req,res)=>{
    res.render("user/signUp",{viewTitle:'Sign Up Here!',layout:'welcomeLayout.hbs'});
});

router.get('/login',(req,res)=>{
  res.render("user/login",{viewTitle:'Login Here!',layout:'welcomeLayout.hbs'});
});


module.exports=router;