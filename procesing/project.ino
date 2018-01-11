int led1 = D6;
int led2 = D7;

void setup (){
	//Declaramos el modo de los pins, si es de salida o entrada
	pinmode(led1, OUTPUT);
	pinmode(led2, OUTPUT);
	//Se declara la función dentro de la aplicación. Todas las funciones de processing reciven un string como argumento y un int como output
	Particle.function("led",ledToggle);
	digitalWrite(led1, LOW);
    digitalWrite(led2, LOW);
}

void loop() {
	//empty
}
int ledToggle(String arg) {
	if (arg=="on"){
		digitalWrite(led1, HIGH);
		digitalWrite(led2, HIGH);
		return 1;
	}
	else if (arg=="off") {
		digitalWrite(led1, LOW);
		digitalWrite(led2, LOW);
		return 0;
	}
	else{
		return -1;
	}

} 