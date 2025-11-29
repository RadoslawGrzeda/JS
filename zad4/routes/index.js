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
console.log(username)

var error={}
if(username.length<4)
error.username='Username must be at least 4 characters long'
if(!validateEmail(email))
error.email='Email must be valid'

res.status(400).json({error});

});

function validateEmail(email) {
  const regex='^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$';
  return email.match(regex);
}



module.exports = router;
