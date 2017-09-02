$('#btn').on('click', function(){
  //get email and password
  var Remail = document.getElementById('userName').value;
  var Rpassword = document.getElementById('passWord').value;
  console.log("email: " + Remail);
  console.log("pass: " + Rpassword);

  var value = {
    email : Remail,
    password : Rpassword
  };

  //send object to api
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/login',
    data: value,
    success: function(cb){
      console.log('sent data to server');
      console.log(cb);
      if(cb)
      {
        sessionStorage.login = true;
        window.location="../admin.html";
      }
      else{
        var failMessage = document.getElementById('failMessage');
        failMessage.setAttribute("class", "alert alert-danger");
        failMessage.setAttribute("role", "alert");
        failMessage.innerHTML = "Enter a valid email address or password";
      }
    },
    error: function(){
      console.log('error');
    }
  });
});
