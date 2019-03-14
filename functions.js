function search(){
  var searchEntry = document.getElementById('search').value;
  var book = database.collection("books").doc("The Name of The Wind");
  book.get().then(function(doc) {
    console.log(doc.get("book_name"));
    var title = doc.get("book_name");
    var table = document.getElementById("bookTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = title;
  });

}
