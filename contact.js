// Initialize Firebase server api
var config = {
	apiKey: "AIzaSyD4WbKGk37cw68SM4zAA9ZakywahHyeyGI",
	authDomain: "librarymanagmentsystem-ce706.firebaseapp.com",
	databaseURL: "https://librarymanagmentsystem-ce706.firebaseio.com",
	projectId: "librarymanagmentsystem-ce706",
	storageBucket: "librarymanagmentsystem-ce706.appspot.com",
	messagingSenderId: "533299745296"
};
firebase.initializeApp(config);

// setting the filter and database to be global variables to be used
var database = firebase.firestore();

// Contact Form
function collectData() {
	// Get input values from user
    var id = document.getElementById('email').value;
    var msg = document.getElementById('contact').value;


    // Get reference to the collection 'contact'
	let contact = database.collection('contact');

	// Add message to database
	let size;
	contact.get().then(snap => {
		// // Get the total amount of responses to find out new response #
		// size = snap.size + 1;

		// Add the book to the database
		contact.doc().set({
			email: id,
			message: msg
		}).then(function() {
			// Let the user know their response was submitted
			// and return them back to the login.

			alert("Message has been submitted. Thanks for the feedback!");
    		window.location.href = "index.html";
		});
	});
}
