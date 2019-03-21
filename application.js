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
function checkFields() {
        // var correct = 0;
         //Takes information from application.html as input for variables
         var first = document.getElementById('firstName').value;
         var last = document.getElementById('lastName').value;
         var pass = document.getElementById('password').value;
         var confPass = document.getElementById('confirm').value;
         var email = document.getElementById('email').value;
         var id = document.getElementById('ID').value;

         // checking if any fields are empty
         if (first == "" || last == "" || pass == "" || confPass == "" || email == "" || id == "") {
                 document.getElementById('invalidInfo').style.opacity='1';
         // Adds the user if the doc doesn't already exist
         } else if (pass == confPass ) {
                 var name = first + " " + last;
                 var doc = database.collection('users').doc(name);
                 doc.get().then((docData) => {
                         if (docData.exists) {
                                  alert("An error has occured please contact us.");
                         } else {
                                 database.collection('users').doc(name).set({
                                          id: parseInt(id),
                                          email: email,
                                          firstName: first,
                                          lastName: last,
                                          password: pass
                                  });
                                  alert("Account has been made. You can now login.");
                         }
                 });
         };
};
