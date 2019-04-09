function make_alert(message, toCall) {
	let box = document.getElementById("alert-outer");
	box.style.display = "initial";

	let text = document.getElementById("alert-message");
	text.innerHTML = message;

	let button = document.getElementById("alert-button");
	button.onclick = function() {
		let alert_box = this.parentNode.parentNode;
		alert_box.style.display = 'none';
		eval(toCall);
	}
}