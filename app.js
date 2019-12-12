require('./model/db');
const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const exphbs=require('express-handlebars');

const app=express();
app.use(express.static(path.join(__dirname)));

app.use(express.static(path.join(__dirname, 'public')));
//for public folder files
const employeeRouter=require('./route/employeeRouter');
const userRouter=require('./route/userRouter');
const welcomeRouter=require('./route/welcomeRouter');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.use('/',welcomeRouter);
app.use('/employee',employeeRouter);
app.use('/user',userRouter);

app.listen(8080,()=>{
    console.log('port is listening to 8080');
});
