
//Get User Information
//Once we can tell which user is online, add parameters to their history in database
function userInfo() {

  var userName; //Creates userName variable
  var userID = getUserId(); //Gets user ID

  getName(userID).then(function(userName) {
    var info = database.collection("users").doc(userName).collection("History").doc("Current"); //Gets current user's history
    info.get().then(function(doc) { // Function of getting database fields in history
      var feesOwed = doc.get("feesOwed"); //Set varible to be feesOwed from database
      var feesPaid = doc.get("feesPaid"); //Set varible to be feesPaid from database
      var feesTotal = doc.get("feesTotal"); //feesTotal
      var book1Name = doc.get("book1Name"); //book 1 name
      var dateOut1 = doc.get("dateOut1"); //book 1 checkout date
      var dateRet1 = doc.get("dateRet1"); //book 1 return date
      var book2Name = doc.get("book2Name"); //book 2 name
      var dateOut2 = doc.get("dateOut2"); //book 2 checkout date
      var dateRet2 = doc.get("dateRet2"); //book 2 return date
      var book3Name = doc.get("book3Name"); //book 3 name
      var dateOut3 = doc.get("dateOut3"); //book 3 checkout date
      var dateRet3 = doc.get("dateRet3"); //book 3 return date
      var book4Name = doc.get("book4Name"); //book 4 name
      var dateOut4 = doc.get("dateOut4"); //book 4 checkout date
      var dateRet4 = doc.get("dateRet4"); //book 4 return date
      var book5Name = doc.get("book5Name"); //book 5 name
      var dateOut5 = doc.get("dateOut5"); //book 5 checkout date
      var dateRet5 = doc.get("dateRet5"); //book 5 return date


      /*
      Inputs each coresponding variable into the proper place in
      the user's information table displayed in userInfo.html
      */
      document.getElementById("feesOwed").innerHTML = feesOwed;
      document.getElementById("feesPaid").innerHTML = feesPaid;
      document.getElementById("feesTotal").innerHTML = feesTotal;
      document.getElementById("book1Name").innerHTML = book1Name;
      document.getElementById("book2Name").innerHTML = book2Name;
      document.getElementById("book3Name").innerHTML = book3Name;
      document.getElementById("book4Name").innerHTML = book4Name;
      document.getElementById("book5Name").innerHTML = book5Name;
      document.getElementById("dateOut1").innerHTML = convertDay(dateOut1);
      document.getElementById("dateOut2").innerHTML = convertDay(dateOut2);
      document.getElementById("dateOut3").innerHTML = convertDay(dateOut3);
      document.getElementById("dateOut4").innerHTML = convertDay(dateOut4);
      document.getElementById("dateOut5").innerHTML = convertDay(dateOut5);
      document.getElementById("dateRet1").innerHTML = convertDay(dateRet1);
      document.getElementById("dateRet2").innerHTML = convertDay(dateRet2);
      document.getElementById("dateRet3").innerHTML = convertDay(dateRet3);
      document.getElementById("dateRet4").innerHTML = convertDay(dateRet4);
      document.getElementById("dateRet5").innerHTML = convertDay(dateRet5);
    });
  });
}

/*
  Takes in user's ID, and returns their full name
  as a string. The user name is then used as part of the class path
  for getting their personal history.
*/
function getName(userID){
  let userQuery = database.collection("users").where("id", "==", userID);

  return userQuery.get().then(function(snapshot) {
    if (!snapshot.empty) {
      let user = snapshot.docs[0];

      let fetchedFirst = user.get("firstName"); //Get first name
      let fetchedLast = user.get("lastName"); //Get last name
      userName = fetchedFirst + " " + fetchedLast;  //combine names with space
      return userName;  //return full name
    }
  });
}

/*
  Converts a timestamp of when the user checked out a book and when the
  user must return the book into a string. Then return the string of the 
  date.
*/
function convertDay(dateIn){
  if(dateIn != ""){ //If there is actually a date to convert into a date string
    let date = dateIn.toDate(); //Converts timestamp into date

    let month = date.getUTCMonth() + 1; //Get month from date timestamp (+1 corrects for months numbered 1-12)
    let day = date.getUTCDate();  //Get date from date timestamp
    let year = date.getUTCFullYear(); //Get year from date timestamp

    var dayFormat = year + "-" + month + "-" + day; //Format date into string
    return dayFormat; //Return day string
  }
  else{ //Else there is no date, and nothing is changed
    return "";
  }
}
