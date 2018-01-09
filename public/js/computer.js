//variables iniciales

var circle, lupa, socket, w, h, moveCursor, canMove, questionsCords, questions, comparePos, selectedQuestion;

socket = io('192.168.1.9:8080');
circle = $('#circle_cursor');
questions = $('.question');
w = innerWidth;
h = innerHeight;
canMove = false;
questionsCords = [];
for (var i= 0; i<questions.length; i++) {
	questionsCords.push({
		left: parseInt($(questions[i]).offset().left),
		top: parseInt($(questions[i]).offset().top),
		width: parseInt($(questions[i]).css('width')),
		height: parseInt($(questions[i]).css('height'))
	});
}
function sleep(ms) {return new Promise(resolve => setTimeout, ms);};
async function moveCursor (d){
	var n, top, left;
	n = 1;
	canMove = true;
		left = parseInt(circle.css('left'));
		top = parseInt(circle.css('top'));
		left += d.x ? n : n * (-1);
		top += d.y ? n : n * (-1);
		circle.css({"left": `${left}px`,"top": `${top}px`});
		comparePos(left, top);
};


comparePos = (x, y) => {

	for (let o of questionsCords){
		console.log(x < (o.left + o.widht) && x > o.left);
		console.log(`${o.width}; ${o.left}`);

		$(questions).css('color', 'black');
		if (x < (o.left + o.width) && x > o.left && y <o.top + o.height && y> o.top){
			selectedQuestion = questionsCords.indexOf(o);
			return $(questions[selectedQuestion]).css('color', 'white');
		}
	}

};

circle.css('left', `${w / 2}px`);
circle.css('top', `${h / 2}px`);

socket.on('cords', moveCursor);
