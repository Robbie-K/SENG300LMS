<<<<<<< HEAD
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
=======
//Login Account

// Called on form submission from index.html

function logIn() {
	//Takes information from index.html as input for email and password.
	let email = document.getElementById('email');
	let password = document.getElementById('password');


	let success;

	let userQuery = database.collection("users").where("email", "==", email.value);

	userQuery.get().then(function(snapshot) {
		if (!snapshot.empty) {
			let user = snapshot.docs[0];

			let fetchedPassword = user.get("password");
			if (fetchedPassword == password.value) {
				window.location.href = "search.html";
			} else {
				let errorSpan = document.getElementById("error");
				errorSpan.innerHTML = "Email or password are invalid.";

				email.value = "";
				password.value = "";
			}

		}
	});


};
>>>>>>> master
