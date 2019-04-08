// Initialize Firebase server api
// var config = {
//   apiKey: "AIzaSyD4WbKGk37cw68SM4zAA9ZakywahHyeyGI",
//   authDomain: "librarymanagmentsystem-ce706.firebaseapp.com",
//   databaseURL: "https://librarymanagmentsystem-ce706.firebaseio.com",
//   projectId: "librarymanagmentsystem-ce706",
//   storageBucket: "librarymanagmentsystem-ce706.appspot.com",
//   messagingSenderId: "533299745296"
// };
// firebase.initializeApp(config);

// setting the filter and database to be global variables to be used
var database = firebase.firestore();
var filter = "";
var globalName = "";

// function that searches for books/authors/etc
function search(){
  // search entry gets what user typed and also the database of books
  var searchEntry = document.getElementById('search').value;
  var book = database.collection("books");
  var table = document.getElementById("bookTable");

  // makes sure to remove all the rows before the code starts
  // this allows for table to look normaly every search
  removeRows("bookTable");
  // counts rows up and gets books
  var rowCount = 1;
  book.get().then(function(querySnapshot) {
    querySnapshot.forEach(function (documentSnapshot) {
      // going through each book in the database to allow for searching filters
      // getting all the info related to all books
      var data = documentSnapshot.data();
      var bookname = data.book_name;
      var author = data.book_author;
      var genre = data.Genre;
      var searchFilter = "";

      // checking if the filter they chose matches the filter in search
      if(filter == "author"){
        var searchFilter = author.toLowerCase();
      }
      else if(filter == "genre"){
        var searchFilter = genre.toLowerCase();
      }
      else{
        var searchFilter = bookname.toLowerCase();
      }

      // setting the filter and search value to lower case
      var searchEntryLower = searchEntry.toLowerCase();

      if(searchFilter.includes(searchEntryLower) == true){
        // adding a new row in the table if what they wanted is there.
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
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        cell0.innerHTML = bookname;
        cell1.innerHTML = author;
        cell2.innerHTML = published;
        cell3.innerHTML = id;
        cell4.innerHTML = genre;
        cell5.innerHTML = quantity;
        cell6.innerHTML = "N/A";


        createButton(cell7, quantity, 1, bookname, id);
      }
    });
    table.style.display = "table";
  });
}


function searchUser() {
  var userType;

  if (filter == "books") {
    userType = "books";
  } else if (filter == "users") {
    userType = "users";
  } else {
    userType = "newUsers";
  }

  var searchEntry = document.getElementById('search').value;
  var user = database.collection(userType);
  var table = document.getElementById("userTable");

  removeRows("userTable");

  var rowCount = 1;
  user.get().then(function(querySnapshot) {
    querySnapshot.forEach(function (documentSnapshot){
      var data = documentSnapshot.data();
      var firstName = data.firstName;
      var lastName = data.lastName;
      globalName = firstName + " " + lastName;
      var searchEntryLower = searchEntry.toLowerCase();
      var nameLower = name.toLowerCase();

      if(nameLower.includes(searchEntryLower) == true || nameLower.includes(searchEntryLower) == true){
        var first = data.firstName;
        var last = data.lastName;
        var id = data.id;
        var email = data.email;
        var extra = " ";

        var row = table.insertRow(rowCount);
        rowCount = rowCount + 1;
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        cell0.innerHTML = first + " " + last;
        cell1.innerHTML = id;
        cell2.innerHTML = email;

        if (userType == "users") {
          createButton(cell4, 0, 3, globalName, "");
          cell3.innerHTML = extra;
        } else if (userType == "newUsers") {
          createButton(cell3, 0, 2, globalName, "");
          createButton(cell4, 0, 3, globalName, "");
        }
      }
    });
    table.style.display = "table";
  });
}


// goes through and removes all the rows of the table except for the first one
function removeRows(tableType){
  var table = document.getElementById(tableType);
  var rowlength = table.rows.length;
  while(rowlength > 1){
    table.deleteRow(rowlength -1);
    rowlength = table.rows.length;
  }
}

// makes it so that the search bar activitates when they hit "enter"
var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchButton").click();
  }
});

// setting the filter to search books by their title
function setFilterTitle(){
  filter = "title";
  var element = document.getElementById("currentFilter");
  document.getElementById("filterValue").innerHTML = "Search: Title";
}

// setting the filter to search books by their author
function setFilterAuthor(){
  filter = "author";
  document.getElementById("filterValue").innerHTML = "Search: Author";
}

// setting filter to search books by their genre
function setFilterGenre(){
  filter = "genre";
  document.getElementById("filterValue").innerHTML = "Search: Genre";
}


// setting the filter to search for new users
function setFilterNewUser() {
  filter = "newUser";
  var element = document.getElementById("currentFilter");
  document.getElementById("filterValue").innerHTML = "Search: New User";
}

// setting the filter to search for current users
function setFilterUser() {
  filter = "users";
  document.getElementById("filterValue").innerHTML = "Search: Users";
}

// seeting the filter to search for books
function setFilterBook() {
  filter = "books";
  document.getElementById("filterValue").innerHTML = "Search: Books";
}


function createButton(cell, quantity, type, name, bookID){
  var button = document.createElement("button");

  if (type == 1)
  {
    if (quantity > 0){
      button.innerHTML = "Reserve";
      button.onclick = function() { reserveBook(name, bookID, button); };
      button.className = "genreButton greenButton";
      // set a class for a button --> will add css
      // set an id for the button so that it can be ascessed in other parts of the function
    }
    else {
      button.innerHTML = "Hold";
      button.setAttribute("onclick", "holdBook(test)");
      button.className = "genreButton redButton";
    }
  }
  else if (type == 2) {
    button.innerHTML = "Approve";
    button.onclick = function() {approveUsers(name);};
    button.className = "genreButton greenButton";
  }
  else if (type == 3) {
    button.innerHTML = "Remove";
    button.onclick = function() {removeUser(name);};
    button.className = "genreButton redButton";
  }
  cell.appendChild(button);
}


function reserveBook(bookName, bookID, button){
  changeQuery("set", bookName, bookID);
  button.innerHTML = "Un-Reserve";
  button.onclick = function() { unreserveBook(name, bookID, button); };
}

function holdBook(){
  changeQuery("set", bookName, bookID);
  button.innerHTML = "Un-Hold";
  button.onclick = function() { unholdBook(name, bookID, button); };
}

function unreserveBook(){
  changeQuery("clear", bookName, bookID);
  button.innerHTML = "Reserve";
  button.onclick = function() { reserveBook(name, bookID, button); };
}

function unholdBook(){
  changeQuery("clear", bookName, bookID);
  button.innerHTML = "Hold";
  button.onclick = function() { holdBook(name, bookID, button); };
}


function findCheckedStatus(bookName, bookID, quantity, button){

  var userName; //Creates userName variable
  var userID = getUserId(); //Gets user ID
  getName(userID).then(function(userName) {
    var info = database.collection("users").doc(userName).collection("History").doc("Current"); //Gets current user's history
    info.get().then(function(doc) { // Function of getting database fields in history
      var booksCheckedOut = doc.get("booksCheckedOut"); //Set varible to be feesOwed from database
      var book1Name = doc.get("book1Name");
      var book2Name = doc.get("book2Name");
      var book3Name = doc.get("book3Name");
      var book4Name = doc.get("book4Name");
      var book5Name = doc.get("book5Name");

      if( quatity > 0){
        if(bookName == book2Name || bookName == book2Name || bookName == book2Name || bookName == book2Name|| bookName == book2Name){
          button.innerHTML = "Un-Reserve";
          button.onclick = function() { unreserveBook(bookName, bookID, button); };
        }
        else{
          button.innerHTML = "Reserve";
          button.onclick = function() { reserveBook(bookName, bookID, button); };
        }
      }
      else{
        if(bookName == book2Name || bookName == book2Name || bookName == book2Name || bookName == book2Name|| bookName == book2Name){
          button.innerHTML = "Un-Hold";
          button.onclick = function() { unholdBook(bookName, bookID, button); };
        }
        else{
          button.innerHTML = "Hold";
          button.onclick = function() { holdBook(bookName, bookID, button); };
        }
      }
    });
  });
}

function changeQuery(criteria, bookName, bookId){
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  // year month day
  var dateFormat = new Date(year, month, day);
  var newDate = new Date();
  newDate.setDate(dateFormat.getDate() + 14); // adding 2 weeks
  var newBookInfo = bookName;
  //var subtractDate = (newDate - dateFormat)/86400000;

  var userName; //Creates userName variable
  var userID = getUserId(); //Gets user ID
  getName(userID).then(function(userName) {
    var info = database.collection("users").doc(userName).collection("History").doc("Current"); //Gets current user's history
    info.get().then(function(doc) { // Function of getting database fields in history
      var booksCheckedOut = doc.get("booksCheckedOut"); //Set varible to be feesOwed from database
      var book1Name = doc.get("book1Name");
      var book2Name = doc.get("book2Name");
      var book3Name = doc.get("book3Name");
      var book4Name = doc.get("book4Name");
      var book5Name = doc.get("book5Name");
      var newBooksCheckedOut = doc.get("booksCheckedOut");
      /*
      either checking if the criteria is to clear the book name or if its to set the right info
      */
      if(criteria == "clear"){
        dateFormat = "";
        newDate = "";
        newBookInfo = "";
        bookId = "";
        dateFormat = "";
        newDate = "";
        newBooksCheckedOut = newBooksCheckedOut - 1;
      }
      else{
        newBooksCheckedOut = newBooksCheckedOut + 1;
      }

      if(book1Name == criteria){
        database.collection("users").doc(userName).collection("History").doc("Current").update({
          ID1: bookID,
          book1Name: bookName,
          dateOut1: dateFormat,
          dateRet1: newDate,
          booksCheckedOut: newBooksCheckedOut
        });
      }
      else if(book2Name == criteria){
        database.collection("users").doc(userName).collection("History").doc("Current").update({
          ID2: bookID,
          book2Name: bookName,
          dateOut2: dateFormat,
          dateRet2: newDate,
          booksCheckedOut: newBooksCheckedOut
        });
      }
      else if(book3Name == criteria){
        database.collection("users").doc(userName).collection("History").doc("Current").update({
          ID3: bookID,
          book3Name: bookName,
          dateOut3: dateFormat,
          dateRet3: newDate,
          booksCheckedOut: newBooksCheckedOut
        });
      }
      else if(book4Name == criteria){
        database.collection("users").doc(userName).collection("History").doc("Current").update({
          ID4: bookID,
          book4Name: bookName,
          dateOut4: dateFormat,
          dateRet4: newDate,
          booksCheckedOut: newBooksCheckedOut
        });
      }
      else if(book5Name == criteria){
        database.collection("users").doc(userName).collection("History").doc("Current").update({
          ID5: bookID,
          book5Name: bookName,
          dateOut5: dateFormat,
          dateRet5: newDate,
          booksCheckedOut: newBooksCheckedOut
        });
      }

    });
  });

}
