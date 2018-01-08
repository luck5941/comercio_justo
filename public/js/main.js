'use strict';

var circle, moveCircle, socket, win_x, win_y, fullScreenFunction;
win_x = parseInt(innerWidth);
win_y = parseInt(innerHeight);
circle = $('.circle');
socket = io('http://192.168.1.9:8080');




socket.on('news', function (data) {
	console.log(data);

	return socket.emit('my other event', {
		my: 'data'
	});
});

socket.emit('my other event', {
	my: 'data2'
});

moveCircle = (obj)=> {
	var x, y;
	x = obj.x ? 65 : 35;
	y = obj.y ? 65 : 35;
	return circle.attr({
		cx: x,
		cy: y
	});
};



fullScreenFunction = () => {
	console.log("changeScreen");
	socket.emit('qr', {"pass": true});
	$('button').remove();
	$('svg').removeAttr('class');
	var i = document.getElementsByTagName("body")[0];
	if (i.requestFullscreen) {
		i.requestFullscreen();
	} else if (i.webkitRequestFullscreen) {
		i.webkitRequestFullscreen();
	} else if (i.mozRequestFullScreen) {
		i.mozRequestFullScreen();
	} else if (i.msRequestFullscreen) {
		i.msRequestFullscreen();
	}
};


$('body').on('touchstart, touchmove', function (e) {
	var right, top, x, y;
	x = e.originalEvent.touches[0].pageX;
	y = e.originalEvent.touches[0].pageY;
	right = x > win_x / 2;
	top = y > win_y / 2;
	socket.emit('dir', {
		x: right,
		y: top
	});
	moveCircle({
		x: right,
		y: top
	});
	return null;
});

$('button').on('click, touchstart', fullScreenFunction);






