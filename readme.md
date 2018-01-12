#Practica Final

## Descripcion
Se trata de una aplicación *in Real Time* con el fin de permitir usar las cualidades táctiles del terminal móvil a modo de *mouse* inalambrico en una pantalla remota.
Cuando el usuario resuelva los acertijos propuestos, se ilumina a partir de una placa de *particle photon* una serie de leds.

##Requisistos
Dado que la base de la comunicación entre los dos dispositivos y la placa es wifi, sera necesario la implementación de librerías que permitan dicha comunicación. Para ello se ha escogido socket.io con el objetivo de entrelazar el móvil con la pantalla. Y uno de ellos, previsibleménte la pantalla se encargara de enviar vía AJAX a la API que proporciona la plataforma de particle a través de jquery, librería que, entre otras muchas cualidades, facilita considerablemente el trabajo con este tipo de comunicaciones.

Por tanto se necesita, hasta este momento (a nivel de software)

 **Librerias**
  * nodeJS
  * http
  * socket io
  * jquery

 **Task list**
 A continuación se mostrara una lista de tareas a realizar, las cuales se irán poniendo en italic a medida que se finalicen

 1. *Creación del proyecto con nodeJS*
 2. *Creación del servidor (o importación del mismo)*
 3. *Comunicación entre ambos clientes*
 4. Comunicación con la API de photon
 5. *Desarrollo de la aplicación para*
    	1. *Movil*
		2. *Ordenador*
		3. Photon
 6. Diseño del cliente
		1. Móvil
		2. Cliente
		3. *Photon (cableado)*



 ## Diseño de la aplicación
Inicialmente aparecen 16 preguntas, que se irán descartando según lo que haya preguntado el usuario previamente

Cada producto tiene un array asociado con cada tag o etiqueta

Cada pregunta tiene asociado un array con todos los productos que pueden cumplir la condición que establezca la pregunta

Al responder, se añade la etiqueta a una lista y se descartan todos los productos que no tengan esta etiqueta y todas las preguntas que no tengan asociado un producto posible.
