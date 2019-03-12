//SENG 300 L01 - Group 10 (Robbie K., Sam L., Sandesh R., Jacob H., Bruin K.)
//Administration Controls

//Allows admin to approve user applications.
function approveUsers() {

}

//Allows admin to remove users based on certain criteria.
function removeUser() {
  var input = document.getElementById('input').value;
  var success = false;

  for (i = 0; i < database.ref('users/').length; i++) {
    if (input == database.ref('users/email') || (input == database.ref('users/firstName') && input == database.ref('users/lastName'))) {
      success = true;
      database.ref('users/' + ("firstName" + "lastName").move('inactiveUsers/');
    }
  }

  if (success == false) {
    var x = document.getElementById("wrongInfo").style.opacity = '1';
  }
}

//Remove books from library and add them to damaged book list.
function addDamagedBooks() {

}

//Allows admin to view history of orders.
function viewHistory() {

}

//Allows admin to order new products for the library.
function orderProducts() {

}
