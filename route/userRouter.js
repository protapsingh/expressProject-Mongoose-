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

router.get('/',(req,res)=>{
    res.send("welcome jacky");
});


module.exports=router;