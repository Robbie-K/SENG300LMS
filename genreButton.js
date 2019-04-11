
// Makes genre buttons switch between
// each other when clicking on one
let buttons = document.getElementsByClassName("genreButton");

//If a button has been clicked, switch it from "genreButton" to "genreButton active"
//and change the "genreButton active" to "genreButton".
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function() {
		let remove = document.getElementsByClassName('genreButton active');
		remove[0].className = 'genreButton'; // 'Unselects' button

		this.className = 'genreButton active'; // 'Selects' button
	});
}
