var express=require('express');
const router=express.Router();
const path=require('path');
const userController=require('../controller/userController');
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

router.get('/signUp',userController.userCreate);
router.post('/signUp',upload.single('image'),userController.userStore);
router.get('/login',userController.userLogin);
router.post('/login',userController.userLoginPost);
router.get('/list',userController.userList);
router.get('/edit/:id',userController.edit);
router.post('/edit',upload.single('image'),userController.update);
router.get('/delete/:id',userController.delete);





module.exports=router;