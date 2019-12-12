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

router.get('/',employeeController.create);
router.post('/',upload.single('image'),employeeController.add_employee);
router.get('/list',employeeController.employee_list);
router.get('/:id',employeeController.edit_employee);
router.get('/delete/:id',employeeController.delete_employee);

module.exports=router;