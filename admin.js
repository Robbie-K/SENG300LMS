//SENG 300 L01 - Group 10 (Robbie K., Sam L., Sandesh R., Jacob H., Bruin K.)
//Administration Controls

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD4WbKGk37cw68SM4zAA9ZakywahHyeyGI",
  authDomain: "librarymanagmentsystem-ce706.firebaseapp.com",
  databaseURL: "https://librarymanagmentsystem-ce706.firebaseio.com",
  projectId: "librarymanagmentsystem-ce706",
  storageBucket: "librarymanagmentsystem-ce706.appspot.com",
  messagingSenderId: "533299745296"
};
var app = firebase.firestore;

//Allows admin to approve user applications.
function approveUsers() {

}

//Allows admin to remove users based on certain criteria.
function removeUser(test) {
  //var name = document.getElementById('name').value;
  //var name = database.collection("users").doc(test);
  //console.log(name);
  var success = false;

  if (test == "J Smith") {
    console.log("its working");
    success = true;

    //var user = database.collection("users").get(name);
    //database.collection("oldUsers").set(user);

    database.collection("oldUsers").doc(test).delete();
    //break;
  }

  if (success == false) {
    var x = document.getElementById('wrongInfo').style.opacity = '1';
  }
}

//Remove books from library and add them to damaged book list.
function addDamagedBooks() {

}

//Allows admin to view history of orders.
function viewHistory() {
  var book = document.getElementById('book').value;
  var currentBook = database.collection("books").doc("History").collection("history");
}

//Allows admin to order new products for the library.
function orderProducts() {

}

removeUser("J Smith");
