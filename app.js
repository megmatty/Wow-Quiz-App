//Quiz question & answer objects in array
var data = [
	{
		id: 1,
		q: "What color are epic items?",
		a1: "Blue",
		a2: "Green",
		a3: "Orange",
		a4: "Purple",
		correct: "Purple"
	},

	{
		id: 2,
		q: "What is the highest profession skill level in Legion?",
		a1: 800,
		a2: 400,
		a3: 600,
		a4: 700,
		correct: 800
	},

	{
		id: 3,
		q: "At what level does a Death Knight start?",
		a1: 40,
		a2: 100,
		a3: 55,
		a4: 75,
		correct: 55
	},

	{
		id: 4,
		q: "Which boss says: 'The Menagerie is for guests only'?",
		a1: "Garrosh Hellscream",
		a2: "The Curator",
		a3: "Moroes",
		a4: "Medivh",
		correct: "The Curator"
	},

	{
		id: 5,
		q: "What race were the Naga before they mutated?",
		a1: "Night Elves",
		a2: "Blood Elves",
		a3: "Orcs",
		a4: "Tauren",
		correct: "Night Elves"
	},

	{
		id: 6,
		q: "What is the name of the Lich King's sword?",
		a1: "Shadowmourne",
		a2: "Gorehowl",
		a3: "Doomhammer",
		a4: "Frostmourne",
		correct: "Frostmourne"
	},

	{
		id: 7,
		q: "In what dungeon did Leeroy Jenkins earn his internet fame?",
		a1: "Lower Blockrock Spire",
		a2: "Upper Blackrock Spire",
		a3: "Molten Core",
		a4: "Blackrock Depths",
		correct: "Upper Blackrock Spire"
	},

	{
		id: 8,
		q: "In the original Karazhan, what boss casts Flame Wreath?",
		a1: "Medivh",
		a2: "Moroes",
		a3: "Shade of Aran",
		a4: "Nightbane",
		correct: "Shade of Aran"
	},

	{
		id: 9,
		q: "Which class cannot wear plate armor?",
		a1: "Demon Hunter",
		a2: "Death Knight",
		a3: "Paladin",
		a4: "Warrior",
		correct: "Demon Hunter"
	},

	{
		id: 10,
		q: "What was the level cap for the original World of Warcraft?",
		a1: 50,
		a2: 60,
		a3: 70,
		a4: 80,
		correct: 60
	}

]


//Globals
	var score = 0; //track right answers
	var wrong = 0; //track wrong answers

//Click on Start Game
$('#js-start-button').on('click', function(event) {
	startGame();
});

$('#js-play-again').on('click', function(event) {
	playAgain();
});



function startGame() {
	event.preventDefault();
	buildQuestion(0);
	$('#js-start-button').toggleClass('green-button').stop().delay(800).queue(function() {
		//Turn button green, then wait 800ms before adding & removing hide
		$('.intro').toggleClass('hide');
		$(this).toggleClass('hide');
		$('.section-container').toggleClass('hide');
		$('#js-number').text(data[0].id);
		$('#js-question').text(data[0].q);
		$('#js-qnumber').text(data[0].id);
	});
	updateScore();
	$index = -1;
}

function playAgain() {
	event.preventDefault();
	$('#js-play-again').addClass('green-button').stop().delay(800).queue(function() {
		//Turn button green, then wait 800ms before adding & removing hide
		$('#js-final').toggleClass('hide');
		$('.intro').toggleClass('hide');
		$('#js-start-button').toggleClass('hide green-button');
	});
	score = 0;
	wrong = 0;
}


//Give right-wrong feedback & keep score
$('.answer-button').on('click', function(event) {
	event.preventDefault();
	//capture text inside this button for user answer
	var userAnswer = $(this).text();
	//capture current question ID
	var currentId = $('#js-qnumber').text();
	//convert text ID to number, subtract one to get index
	var dataIndex = Number(currentId) - 1;
	//get correct answer for that index
	var correct = data[dataIndex].correct;
	//compare user answer to correct answer
	if (userAnswer == correct) {
		score += 1;
		$(this).addClass('green-button').stop().delay(1500).queue(function() {
			updateQuestion(1);
		});
	} else {
		wrong += 1;
		$(this).addClass('red-button').stop().delay(1200).queue(function() { //delay
			$('.answer-button').filter(function() {
					return $(this).text() == correct;
				}).addClass('green-button').stop().delay(1500).queue(function() {
					updateQuestion(1); //move to next question
				});
			});
		}
});


function buildQuestion(num) { //load question data based on number
	var qNum = data[num].id;
	$('#js-qnumber').text(qNum);
	var question = data[num].q;
	$('#js-question').text(question);
	var answer1 = data[num].a1;
	$('#js-answer-1').text(answer1);
	var answer2 = data[num].a2;
	$('#js-answer-2').text(answer2);
	var answer3 = data[num].a3;
	$('#js-answer-3').text(answer3);
	var answer4 = data[num].a4;
	$('#js-answer-4').text(answer4);
}

function updateQuestion(move) { //updates the questions after answering
	var currentId = $('#js-qnumber').text();
	var $index = -1;
	for (var i = 0; i < data.length; i++) {
		if (data[i].id == currentId) {  //finds where we are and sets index
			$index = i; 
		}
	}

	$index += move; //advance index
	 //remove right and wrong answer colors
		$('.answer-button').removeClass('green-button');
		$('.answer-button').removeClass('red-button');

	// $("#js-correct").text(score); //updates correct score text
	// $("#js-incorrect").text(wrong);	//updates incorrect score text
	updateScore();

	if ($index <= 9) {
		buildQuestion($index); //move to next questions
	} else {
		displayFinalScore(); //show final score screen
		$('#js-play-again').removeClass('green-button');
	}

}

function updateScore() {
	$("#js-correct").text(score); //updates correct score text
	$("#js-incorrect").text(wrong);	//updates incorrect score text
}

function displayFinalScore() { //shows final score screen at end
	$('.section-container').toggleClass('hide');
	$('#js-final').toggleClass('hide');
	$("#js-total-correct").text(score); //updates correct score text
	$index = -1;
}













