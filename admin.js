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
    document.getElementById('approve').onclick = function() {
      database.collection("users").doc(firstName + " " + lastName).set({
        firstName: firstName,
        lastName: lastName,
        id: id,
        email: email,
        password: password
      }).then(function() {
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
        make_alert(firstName + " " + lastName + " has been successfully approved.", "");
      });
    }
  });
}

//Allows admin to remove users based on certain criteria.
function removeUser(name) {
  var USERS = 1;
  var NEW_USERS = 0;
  var section = undefined;


  //Checks if the users already exists in the database.
  var doc1 = database.collection("users").doc(name);
  var doc2 = database.collection("newUsers").doc(name);

  checkDoc(doc1).then(function (doc){
    if (doc != undefined) {
      section = USERS;
    } else {
      // checkDoc(doc2).then(function(doc) {
      //   if (doc != undefined) {
      section = NEW_USERS;
    };
  })
  //Gets the users information from either "newUsers" or "users".
  .then(function() {
    if (section == USERS) {
      var doc = database.collection("users").doc(name);
    } else {
      var doc = database.collection("newUsers").doc(name);
    };
    return doc.get();
  }).then(function(doc) {
    var firstName = doc.get("firstName");
    var lastName = doc.get("lastName");
    var id = doc.get("id");
    var email = doc.get("email");
    var password = doc.get("password");
    if (section == USERS) {
      database.collection("oldUsers").doc(firstName + " " + lastName).set({
        firstName: firstName,
        lastName: lastName,
        id: id,
        email: email,
        password: password
      });
      return database.collection("users").doc(name).collection("History").doc("Current").get()
    } else {
      return undefined;
    }

  }).then(function(current) {
    //If the user was in "users" collection, then it moves the information into
    //the "oldUsers" collection.
    if (current != undefined) {

      var id1 = current.get("ID1");
      var id2 = current.get("ID2");
      var id3 = current.get("ID3");
      var id4 = current.get("ID4");
      var id5 = current.get("ID5");
      var book1Name = current.get("book1Name");
      var book2Name = current.get("book2Name");
      var book3Name = current.get("book3Name");
      var book4Name = current.get("book4Name");
      var book5Name = current.get("book5Name");
      var numBooks = current.get("booksCheckedOut");
      var dateOut1 = current.get("dateOut1");
      var dateOut2 = current.get("dateOut2");
      var dateOut3 = current.get("dateOut3");
      var dateOut4 = current.get("dateOut4");
      var dateOut5 = current.get("dateOut5");
      var dateRet1 = current.get("dateRet1");
      var dateRet2 = current.get("dateRet2");
      var dateRet3 = current.get("dateRet3");
      var dateRet4 = current.get("dateRet4");
      var dateRet5 = current.get("dateRet5");
      var feesOwed = current.get("feesOwed");
      var feesPaid = current.get("feesPaid");
      var feesTotal = current.get("feesTotal");



      database.collection("oldUsers").doc(name).collection("History").doc("Current")
      .set( {
        ID1: id1,
        ID2: id2,
        ID3: id3,
        ID4: id4,
        ID5: id5,
        book1Name: book1Name,
        book2Name: book2Name,
        book3Name: book3Name,
        book4Name: book4Name,
        book5Name: book5Name,
        booksCheckedOut: numBooks,
        dateOut1: dateOut1,
        dateOut2: dateOut2,
        dateOut3: dateOut3,
        dateOut4: dateOut4,
        dateOut5: dateOut5,
        dateRet1: dateRet1,
        dateRet2: dateRet2,
        dateRet3: dateRet3,
        dateRet4: dateRet4,
        dateRet5: dateRet5,
        feesOwed: feesOwed,
        feesPaid: feesPaid,
        feesTotal: feesTotal
      }).then(doc1.delete());
    } else {
      doc2.delete();
    };
    make_alert(firstName + " " + lastName + " has been successfully removed.", "");
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

function checkDoc(doc1) {
  return (doc1.get().then(function(doc) {
    if (doc.exists) {
      return doc1;
    }  else {
      return undefined;
    };
  }));
}

function removeMessage(response) {
  var contact = database.collection("contact").doc(response);
  contact.delete();
};
