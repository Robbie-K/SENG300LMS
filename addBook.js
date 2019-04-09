// Initialize Firebase
var config = {
	apiKey: "AIzaSyD4WbKGk37cw68SM4zAA9ZakywahHyeyGI",
	authDomain: "librarymanagmentsystem-ce706.firebaseapp.com",
	databaseURL: "https://librarymanagmentsystem-ce706.firebaseio.com",
	projectId: "librarymanagmentsystem-ce706",
	storageBucket: "librarymanagmentsystem-ce706.appspot.com",
	messagingSenderId: "533299745296"
};
firebase.initializeApp(config);
var database = firebase.firestore();

// Checks to see if a specified book
// by the given author exists.
//
// If the book does exist then return
// an error message.
// Otherwise create a form to add the
// book to the database.
function checkBookExistence() {
	// Get a reference to the input fields for book name and author
	let book_name = document.getElementById("book_name");
	let book_author = document.getElementById("book_author");

	// Get a reference to the collection books
	let books = database.collection("books");

	// Set the query to look for books with the same name as the searched name
	let query = books.where("book_name", "==", book_name.value);

	// Commit the query
	query.get().then(function(querySnapshot) {
		let exists = false; // Default value for existence of book
		querySnapshot.forEach(function (documentSnapshot) {
			// Going through each book in the database to 
			// find the book that also has the specified
			// author

			// The books data (Book Name, Author, Published, ...)
			let data = documentSnapshot.data();

			if (data.book_author == book_author.value) {
				// Book Exists!
				exists = true;
			}
		});
		if (exists) {
			// Error Message
			document.getElementById("wrongInfo").style.display = "block";
		} else {
			// Create Form
			createBookForm();
		}
	});

}

// Displays a form that is defaultly hidden
// on the page.
function createBookForm() {
	document.getElementById("title").innerHTML = "Create Book";
	document.getElementById("regular-spice").style.display = "none";
	document.getElementById("extra-spicy").style.display = "block";
}

// Adds a book to the database with the
// specified values.
function createNewBook() {
	// All the inputs supplied by the user.
	let s_book_name = document.getElementById("book_name").value;
	let s_book_author = document.getElementById("book_author").value;
	let s_book_published = document.getElementById("book_published").value;
	let s_book_quantity = document.getElementById("book_quantity").value;
	let s_book_genre = document.getElementById("book_genre").value;

	// Get reference to the collection 'books'
	let books = database.collection('books');

	let size;
	books.get().then(snap => {
		// Get the total amount of books to find out new book ID
		size = snap.size + 1;

		// Add the book to the database
		books.doc(s_book_name).set({
			book_name: s_book_name,
			book_author: s_book_author,
			Published: s_book_published,
			Quantity: s_book_quantity,
			Genre: s_book_genre,
			book_id: size
		}).then(function() {
			// Add a history collection to the book to track who has which one.
			books.doc(s_book_name).collection('History').doc("history").set({});
			alert("This book been added.");
		});
	});	
}