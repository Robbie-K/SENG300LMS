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


function search(){
  var searchEntry = document.getElementById('search').value;
  var book = database.collection("books");
  var table = document.getElementById("bookTable");
  removeRows();
  var rowCount = 1;
  book.get().then(function(querySnapshot) {
    querySnapshot.forEach(function (documentSnapshot){
      var data = documentSnapshot.data();
      var bookname = data.book_name;
      var bookNameLower = bookname.toLowerCase();
      var searchEntryLower = searchEntry.toLowerCase();

      if(bookNameLower.includes(searchEntryLower) == true){
        var author = data.book_author;
        var published = data.Published;
        var quantity = data.Quantity;
        var id = data.book_id;

        var row = table.insertRow(rowCount);
        rowCount = rowCount + 1;
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        cell0.innerHTML = bookname;
        cell1.innerHTML = author;
        cell2.innerHTML = published;
        cell3.innerHTML = id;
        cell4.innerHTML = quantity;
        cell5.innerHTML = "nosoftcopy";
      }
    })
  });
}

function removeRows(){
  var table = document.getElementById("bookTable");
  var rowlength = table.rows.length;
  while( rowlength > 1){
    table.deleteRow(rowlength -1);
    rowlength = table.rows.length;
  }
}

var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});


function searchUser(){
  document.getElementById("userTable").style.display;
  document.getElementById("bookTable").style.display='none';

  var searchEntry = document.getElementById('search').value;
  var user = database.collection("users");
  var table = document.getElementById("userTable");
  var rowCount = 1;
  user.get().then(function(querySnapshot) {
    querySnapshot.forEach(function (documentSnapshot){
      var data = documentSnapshot.data();
      var name = data.firstName + data.lastName;
      var userNameLower = name.toLowerCase();
      var searchEntryLower = searchEntry.toLowerCase();

      if(userNameLower.includes(searchEntryLower) == true){
        var first = data.firstName;
        var last = data.lastName;
        var id = data.id;
        var email = data.email;
        var approve = document.createElement('button');
        var remove = document.createElement('button');
        approve.appendChild("Approve");
        remove.appendChild("Remove");

        var row = table.insertRow(rowCount);
        rowCount = rowCount + 1;
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        cell0.innerHTML = first;
        cell1.innerHTML = last;
        cell2.innerHTML = id;
        cell3.innerHTML = email;
        cell4.innerHTML = approve;
        cell5.innerHTML = remove;
      }
    })
  });
}

function checkStatus()
{
  var user = database.collection('users');
  user.get().then(function(user) {
    var status = user.get("status");

    if (status == "admin") {
      window.location="admin.html";
    } else {
      window.location="userInfo.html";
    }
  });
}
