var Game = {
	
};

Game.reset = function() {
	Game.timerId = -1;
	Game.startTime = -1;
	Game.time = 60000;
	Game.point = 0;
	Game.queue = [ ];
	Game.history = [ ];
};

Game.start = function() {
	Game.reset();

	Game.startTime = new Date().getTime();

	$('#answer').css('background-color', 'white');

	$('#start').fadeOut();
	$('#game').fadeIn();
	$('#result').hide();

	setTimeout(Game.countdown, 0);
	Game.timerId = setInterval(Game.countdown, 30);

	for (var i = 0; i < 100; i++) {
		Game.queue.push(questions[Math.floor(Math.random() * questions.length)]);
	}

	$('#answer').val('');
	$('#answer').focus();

	$('#earned-point').text(Game.point + 'pt');

	$('#current-target').text(Game.queue[0].name);
	$('#current-point').text(Game.queue[0].point);

	$('#next-target').text(Game.queue[1].name);
	$('#next-point').text(Game.queue[1].point);
};

Game.answer = function() {
	var text = $('#answer').val();

	var question = Game.queue.shift();
	var color;

	if (question.name == text) {
		Game.point += question.point;
		Game.time += question.point;

		$('#earned-point').text(Game.point + 'pt');

		question.correct = true;
		color = 'rgb(25, 209, 0)';
	} else {
		Game.time -= question.point;

		question.correct = false;
		color = 'rgb(209, 25, 0)';
	}

	$('#answer').css('background-color', color);

	Game.history.push(question);

	$('#answer').val('');
	$('#current-target').text(Game.queue[0].name);
	$('#current-point').text(Game.queue[0].point);

	$('#next-target').text(Game.queue[1].name);
	$('#next-point').text(Game.queue[1].point);

	Game.queue.push(questions[Math.floor(Math.random() * questions.length)]);
};

Game.countdown = function() {
	var remain = Game.startTime + Game.time - new Date().getTime();

	if (remain < 0) {
		Game.end();
		return;
	}

	$('#countdown').text(((remain / 1000) + '000').substr(0, 'xx.xxx'.length) + 'sec');
};

Game.end = function() {
	clearInterval(Game.timerId);

	$('#final-point').text(Game.point);

	$('#game').fadeOut();
	$('#result').fadeIn();

	$('#history').html('');

	var html = '';

	for (var i = 0; i < Game.history.length; i++) {
		var history = Game.history[i];

		html += history.correct ? '<span class="ok">✔</span>' : '<span class="ng">✘</span>';
		html += '　<a target="_blank" href="http://ja.wikipedia.org/wiki/' + encodeURIComponent(history.name) + '">' + history.name + '</a><br>';
	}

	$('#history').html(html);

	Game.tweet = 'Score: ' + Game.point + ' #rankedtyping ' + location.href;
};