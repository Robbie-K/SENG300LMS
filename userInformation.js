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
  var checkoutDate = database.collection("users").doc("Sandesh Regmi").collection("History").doc(mnn0sRR2Q4dz8pzUvn24).once('checkout');

  window.alert(checkoutDate);

  //Get user fees
  //Get user books borrowed
  //Get user return dates
}
