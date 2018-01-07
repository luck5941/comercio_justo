#Practica Final

## Descripcion
Se trata de una aplicacion *in Real Time* con el fin de permitir usar las cualidades tactiles del terminal movil a modo de *mouse* inalambrico en una pantalla remota.
Cuando el usuario resuelva los acertijos propuestos, se ilumina a partin de una placa de *particle photon* una serie de leds.

##Requisistos
Dado que la base de la comunicacion entre los dos dispositivos y la placa es wifi, sera necesario la implementacion de librerias que permitan dicha comunicacion. Para ello se ha escogido socket.io con el objetivo de entrelazar el movil con la pantalla. Y uno de ellos, previsiblemente la pantalla se encargara de enviar via AJAX a la api que proporciona la plataforma de particle a traves de jquery, libreria que, entre otras muchas cualidades, facilita considerablemente el trabajo con este tipo de comunicaciones.

Por tanto se necesita, hasta este momento (a nivel de software)

 **Librerias**
  * nodeJS
  * http
  * socket io
  * jquery
  
 **Task list**
 A continuacion se mostrara una lista de tareas a realizar, las cuales se iran poniendo en italic a medida que se finalicen
 
 1. *Creacion del proyecto con nodeJS*
 2. *Creacion del servidor (o importacion del mismo)*
 3. Comunicacion entre ambos clientes
 4. Comunicacion con la API de photon
 5. Desarrollo de la aplicacion para
    	1. Movil
		2. Ordenador
		3. Photon
 6. Diseño del cliente
		1. Movil
		2. Cliente
		3. Photon (cableado)
 
 


