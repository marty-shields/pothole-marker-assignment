if(sessionStorage.login){
  console.log("logged in");
}
else{
  window.location="../login.html";
}

function logout(){
  sessionStorage.removeItem("login");
  window.location="../index.html";
}
