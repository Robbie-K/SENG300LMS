function search(){
  var searchEntry = document.getElementById('search').value;
  var book = database.collection("books").doc(searchEntry);
  book.get().then(function(doc) {
    var title = doc.get("book_name");
    var table = document.getElementById("t01");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    for (let i = 1; i < table.rows[0].cells.length; i++) {
      row.insertCell(i);
    }
    cell1.innerHTML = title;
  });

}
