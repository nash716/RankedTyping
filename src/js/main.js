$(function() {
	$('#start-button, #retry-button').click(function() {
		Game.start();
	});

	$('#answer').keydown(function(e) {
		if ((e.which && e.which === 13) || (e.keyCode && e.keyCode === 13)) {
			Game.answer();
		}
	});

	$('#tweet-button').click(function() {
		window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(Game.tweet));
	});
});
