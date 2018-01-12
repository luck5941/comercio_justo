//variables iniciales
var circle, lupa, socket, w, h, moveCursor, stopMove, canMove, questionsCords, questions, comparePos, selectedQuestion,questions_height, questions_width, questions_left;

socket = io('192.168.1.9:8080');
circle = $('#circle_cursor');
questions = $('.question');
w = innerWidth;
h = innerHeight;
canMove = false;
questions_height = parseFloat(questions.css('height'));
questions_width =  parseInt(questions.css('width'));
questions_left = parseInt(questions.offset().left);
questions_top = parseInt(questions.offset().top);

function sleep(ms) {return new Promise(resolve => setTimeout, ms);};
async function moveCursor (d){
	var n, top, left;
	n = 1;
	canMove = true;
		while (canMove){
			left = parseInt(circle.css('left'));
			top = parseInt(circle.css('top'));
			left += d.x ? n : n * (-1);
			top += d.y ? n : n * (-1);
			circle.css({"left": `${left}px`,"top": `${top}px`});
			$(questions).css('color', 'black');
			if (left < (questions_width+questions_left) && left > questions_left)
				comparePos(top);
			await sleep(1);
		}
};

comparePos = (y) => {
		let ind;
		ind = parseInt(y/questions_height);
		for (selectedQuestion = ind-2; selectedQuestion<=ind+2;selectedQuestion++){
			if (selectedQuestion <0) selectedQuestion = 0;
			if ($(window.questions[selectedQuestion]).offset().top < y &&  $(window.questions[selectedQuestion]).offset().top + questions_height > y){
				break;
			}
		}
		$(window.questions).css('color', 'black');
		return $(window.questions[selectedQuestion]).css('color', 'white');
};

cancelFunction = (e) => {
	canMove = false;
};

sendQuestion = (e) => {
	let att = $(questions[selectedQuestion]).attr("attr");
	concurso.response(att);
}

socket.on('cords', moveCursor);
socket.on('cancel', moveCursor);
socket.on('is-select', sendQuestion);
circle.css('left', `${w / 2}px`);
circle.css('top', `${h / 2}px`);
