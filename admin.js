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
    database.collection("users").doc(firstName + " " + lastName).set({
      firstName: firstName,
      lastName: lastName,
      id: id,
      email: email,
      password: password
    }).then(function() {
      //Creates the fields for the users current history when the account has been approved.
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
      //Creates an emoty document for the users past history.
      database.collection('users').doc(name).collection("History").doc("Past").set({});

      //Deletes the user from "newUsers" and creates alert for proper approval.
      person.delete();
      make_alert(firstName + " " + lastName + " has been successfully approved.", "searchUser();");
    });
  });
}

//Allows admin to remove users based on certain criteria.
function removeUser(name) {
  var USERS = 1;
  var NEW_USERS = 0;
  var section = undefined;

  var firstName;
  var lastName;


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
    firstName = doc.get("firstName");
    lastName = doc.get("lastName");
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

      //Moves the information of the users history to oldUsers.
      database.collection("oldUsers").doc(name).collection("History").doc("Current")
      .set({
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
    make_alert(firstName + " " + lastName + " has been successfully removed.", "searchUser();");
  });
}

//Checks to see if a document (user) exists in the database.
function checkDoc(doc1) {
  return (doc1.get().then(function(doc) {
    if (doc.exists) {
      return doc1;
    }  else {
      return undefined;
    };
  }));
}

//Removes the messages from the contact forms that have been submitted.
function removeMessage(response) {
  var contact = database.collection("contact").doc(response);
  contact.delete();
};
