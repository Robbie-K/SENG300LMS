//SENG 300 L01 - Group 10 (Robbie K., Sam L., Sandesh R., Jacob H., Bruin K.)
//Administration Controls

//Allows admin to approve user applications.
function approveUsers() {

}

//Allows admin to remove users based on certain criteria.
function removeUser() {
  var name = document.getElementById('search').value;

  if (database.collection("users").doc(name) != null) {
    var user = database.collection("users").doc(name);

    user.get().then(function(user) {
      var firstName = user.get("firstName");
      var lastName = user.get("lastName");
      var id = user.get("id");
      var email = user.get("email");
      var password = user.get("password");

      database.collection("oldUsers").doc(firstName + " " + lastName).set({
        firstName: firstName,
        lastName: lastName,
        id: id,
        email: email,
        password: password
      });

      database.collection("users").doc(name).delete();
    });
  }
}

//Remove books from library and add them to damaged book list.
function addDamagedBooks() {
  var damagedBook = document.getElementById('book').value;

  if (database.collection("books").doc(damagedBook) != null) {
    
  }
}

//Allows admin to view history of orders.
function viewHistory() {
  var book = document.getElementById('book').value;
  var currentBook = database.collection("books").doc("History").collection("history");

  // currentBook.get().then(function(doc) {
  //   var title = doc.get("book_name");
  //   var
  // });
}

//Allows admin to order new products for the library.
function orderProducts() {

}
