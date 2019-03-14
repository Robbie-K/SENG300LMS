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
  var name = document.getElementById('book').value;

  if (database.collection("books").doc(damagedBook) != null) {
    var book = database.collection("books").doc(name);

    book.get().then(function(book) {
      var bookName = book.get("book_name");
      var published = book.get("published");
      var quantity = book.get("quantity").value;
      var author = book.get("book_author");
      var id = book.get("book_id");

      database.collection("damagedBooks").doc(bookName).set({
        book_name: bookName,
        published: published,
        book_author: author,
        book_id: id,
      });
    }
    quantity -= 1;
    database.collection("books").doc(book).update({
      quantity: quantity
    });
  }
}

//Allows admin to view history of orders.
function viewHistory() {
  var book = document.getElementById('book').value;
  var currentBook = database.collection("books").doc("History").collection("history");

  currentBook.get().then(function(doc) {
    var title = doc.get("book_name");
    var history = doc.collection("History");

  });
}

//Allows admin to order new products for the library.
function orderProducts() {

}
