let buttons = document.getElementsByClassName("genreButton");

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function() {
		let remove = document.getElementsByClassName('genreButton active');
		remove[0].className = 'genreButton';

		this.className = 'genreButton active';
	});
}