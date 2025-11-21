var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render("registration");
});

function checkUsername(req,res,next){
    const Username=req.body.Username;
    const error = req.validationErrors || {}

    if(Username.length <5 || Username.length>15)
        error.usernameError="Username must be between 5 and 15 characters long"

    req.validationErrors=error
    next();
}
function checkEmail(req,res,next){
    const Email=req.body.Email;
    const error = req.validationErrors || {}
    
    const regex='^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$';
    if(!Email.match(regex))
        error.emailError="Email is not valid"

    req.validationErrors=error
    next();
}
function validatePassword(req,res,next){
    const upper=/[A-Z]/;
    const digit=/[0-9]/;
    const passwordValue=req.body.Password;
    const errors=req.validationErrors || {}

    if(passwordValue.length<8){
        errors.passwordError='Password must be at least 8 characters long.';
    }
    else if(!upper.test(passwordValue)){
    errors.passwordError='Password must contain at least one uppercase letter.';
    }else if(!digit.test(passwordValue)){
    errors.passwordError='Password must contain at least one digit.';
    }
    req.validationErrors=errors
    next()
}


function validateAgainPassword(req,res,next){
    const confirmPasswordValue=req.body.ConfirmPassword;
    const password=req.body.Password;
    const errors=req.validationErrors || {}
    if (confirmPasswordValue===""){
    errors.passwordConfirmError='Please confirm your password.';
    }else if(confirmPasswordValue !==password){
    errors.passwordConfirmError='Passwords do not match.';
    }
    req.validationErrors=errors
    next();
    
}

function endWithRender(req,res,next){
    const errors = req.validationErrors || {}
    if(Object.keys(errors).length > 0){
        return res.render('registration',errors)
    }
    next()
} 

router.post('/',
            checkUsername,
            checkEmail,
            validatePassword,
            validateAgainPassword,
            endWithRender,
            function(req, res,next){

res.render('registration',{successMessage:"Registration successful!"})

});

module.exports = router;