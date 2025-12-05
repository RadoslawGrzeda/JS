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
    const response = await fetch('/register',{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(object)
});

var res = await response.json();

if (response.status===200)
success.innerHTML='Successful registration'

if(res.error){
if(res.error.username){
usernameError.innerHTML=res.error.username;}

if(res.error.email){
emailError.innerHTML=res.error.email;}

if(res.error.password){
passwordError.innerHTML=res.error.password;}

if(res.error.confirmPassword){
confirmPasswordError.innerHTML=res.error.confirmPassword;}

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
    li.innerText=`Username: ${usersRes[i].username}, Email: ${usersRes[i].email}`;
    userList.appendChild(li);
}
console.log(usersRes);
}
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
