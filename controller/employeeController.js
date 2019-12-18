
const express=require('express');
const mongoose=require('mongoose');
const Employee=mongoose.model('Employee');

//function for render in home page
exports.create=(req,res)=>{
     res.render('employee/addOrEdit',{viewTitle:'Insert Here!'});
}

//export function for employee add
exports.add_employee=(req,res,next)=>{
     const file = req.file
     if (!file) {
     req.body.image="";
     }else{
          req.body.image=file.filename;
     }

 //sending data to add or update route
     if(req.body.id==''){
          insert_employee(req,res);
     }else{
          
          update_employee(req,res);
     }
     

}

exports.employee_list=(req,res)=>{
     Employee.find((err,data)=>{
      if(!err){
          res.render('employee/list',{viewTitle:'Employee List',list:data});
      }else{
           console.log('Error while reriving employeee data:'+err);
      }
     })
     
}

exports.edit_employee=(req,res)=>{
     Employee.findById(req.params.id,(err,data)=>{
      if(!err){
           res.render('employee/addOrEdit',{viewTitle:"Update Employee", employee:data});
      }
     })
     
     
}
exports.delete_employee=(req,res)=>{
     Employee.findOneAndRemove({_id:req.params.id},(err,doc)=>{
          res.redirect('/employee/list');
     })

}
// creating a function which will used to show all error messages

//insert new employee
function insert_employee(req,res){
     var employee =new Employee();
     employee.fullname=req.body.fullname;
     employee.email=req.body.email;
     employee.mobile=req.body.mobile;
     employee.city=req.body.city;
     employee.image=req.body.image;
     employee.save((err,doc)=>{
     if(!err){
         
          res.redirect('/employee/list');
     }
     else{
          if(err.name=='ValidationError'){
          handleValidationError(err,req.body);
          res.render('employee/addOrEdit',{viewTitle:'Insert Employee',employee:req.body}); 
          }
          else{
               console.log('error during record insertion: '+ err);
          }
        }
});

}

//update nmew employee
function update_employee(req,res){
     Employee.findOneAndUpdate({_id:req.body.id},req.body,{new: true},(err,data)=>{
          if(!err){
               res.redirect('employee/list');
          }else{
               if(err.name=='ValidationError'){
                    handleValidationError(err,req.body);
                    res.render('employee/addOrEdit',{viewTitle:'Update Employee',employee:req.body}); 
                    }
                    else{
                         console.log('error during record insertion: '+ err);
                    }
          }

     })
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
               case 'mobile':
               body['mobileError']=err.errors[field].message;
               break;
               case 'city':
               body['cityError']=err.errors[field].message;
               break;
               case 'image':
               body['imageError']=err.errors[field].message;
               break;
          }
     }
}

