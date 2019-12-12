
const express =require('express');
const mongoose= require('mongoose');

exports.home=(req,res)=>{
    res.render('welcome',{viewTitle:'Welcome to my express website',layout:'welcomeLayout.hbs'});
}