//SENG 300 L01 - Group 10 (Robbie K., Sam L., Sandesh R., Jacob H., Bruin K.)
//Administration Controls

//Allows admin to approve user applications.
function approveUsers(name) {
  var person = database.collection("newUsers").doc(name);

  //Gets the current users information from newUsers to be able to transfer it
  //to "users".
  person.get().then(function(user) {
    var firstName = user.get("firstName");
    var lastName = user.get("lastName");
    var id = user.get("id");
    var email = user.get("email");
    var password = user.get("password");

    //Sets the users information into users collection in the database.
    database.collection("users").doc(firstName + " " + lastName).set({
      firstName: firstName,
      lastName: lastName,
      id: id,
      email: email,
      password: password
    });

    database.collection("users").doc(firstName + " " + lastName).collection("History").doc("Current").set({
      ID1: "",
      ID2: "",
      ID3: "",
      ID4: "",
      ID5: "",
      book1Name: "",
      book2Name: "",
      book3Name: "",
      book4Name: "",
      book5Name: "",
      booksCheckedOut: 0,
      dateOut1: "",
      dateOut2: "",
      dateOut3: "",
      dateOut4: "",
      dateOut5: "",
      dateRet1: "",
      dateRet2: "",
      dateRet3: "",
      dateRet4: "",
      dateRet5: "",
      feesOwed: 0,
      feesPaid: 0,
      feesTotal: 0
    });
    database.collection('users').doc(name).collection("History").doc("Past").set({});

    //Deletes the user from "newUsers".
    person.delete();
    alert(firstName + " " + lastName + " has been successfully approved.");
  });
}

//Allows admin to remove users based on certain criteria.
function removeUser(name) {

  //Checks if the users already exists in the database.
  if (database.collection("users").doc(name).get().then(doc => {
    if (doc.exists) {
      var user = database.collection("users").doc(name);
    }
  }));

  if (database.collection("newUsers").doc(name).get().then(doc => {
    if (doc.exists) {
      var user = database.collection("newUsers").doc(name);
    }
  }));

  //Gets the users information from either "newUsers" or "users".
  user.get().then(function(user) {
    var firstName = user.get("firstName");
    var lastName = user.get("lastName");
    var id = user.get("id");
    var email = user.get("email");
    var password = user.get("password");

    //If the user was in "users" collection, then it moves the information into
    //the "oldUsers" collection.
    if (user == "users") {
      database.collection("oldUsers").doc(firstName + " " + lastName).set({
        firstName: firstName,
        lastName: lastName,
        id: id,
        email: email,
        password: password
      });
    }

    //Deletes the user information from its collection.
    user.delete();
  });
}

//Remove books from library and add them to damaged book list.
function addDamagedBooks() {
  var name = document.getElementById('book').value;

  //Check to see if the book exists.
  if (database.collection("books").doc(name) != null) {
    var book = database.collection("books").doc(name);

    //Get the book infromation.
    book.get().then(function(book) {
      var bookName = book.get("book_name");
      var published = book.get("published");
      var quantity = book.get("quantity").value;
      var author = book.get("book_author");
      var id = book.get("book_id");

      //Copy the books information into "damagedBooks".
      database.collection("damagedBooks").doc(bookName).set({
        book_name: bookName,
        published: published,
        book_author: author,
        book_id: id,
      });
    });

    //Reduce the quantity of that book by 1 as it is now damaged.
    quantity -= 1;

    //Update the quantity of the book in "books".
    database.collection("books").doc(book).update({
      quantity: quantity
    });
  }
}

//Allows admin to view history of orders.
function viewHistory() {
  //Gets the name of the book being inputted by the admin user.
  var book = document.getElementById('book').value;
  var currentBook = database.collection("books").doc("History").collection("history");

  //Gets the name and history of the book selected.
  currentBook.get().then(function(doc) {
    var title = doc.get("book_name");
    var history = doc.get("history");
  });
}

//Allows admin to order new products for the library.
function orderProducts() {

}
