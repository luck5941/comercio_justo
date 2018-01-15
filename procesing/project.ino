int led0 = D0;
int led1 = D1;
int led2 = D2;
int led3 = D3;
int led4 = D4;
int led5 = D5;
int led6 = D6;
int led7 = D7;

void setup (){
	//Declaramos el modo de los pins, si es de salida o entrada
	pinMode(led0, OUTPUT);
	pinMode(led1, OUTPUT);
	pinMode(led2, OUTPUT);
	pinMode(led3, OUTPUT);
	pinMode(led4, OUTPUT);
	pinMode(led5, OUTPUT);
	pinMode(led6, OUTPUT);
	pinMode(led7, OUTPUT);
	//Se declara la función dentro de la aplicación. Todas las funciones de processing reciven un string como argumento y un int como output
	Particle.function("led",ledToggle);
	Particle.function("toChange", myFunction);
}


void loop() {
	//empty
}
int ledToggle(String arg) {
	if (arg=="init"){
		boolean flag = true;
		for (int i =2000; i>0;i =i/2){
			if (flag) {
				myFunction("H");
				flag = false;
			}
			else {
				myFunction("L");
				flag = true;
			}
			delay(i);
		}
		myFunction("L");
		return -10;
	}
	if (arg=="0"){
		myFunction("L");
		digitalWrite(led1, HIGH);
		return 0;
	}else if (arg=="1"){
		myFunction("L");
		digitalWrite(led1, HIGH);
		return 1;
	}else if (arg=="2"){
		myFunction("L");
		digitalWrite(led2, HIGH);
        return 2;
	}
	else if (arg=="3"){
		myFunction("L");
		digitalWrite(led3, HIGH);
		return 3;
	}
	else if (arg=="4"){
		myFunction("L");
		digitalWrite(led4, HIGH);
		return 4;
	}
	else if (arg=="5"){
		myFunction("L");
		digitalWrite(led5, HIGH);
		return 5;
	}
	else if (arg=="6"){
		myFunction("L");
		digitalWrite(led6, HIGH);
		return 6;
	}
	else if (arg=="on"){
		myFunction("H");
		return -11;
	}
	else if (arg=="off") {
		myFunction("L");
		return -12;
	}
	else{
		return -1;
	}

}

int myFunction(String opt) {
	if (opt == "H"){
	    digitalWrite(led1, HIGH);
	    digitalWrite(led2, HIGH);
	    digitalWrite(led3, HIGH);
	    digitalWrite(led4, HIGH);
	    digitalWrite(led5, HIGH);
	    digitalWrite(led6, HIGH);
	    digitalWrite(led7, HIGH);
	    return -1;
	}
	else if (opt=="L"){
		digitalWrite(led1, LOW);
		digitalWrite(led3, LOW);
		digitalWrite(led2, LOW);
		digitalWrite(led4, LOW);
		digitalWrite(led5, LOW);
		digitalWrite(led6, LOW);
		digitalWrite(led7, LOW);
		return -1;
	}
}
