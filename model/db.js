const mongoose =require ('mongoose');

const url='mongodb://localhost:27017/expressProject';
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false},(err)=>{
    if (!err){
        console.log('Database successfully connected');
    }else{
        console.log('error in database conncection');
    }
});
require('./employeeModel');
require('./userModel');