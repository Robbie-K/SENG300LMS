//Login Account
function login(form) {
  var data = JSON.parse(accounts);
  var location = '';
  var username = document.getElementById("username").value
  var password = document.getElementById("password").value

  for(i=0; i<JSON.parse(accounts).length; i++) {
    if (username == data[i].email && password == data[i].password) {
      location = "page1.html"; //Change name to whatever the file is named for the homepage
      console.log(username + " successfully logged in!");
    }
    else {
      alert("Incorrect username or password!");
    }
  }
}

login();
