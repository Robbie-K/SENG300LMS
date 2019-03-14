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
