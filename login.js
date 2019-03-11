//Login Account


function logIn() {
  //Takes information from index.html as input for email and password.
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var success = 0;

  //Iterates through JSON file to check if the information is an accepted account.
  for(i = 0; i < users.accounts.length; i++) {
    if(email == users.accounts[i].email && password == users.accounts[i].password) {
      success += 1;
      alert("Successful Login!");
      window.location.href = "search.html";
      break;
    }
  }

  //Shows alert if the email or password is incorrect.
  if(success == 0) {
    alert("Incorrect email or password! Please try again.");
  }
};
