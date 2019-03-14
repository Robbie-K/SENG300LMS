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



//Get User Information
function userFees() {
  var fees = database.collection("users").doc("Sam Laurie").collection("History").doc("S6g25Ra2kHJQKI1gYTLi");
  fees.get().then(function(doc) {
    console.log(doc.get("feesOwed"));
    var feesOwed = doc.get("feesOwed");
    var feesPaid = doc.get("feesPaid");
    var feesTotal = doc.get("feesTotal");

    var table = document.getElementById("t01");
    var feesTable = table.insertRow(1);
    var feesTable2 feesTable.insertCell(1);
    feesTable2.innerHTML = feesOwed;

    window.alert("Refreshed");
  });

  //Get user fees
  //Get user books borrowed
  //Get user return dates
}

function search(){
  var book = database.collection("books").doc();
  book.get().then(function(doc) {
    console.log(doc.get("book_name"));
    var title = doc.get("book_name");
    var author = doc.get("book_author");
    var published = doc.get("Published");
    var quantity = doc.get("Quantity");
    var id = doc.get("book_id");

    var table = document.getElementById("bookTable");
    var row = table.insertRow(1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    cell0.innerHTML = title;
    cell1.innerHTML = author;
    cell2.innerHTML = published;
    cell3.innerHTML = id;
    cell4.innerHTML = quantity;
    cell5.innerHTML = "nosoftcopy";


  });

}
