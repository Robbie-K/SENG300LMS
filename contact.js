// Contact form

function collectData() {
        var id = document.getElementById('email').value;
        var msg = document.getElementById('contact').value;

        // insert the data into the database then
        // if email is valid
                alert("Message has been submitted. Thanks for the feedback!");
                window.location.href="index.html";
}
