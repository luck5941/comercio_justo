class Concurso {
		constructor(q, p){
		this.question = q;
		this.productos = p;
		this.winProduct = '';
		this.init();
	}
	init() {
		//primero pasamos todos los productos a un array
		let p = []
		for (let i in this.productos)
			p.push(i);
		//segundo obetenemos un valor al azar de ese array
		let n = Math.floor(Math.random() * 10);
		this.winProduct = p[n];
		this.print();
	}

	print() {
			let str = '';
			for (var i in this.question)
				str += `<div class="question">${this.question[i].text}</div>`;

			$("#questions").html(str);
			str = '';
			for (i in this.productos)
				str += `<div class="question">${i}</div>`;
			$("#products").html(str);
		}
	response() {
		/*
		*Esta funcion se queda encargada de analizar los tags de una pregunta,
		*eliminar todos los productos que no tengan alguno de sus tags y
		*finalmente eliminar todas las preguntas que no tengan un produto restante
		*/
		
	}


}

$.get('json/productos.json', function(d){
	console.log(d);
	window.concurso = new Concurso(d.questions, d.products);
}).fail(function (e) {
	console.log(e)
});
