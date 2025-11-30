const { error } = require('console');
var express = require('express');
var path = require('path');
// const { use } = require('react');
var router = express.Router();

// Serve the static index.html for root route
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/static/index.html'));
});

router.post('/register', function(req, res ) {
const {username,email,password,confirmPassword}=req.body
// usr=username.value
// console.log(usr)
// console.log(username)

var error={}
if(!validateEmail(email))
  error.email='Email must be valid'

if(!validateUsername(username))
  error.username='Username must be between 5 and 15 characters long'

var pass=validatePassword(password)
if(pass!==true)
  error.password=pass

var confirmPass=validateAgainPassword(confirmPassword,password)
if(confirmPass!==true)
  error.confirmPassword=confirmPass
// const validatePassResult=validatePassword(password)
// console.log(validatePassResult)
// console.log(validatePassResult)
// if(!validatePassResult(password))
// error.password=validatePassResult
// console.log(validatePassResult)
// var validateConfirmPassResult=validateAgainPassword(confirmPassword)
// if(!validateConfirmPassResult)
// error.confirmPassword=validateConfirmPassResult

if(Object.keys(error).length===0)
  res.status(200).json({message:'Registration successful!'})
else
  res.status(400).json({error});

});

function validateEmail(email) {
  const regex='^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$';
  return email.match(regex);
}
function validateUsername(username){
    if(username.length<5 || username.length>15){
        return false; 
    }
    return true;
}
function validatePassword(password){
    const upper=/[A-Z]/;
    const digit=/[0-9]/;
    const err=[];
    const passwordValue=password.trim();
    if(passwordValue.length<8){
        err.push('Password must be at least 8 characters long.');
    }
    else if(!upper.test(passwordValue)){
        err.push('Password must contain at least one uppercase letter.');
    }else if(!digit.test(passwordValue)){
        err.push('Password must contain at least one digit.');
    } 
    if (err.length>0){
        return err;
    }else {
        return true;
  }}
  
function validateAgainPassword(confirmPassword,password)
{
  var error=[];
    const confirmPasswordValue=confirmPassword.trim();
    const passwordValue=password.trim();
    if  (confirmPasswordValue !==passwordValue){
        error.push('Passwords do not match.');
    }
    if (error.length>0){
        return error;
    }else {
        return true;
  }
}


module.exports = router;
