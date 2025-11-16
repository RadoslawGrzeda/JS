const e = require('express');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render("users");
  // res.send('respond with a resource');
});

router.post('/', function(req, res,next){
  var username = req.body.Username;
  var email = req.params.Email;
  // validateUsername(username,"usernameError",res,req,next);
  validateEmail(email,"emailError",res,req,next);


});


function validateUsername(username,spanError,res,req,next){
  const usernameValue=username;
  if(usernameValue.length<5 || usernameValue.length>15){
        return setError(spanError,res,'Username must be between 5 and 15 characters long.');}
  else{
    res.render("users",{usernameError:""});
    next()
    console.log(username)
    }
  }
  
  function validateEmail(email,spanError,res,req,next){
      const emailValue=email;
      const regex='^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$';
      // if(!emailValue.match(regex)){
      // if(regex.matchAll(emailValue).length===0){
      if(emailValue.length<5 || emailValue.length>50){
      // if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/.test(emailValue)){
      return setError(spanError,res,'Username must be between 5 and 15 characters long.');
      }else{
       res.render("users",{emailError:""});
    next()
      console.log(emailValue)
      }
  }


function setError(errorEl,res,message){
    res.render('users',{[errorEl]:message});
    // input.classList.add("error");
    // return false;
}

function setSuccess(input,errorEl){1
    console.log(input + "is success");
    errorEl.innerText="";
    input.classList.remove("error");
    return true;
}


function validatePassword(password){
    const upper=/[A-Z]/;
    const digit=/[0-9]/;
    const passwordValue=password.value.trim();
    if(passwordValue.length<8){
        return setError(password,passwordError,'Password must be at least 8 characters long.');
    }
    else if(!upper.test(passwordValue)){
        return setError(password,passwordError,'Password must contain at least one uppercase letter.');
    }else if(!digit.test(passwordValue)){
        return setError(password,passwordError,'Password must contain at least one digit.');
    }else {
        return setSuccess(password,passwordError);
    }
}

function validateAgainPassword(confirmPassword)
{
    const confirmPasswordValue=confirmPassword.value.trim();
    const passwordValue=password.value.trim();
    if (confirmPasswordValue===""){
        return setError(confirmPassword,confirmPasswordError,'Please confirm your password.');
    }else {
    if(confirmPasswordValue !==passwordValue){
        return setError(confirmPassword,confirmPasswordError,'Passwords do not match.');
    }
    else{
        return setSuccess(confirmPassword,confirmPasswordError);
}
 }}

// function setError(input,errorEl,message){
//     errorEl.innerText=message;
//     input.classList.add("error");
//     return false;
// }

// function setSuccess(input,errorEl){1
//     console.log(input + "is success");
//     errorEl.innerText="";
//     input.classList.remove("error");
//     return true;
// }

// function clearErrors(){
//     usernameError.innerText="";
//     emailError.innerText="";
//     passwordError.innerText="";
//     confirmPasswordError.innerText="";
// }



module.exports = router;
