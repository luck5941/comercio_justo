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
				str += `<div class="question" attr="${i}">${this.question[i].text}</div>`;
			$("#questions").html(str);
			str = '';
			for (i in this.productos)
				str += `<div class="products">${i}</div>`;
			$("#products").html(str);
			window.questions = $('.question');
			window.questions_height = parseFloat(questions.css('height'));
		}
	response(selectedQuestion) {
		/*
		*Esta funcion se queda encargada de analizar los tags de una pregunta,
		*eliminar todos los productos que no tengan alguno de sus tags y
		*finalmente eliminar todas las preguntas que no tengan un produto restante
		*/
		//Pasos:
		//1º Se pregunta si alguna de las categorias del producto está dentro de las caracteristicas posibles de la pregunta
		let realTag = '', savedQuestions = [];
		for (let i = 0;i<this.question[selectedQuestion].tag.length;++i){
			if (this.productos[this.winProduct].indexOf(this.question[selectedQuestion].tag[i]) !== -1){
				realTag = this.question[selectedQuestion].tag[i];
			 	break;
			}
			else
				realTag = '';
		}
		//Si ninguna de las categorias de la respuesta coincide con el producto
		if (realTag === ''){
			delete this.question[selectedQuestion];
			return this.print();
		}
		//2.0 Comprobamos los productos que tengan esa categoria
		for (var p in this.productos){
			let ind = this.productos[p].indexOf(realTag);
			if (ind !== -1) this.productos[p].splice(ind, 1);
			else delete this.productos[p];
		}
		//2.1º Comprobamos en que otras preguntas está esa categoria
		for (var q in this.question){
			let ind = this.question[q].tag.indexOf(realTag)
			if ( ind !== -1){
				savedQuestions.push(q);
				this.question[q].tag.splice(ind, 1);
			}
		}
		//3º Borramos todas las preguntas restantes
		for (q in this.question)
			if (savedQuestions.indexOf(q) === -1){
				//Si no está en la lista
				delete this.question[q];
			}

		this.print();
	}


}

$.get('json/productos.json', function(d){
	console.log(d);
	window.concurso = new Concurso(d.questions, d.products);
}).fail(function (e) {
	console.log(e)
});
