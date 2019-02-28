function load() {
	let buttons = document.getElementsByClassName("option");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].onmouseover = function() {
			document.body.style.backgroundColor = this.style.backgroundColor;
		}
		buttons[i].onmouseout = function() {
			document.body.style.backgroundColor = "#EEE";
		}
	}
}

document.onload = load();