//Login Account


function logIn() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var success = 0;

  for(i = 0; i < users.accounts.length; i++) {
    if(email == users.accounts[i].email && password == users.accounts[i].password) {
      success += 1;
      alert("Successful Login!");
      window.location.href = "search.html";
      break;
    }
  }

  if(success == 0) {
    alert("Incorrect email or password! Please try again.");
  }
};
