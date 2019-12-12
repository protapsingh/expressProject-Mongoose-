var express=require('express');
const router=express.Router();
const path=require('path');
const welcomeController=require('../controller/welcomeController.Js');

router.get('/',welcomeController.home);


module.exports=router;