//Get User Information

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD4WbKGk37cw68SM4zAA9ZakywahHyeyGI",
  authDomain: "librarymanagmentsystem-ce706.firebaseapp.com",
  databaseURL: "https://librarymanagmentsystem-ce706.firebaseio.com",
  projectId: "librarymanagmentsystem-ce706",
  storageBucket: "librarymanagmentsystem-ce706.appspot.com",
  messagingSenderId: "533299745296"
};
var app = firebase.firestore;


function userInformation() {
  var userEmail = database.collection("users").doc("John Doe").field(); //Get email?
  if (userEmail == "johndoe@ucalgary.ca") {
    console.log("Correct read.");
  }

  //Get user fees
  //Get user books borrowed
  //Get user return dates
}
