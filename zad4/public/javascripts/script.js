const form = document.getElementById("RegistrationForm");
const usernameDoc = document.getElementById("Username");
const emailDoc = document.getElementById("Email");
const passwordDoc = document.getElementById('Password');
const confirmPasswordDoc=document.getElementById("ConfirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const success= document.getElementById("SuccessMessage");


form.addEventListener('submit', async e =>{   
    e.preventDefault()
    resetSpan()
    username=usernameDoc.value
    email=emailDoc.value
    password=passwordDoc.value
    confirmPassword=confirmPasswordDoc.value

var isValid=true 

if (checkPresent(username,usernameError,'Username is empty')) isValid=false
if (checkPresent(email ,emailError,'Email is empty')) isValid=false
if (checkPresent(password,passwordError,'Password is empty')) isValid=false
if (checkPresent(confirmPassword,confirmPasswordError,'Confirm Password is empty')) isValid=false
console.log(isValid)


if(isValid){
var object = {
    username,
    email,
    password,
    confirmPassword
}
// console.log(object)

    const response = await fetch('/register',{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(object)
});
var res = await response.json();
if (response.status===200)
success.innerHTML='Successfull registration'

if(res.error){
if(res.error.username){
usernameError.innerHTML=res.error.username;
}
if(res.error.email){
emailError.innerHTML=res.error.email;
}
if(res.error.password){
passwordError.innerHTML=res.error.password;
}
if(res.error.confirmPassword){
confirmPasswordError.innerHTML=res.error.confirmPassword;
}
console.log(res.status);

} 
const usersResponse = await fetch('/users',{
    method:"GET",
    headers:{
        "Content-type":"application/json"
    }
});
var usersRes = await usersResponse.json();
const userList=document.getElementById("userList");
userList.innerHTML='';
for(let i=0;i<usersRes.length;i++){
    const li=document.createElement("li");
    li.innerText=`${usersRes[i].counter}. Username: ${usersRes[i].username}, Email: ${usersRes[i].email}`;
    userList.appendChild(li);
}
console.log(usersRes);
}


// console.log(res.error.email);



// console.log('Its working fin2e')
    // console.log(user)
    
    




});

function checkPresent(element,errorElement,text){
    if(!element){
        errorElement.innerHTML=text
        return true;
    }
    return false; 
}
function resetSpan(){
    usernameError.innerHTML=''
    emailError.innerHTML=''
    passwordError.innerHTML=''
    confirmPasswordError.innerHTML=''
}
    

module.exports = router;








































// const form=document.getElementById("RegistrationForm");
// const username=document.getElementById("Username");
// const email=document.getElementById("Email");
// const password=document.getElementById("Password");
// const confirmPassword=document.getElementById("ConfirmPassword");
// const usernameError=document.getElementById("usernameError");
// const emailError=document.getElementById("emailError");
// const passwordError=document.getElementById("passwordError");
// const confirmPasswordError=document.getElementById("confirmPasswordError");
// const successMessage=document.getElementById("SuccessMessage");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     clearErrors();  
//     successMessage.innerText = "";  
//     let valid = true;

//     if (!validateUsername(username)) valid = false;
//     if (!validateEmail(email)) valid = false;
//     if (!validatePassword(password)) valid = false;
//     if (!validateAgainPassword(confirmPassword)) valid = false;

//     if (valid) {
//         successMessage.innerText = "Registration successful!";
//     }
//     else if (!valid) {
//         e.preventDefault();}
//     });

// function validateUsername(username){
//     const usernameValue=username.value.trim();
//     if(usernameValue.length<5 || usernameValue.length>15){
//         return setError(username,usernameError,'Username must be between 5 and 15 characters long.');
//     }else{
//     return  setSuccess(username,usernameError);
//     }
// }

// function validateEmail(email){
//     const emailValue=email.value.trim();
//     const regex='^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z]{2,}$';
//     if(!emailValue.match(regex)){

//         return setError(email,emailError,'Please enter a valid email address.');
//     }else{
//         return setSuccess(email,emailError);
//     }
// }

// function validatePassword(password){
//     const upper=/[A-Z]/;
//     const digit=/[0-9]/;
//     const passwordValue=password.value.trim();
//     if(passwordValue.length<8){
//         return setError(password,passwordError,'Password must be at least 8 characters long.');
//     }
//     else if(!upper.test(passwordValue)){
//         return setError(password,passwordError,'Password must contain at least one uppercase letter.');
//     }else if(!digit.test(passwordValue)){
//         return setError(password,passwordError,'Password must contain at least one digit.');
//     }else {
//         return setSuccess(password,passwordError);
//     }
// }

// function validateAgainPassword(confirmPassword)
// {
//     const confirmPasswordValue=confirmPassword.value.trim();
//     const passwordValue=password.value.trim();
//     if (confirmPasswordValue===""){
//         return setError(confirmPassword,confirmPasswordError,'Please confirm your password.');
//     }else {
//     if(confirmPasswordValue !==passwordValue){
//         return setError(confirmPassword,confirmPasswordError,'Passwords do not match.');
//     }
//     else{
//         return setSuccess(confirmPassword,confirmPasswordError);
// }
// }}
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