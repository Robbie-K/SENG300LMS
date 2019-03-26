
//Get User Information
//Once we can tell which user is online, add parameters to their history in database
function userInfo() {
  var userName = "Sam Laurie";
  console.log(userName);
  var info = database.collection("users").doc(userName).collection("History").doc("Current");
  info.get().then(function(doc) {
    var feesOwed = doc.get("feesOwed");
    var feesPaid = doc.get("feesPaid");
    var feesTotal = doc.get("feesTotal");
    var book1Name = doc.get("book1Name");
    var dateOut1 = doc.get("dateOut1");
    var dateRet1 = doc.get("dateRet1");
    var book2Name = doc.get("book2Name");
    var dateOut2 = doc.get("dateOut2");
    var dateRet2 = doc.get("dateRet2");
    var book3Name = doc.get("book3Name");
    var dateOut3 = doc.get("dateOut3");
    var dateRet3 = doc.get("dateRet3");
    var book4Name = doc.get("book4Name");
    var dateOut4 = doc.get("dateOut4");
    var dateRet4 = doc.get("dateRet4");
    var book5Name = doc.get("book5Name");
    var dateOut5 = doc.get("dateOut5");
    var dateRet5 = doc.get("dateRet5");

    document.getElementById("feesOwed").innerHTML = feesOwed;
    document.getElementById("book1Name").innerHTML = book1Name;
    document.getElementById("book2Name").innerHTML = book2Name;
    document.getElementById("book3Name").innerHTML = book3Name;
    document.getElementById("book4Name").innerHTML = book4Name;
    document.getElementById("book5Name").innerHTML = book5Name;
    document.getElementById("dateOut1").innerHTML = dateOut1;
    document.getElementById("dateOut2").innerHTML = dateOut2;
    document.getElementById("dateOut3").innerHTML = dateOut3;
    document.getElementById("dateOut4").innerHTML = dateOut4;
    document.getElementById("dateOut5").innerHTML = dateOut5;
    document.getElementById("dateRet1").innerHTML = dateRet1;
    document.getElementById("dateRet2").innerHTML = dateRet2;
    document.getElementById("dateRet3").innerHTML = dateRet3;
    document.getElementById("dateRet4").innerHTML = dateRet4;
    document.getElementById("dateRet5").innerHTML = dateRet4;
  });
}
