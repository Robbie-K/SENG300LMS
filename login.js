//Login Account


function logIn() {
  //Takes information from index.html as input for email and password.
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var success = false;

  //Iterates through JSON file to check if the information is an accepted account.
  for(i = 0; i < users.accounts.length; i++) {
    if(email == users.accounts[i].email && password == users.accounts[i].password) {
      success = true;
      // alert("Successful Login!");
      window.location.href = "search.html";
      break;
    }
  }

  //Shows alert if the email or password is incorrect.
  if(success == false) {
        var x = document.getElementById("wrongInfo").style.opacity = '1';
        //x.style.opacity = '1';
    // alert("Incorrect email or password! Please try again.");
  }
};
