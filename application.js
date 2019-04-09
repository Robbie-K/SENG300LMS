//Application form

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
var exists1 = undefined;
var exists2 = undefined;

function checkFields() {
  document.getElementById('wrongInfo').style.display = 'none';
  // var correct = 0;
  //Takes information from application.html as input for variables
  var first = document.getElementById('firstName').value;
  var last = document.getElementById('lastName').value;
  var pass = document.getElementById('password').value;
  var confPass = document.getElementById('confirm').value;
  var email = document.getElementById('email').value;
  var id = document.getElementById('ID').value;

  var allowed = undefined;
  // checking if any fields are empty
  if (first == "" || last == "" || pass == "" || confPass == "" || email == "" || id == "") {
    document.getElementById('wrongInfo').style.display = 'inline-block';
    // Adds the user if the doc doesn't already exist
  } else if (pass == confPass ) {
    var name = first + " " + last;
    var doc1 = database.collection('users').doc(name);
    var doc2 = database.collection('newUsers').doc(name);
    // check if the info entered already is in use
    checkInfo(email,id)
    .then(function (doesNotExist) {
      // if the info does not exist
      if (doesNotExist) {
        allowed = true;
        // checks if the doc itself exists or not
        checkExists(doc1, doc2).then(function (exists) {
          return exists;
        }) .then(function (exists) {
          // if the doc exists and the email and id don't we allow the user to create an account
          // if (exists && allowed) {
          //   // addSameName finds the proper document name to use and returns a promise containing it
          //   addSameName(first, last, 1)
          //   .then(function (newName) {
          //       if (newName != undefined) {
          //         addUser(newName, first, last, email, id, pass);
          //     };
          //   });
          if (!exists && allowed){
            addUser(name, first, last, email, id, pass);
          };
        });

        // if the info exists an error is displayed and nothing is changed in the database
      } else {
        make_alert("An error has occured. Please try again or contact us.", "")
      };

    });
  };


}

// This function checks if the email or id entered is already in use in the database
function checkInfo(email, id) {
  var count = 0;
  // To make asynchronous tasks more manageable the whole promise is returned, then true or false can be accessed from there
  // in another promise
  return (
    // checks for the email in users
    checkEmail(email,"users").then(function (querySnapshot) {
      count += querySnapshotCheck(querySnapshot);
      // checks for the email in new users
      return checkEmail(email,"newUsers");
    }).then(function (querySnapshot) {
      count += querySnapshotCheck(querySnapshot);
      // checks for the id in users
      return checkId(id, "users");
    }).then(function (querySnapshot) {
      count += querySnapshotCheck(querySnapshot);
      // check for the id in new users
      return checkId(id,"newUsers");
    }).then(function (querySnapshot) {
      count += querySnapshotCheck(querySnapshot);
      // if any of the above exist the count will be 1 or higher and false will be returned
      if (count >= 1) {
        return false;
      } else { // if none exist false is returned
        return true;
      };
    }));
  }


  // simply returns a query with all docs with the matching email
  function checkEmail(email, collectionName) {
    return database.collection(collectionName).where("email", "==", email).get();
  }

  // simply returns a query with all docs with the matching id
  function checkId(id, collectionName) {
    return database.collection(collectionName).where("id", "==", id ).get()
  }

  // this function returns the size of a snapshot
  function querySnapshotCheck(querySnapshot) {
    return querySnapshot.size;
  }

  // checks if the document exists in either users or new users
function checkExists(doc1,doc2) {
  return(
    doc1.get().then(function(doc) {
      if (doc.exists) {
        return true;
      } else {
        return false;
      };
    }).then(function (result) {
      if (result) {
        return true;
      } else {
        doc2.get().then(function(doc) {
          if (doc.exists) {
            return true;
          } else {
            return false;
          };
        });
      };
    })
  );
}

// This function adds the user to the new users collection of the database
function addUser(name, first, last, email, id, pass) {
  return ( database.collection('newUsers').doc(name).set({
    id: id,
    email: email,
    firstName: first,
    lastName: last,
    password: pass
  })).then(function () {
    make_alert("Account has been made. Please wait for admin verification. In the event that this takes longer than 2 business days please contact us.", "");
  });
}

// Tbis function allows for people with the exact same first and last name to create accounts
// it adds the string "(n)" to their name where n is however many of that name already exist
// This is still experimental, only works for (1) so far
function addSameName(first, last, n) {
  var name = first + " " + last + "(" +n.toString() + ")";
  var doc1 = database.collection('users').doc(name);
  var doc2 = database.collection('newUsers').doc(name);
  return (checkExists(doc1, doc2).then(function (exists) {
    if (exists) {
      console.log("it does exist");
      return n+1;
    } else {
      return name;
    };
  }).then(function (newName) {
    if (isNaN(newName)) {
      return newName;
    } else {
      addSameName(first, last, newName);
    }
  })
)}