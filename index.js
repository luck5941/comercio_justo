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
var list_productos = {}
var errorToRead = 'Se ha producido un error al intentar leer el archivo.<br>\nEl error es:<br>\n'
var share_var = {}

function readProducts(s){
	fs.readFile(`${__dirname}/config/products.json`, 'utf8', (e, d) => {
		if (e) {
			try {
				s.emit('response', errorToRead+e);

			} catch (er) {}
			return console.log(errorToRead+e)
		}
		list_productos = JSON.parse(d);
		try {
			s.emit('response', 'Se ha leido el fichero con exíto');
		} catch (er) {
			console.log(er)
		}
		return console.log('Se ha leido el fichero con exíto')
	});
}

readProducts();



function server(req, res) {
	var path, toReplace = 'algo es algo...', match = '';

	path = __dirname + '/public';
	path += (req.url === '/') ? '/index.html' : (req.url.split('.').length === 2) ? req.url : req.url + '.html';
	if (path.search(/computer\d?\.[html]/) !== -1){
		//console.log("entra con el html porque path vale "+ path);
		if (path.search(/\d\./) !== -1) {
			share_var.script = 'computer_questions2';
			path = path.replace(/\d\./, '.');
		}
		else share_var.script = 'computer_questions';
	} else if (path.search('_questions') !== -1){
		if (path.search(/\d\./) !== -1) {
			share_var.json = 'productos_ropa';
			share_var.products = 'ropa';
			path = path.replace(/\d\./, '.');
		}
		else {
			share_var.json = 'productos_cosmetica';
			share_var.products = "['" + list_productos['cosmetica'].join("','") + "']";
		}
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

		if(typeof data == 'string'){
			var newMatch = [], r = '';
			newMatch = data.match(/[#][{]\w*[}]/g);
			if (newMatch){
				for (let i=0; i< newMatch.length;i++){
					r = newMatch[i].replace('#', '').replace('{', '').replace('}', '');
					let str =  "#{"+r+"}";
					data = data.replace(str, share_var[r]);
				}
			}

		/*console.log('--------------------------------')*/
			//data = data.replace(, share_var);
		}
		//else console.log("no lo intentes con "+ path)
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
		socket.broadcast.emit('cancel', d);
	});

	socket.on('is-select', function(d){
		socket.broadcast.emit('is-select', d);
	});
	socket.on('reloadProducts', function(d){
		console.log("antes")
		readProducts(socket);
	});

});
