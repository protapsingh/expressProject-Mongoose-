require('./model/db');
const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const exphbs=require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app=express();
const employeeRouter=require('./route/employeeRouter');
const userRouter=require('./route/userRouter');
const welcomeRouter=require('./route/welcomeRouter');

app.use(express.static(path.join(__dirname)));

app.use(express.static(path.join(__dirname, 'public')));
//for public folder files
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//use cookie and session
app.use(cookieParser());
app.use(session({
    secret: 'secret',//it is used to cookie handling
    resave: false,
    saveUninitialized: false
}));

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs');

app.use('/',welcomeRouter);
app.use('/employee',employeeRouter);
app.use('/user',userRouter);

app.listen(8080,()=>{
    console.log('port is listening to 8080');
});
