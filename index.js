'use strict';
const app = require('http').createServer(server);
const io = require('socket.io')(app);
const fs = require('fs');
app.listen(8080);
const contenthead = {
	"css": "text/css",
	"html": "text/html",
	"js": "text/javascript",
	"json": "application/json",
	"png": "image/png",
	"jpg": "image/jpeg",
	"ico": "image/ico",
	"svg": "image/svg+xml",
	"ttf": "application/x-font-ttf",
	"otf": "application/x-font-opentype",
	"woff": "application/font-woff",
	"woff2": "application/font-woff2",
	"eot": "application/vnd.ms-fontobject",
	"sfnt": "application/font-sfnt"
}

function server(req, res) {
	var path, toReplace = 'algo es algo...', match = '';

	path = __dirname + '/public';
	path += (req.url === '/') ? '/index.html' : (req.url.split('.').length === 2) ? req.url : req.url + '.html';
	if (path.search(/computer\d?\.[html]/) !== -1){
		console.log("entra con el html porque path vale "+ path);
		if (path.search(/\d\./) !== -1) {
			toReplace = 'computer_questions2';
			path = path.replace(/\d\./, '.');
		}
		else toReplace = 'computer_questions';
	} else if (path.search('_questions') !== -1){
		if (path.search(/\d\./) !== -1) {
			toReplace = 'productos_ropa';
			path = path.replace(/\d\./, '.');
		}
		else toReplace = 'productos_cosmetica';
	}

	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.log(`Se esta pidiendo: ${req.url}`)
			res.writeHead(500, {
				'Content-Type': 'text/html'
			});
			res.end('<h1>Error</h1>' + err);
		}
		try {
			res.writeHead(200, {
				'Content-Type': contenthead[path.split('.')[path.split('.').length - 1]]
			});
		} catch (e) {
			console.log("El error ha sido: ")
			console.log(`Se esta pidiendo: ${req.url} pero da error`)
		}

		if(typeof data == 'string')
			data = data.replace(/[#][{]\w*[}]/, toReplace);
		else console.log("no lo intentes con "+ path)
		res.end(data);
	});
}

console.log(`listen on port 8080`)

io.on('connection', function (socket) {
	console.log("nueva conexion?");
	socket.emit('news', {hello: 'world'});
	socket.on('qr', function (d) {
		socket.broadcast.emit('qr', d);
	});

	socket.on('dir', function (d) {
		socket.broadcast.emit('cords', d);
	});

	socket.on('cancel', function(d){
		socket.broadcast.emit('cancel', d)
	});

	socket.on('is-select', function(d){
		socket.broadcast.emit('is-select', d)

	});
});
