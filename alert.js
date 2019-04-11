// Makes an alert box pop up with the given message
// and evaluates the given code
function make_alert(message, toCall) {
	let box = document.getElementById("alert-outer");
	box.style.display = "initial"; // Make box visible (default display = none)

	let text = document.getElementById("alert-message");
	text.innerHTML = message; // Change message

	// Make a button that closes the box and runs the given
	// code
	let button = document.getElementById("alert-button");
	button.onclick = function() {
		let alert_box = this.parentNode.parentNode;
		alert_box.style.display = 'none'; // Hide box
		eval(toCall); // Run code
	}
}