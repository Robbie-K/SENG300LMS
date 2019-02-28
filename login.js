//Login Account
var email = document.getElementById('email').value
var password = document.getElementById('password').value
var data = 'accounts.json';
var users = JSON.parse(data);

for(i = 0; i < users.length; i++) {
  if(email == users.accounts[i].email && password == users.accounts[i].password) {
    console.log(json.accounts[i].email);
    console.log(json.accounts[i].password);
    alert("Successful Login");
  }
  else {
    alert("Incorrect email or password! Please try again.");
  }
}

/*
function logIn(data) {

  for(i = 0; i < data.length; i++) {
    if (email == data.accounts[i].email && password == data.accounts[i].password) {
      alert(email + " successfully logged in!");
    }
    else {
      alert("Incorrect username or password!");
    }
  }
};
*/
