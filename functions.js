function search(){
  var searchEntry = document.getElementById('search').value;
  var book = database.collection("books").doc(searchEntry);
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
