## p4-t2-networking-alu0100658705
## Pablo Bethencourt Díaz
## alu0100658705@ull.edu.es


## Networking with Sockets

En este capítulo trabajaremos con el soporte incorporado de **Node.js** para conexiones de socket de bajo nivel. Los sockets TCP forman el *backbone* de las aplicaciones de red actuales.

Los contenidos que se trabajan en este capítulo son los siguientes:

1. **Node.js Core**: Creación de módulos personalizados para alojar código reutilizable.

2. **Patterns** : Partiendo que una conexión de red tiene dos puntos finales (endpoints), un patrón común es que un punto final actúe como servidor mientras el otro lo hace como cliente. Se trabajarán con ambos puntos finales.

3. **JavaScriptism** : Utilidades de *Node.js* para crear jerarquías de clases.

4. **Supporting Code** : Trabajar con el framework *Mocha* para realizar pruebas unitarias.

Para comenzar, se desarrollará un servidor TCP simple y otro más completo. Luego se irán mejorando a medida que se trabajen aspectos como la robuztes, la modularidad y la testeabilidad.

### Listening for Socket Connections

 Los servicios de red tienen dos funciones principales: Connectar puntos finales (endpoints) y transmitir información entre ellos. En este apartado veremos como crear servicios basados en sockets utilizando *Node*.


**Binding a Server to a TCP Port**

Las conexiones de socket TCP constan de dos puntos finales; uno se une a un puerto numerado mientras que el otro se conecta a un puerto. En *Node.js* las operaciones de enlace y conexión son proporcionadas por el módulo de red (net module). La forma de enlazar un puerto TCP para escuchar conexiones es la siguiente:

![imagen01](images/cap01.png)

Donde:

- El método **net.createServer** toma una función *callback* y devuelve un objeto *Servidor*. *Node.js* invocará la *callback* cada cada vez que se conecte otro punto final (endpoint).
- El parámetro de conexión será un objeto *Socket* que se puede usar para enviar o recibir datos.
- Llamar a **server.listen** vincula el puerto especificado.

La siguiente figura nos muestra un ejemplo del funcionamiento, donde existe un proceso *Node.js* enlazado a un puerto TCP y donde cualquier número de clientes pueden conectarse al puerto enlazado.

![imagen02](images/cap02.png)


**Writing Data to a Socket**

Como fuente de información para el servicio de red que crearemos a continuación, utilizaremos los cambios producidos en un archivo a partir de las utilidades desarrolladas en prácticas anteriores. 

Primero crearemos un directorio *networking* para almacenar el código que vamos a escribir. Después creamos el siguiente archivo:

![imagen03](images/cap03.png)

En el archivo se observa que:

- En la parte superior se extraen los módulos *fs* y *net*.
- El nombre del archivo se procesa como un argumento en la línea de comandos. En caso de que no se haya especificado un nombre de archivo, se lanza un error.
-  La función *callback createServer* hace tres cosas:
    1. Informa que se ha establecido la conexión (tanto para el cliente con *connection.write* como para la consola).
    2. Empieza a escuchar por cambios en el fichero objetivo, guardando el objeto *watcher* devuelto. Esta *callback* envia información con los cambios al cliente mediante *connection.write*.
    3. Vigila el evento de conexión *close* para dejar de controlar los cambios en el fichero con *watcher.close*.

Por último la *callback* se transmite a *serven.listen* al final. *Node.js* invoca esta función después de que haya enlazado el puerto 60300 con éxito y esté listo para recibir conexiones.


**Connecting to a TCP Socket Server with Netcat**

A continuación comprobamos la ejecución del programa *net-watcher*. Trabajamos con tres terminales distintas:

- En la primera terminal utilizaremos el comando *watch* para realizar un *touch* sobre el fichero *target.txt* en intervalos de 1 segundo:

<code>watch -n 1 touch target.txt</code>

![imagen04](images/cap04.png)

- En la segunda terminal ejecutamos el programa con el fichero, creando un servicio que escucha en el puerto 60300:

![imagen05](images/cap05.png)

- Para conectar con el servicio hacemos uso de *netcat*:

![imagen06](images/cap06.png)

- En la terminal que corre el servicio podremos apreciar que un usuario se ha conectado:

![imagen07](images/cap07.png)

Veamos la configuración creada en el siguiente diagrama, donde el proceso de *net-watcher* enlaza un puerto TCP y observa un archivo. En este caso es posible que varios usuarios se conecten y reciban actualizaciones simultaneas:

![imagen08](images/cap08.png)

*Listening to Unix Sockets*

Los *sockets* de Unix son una alternativa más eficiente si se quiere comunicar procesos en un mismo equipo. Pueden ser más rápidos que los sockets TCP porque no requieren invocar hardware de red.
Para ver cómo el módulo *net* usa este tipo de sockets, modificamos el programa cambiando el *.listen* de la siguiente forma:

![imagen09](images/cap09.png)

Volvemos a ejecutar el programa y para connectar el cliente utilizaremos de nuevo *nc* pero con la opción -U para usar el archivo socket.

![imagen10](images/cap10.png)


### Implementing a Messaging Protocol

Un **protocolo** se puede entender como un conjunto de reglas que define como se comunican los puntos finales en un sistema. En este apartado crearemos un protocolo basado en pasar mensajes *JSON* a través de TCP.

**Serializing messages with JSON**

Cada mensaje es un objeto JSON que es un hash de pares clave-valor, por ejemplo:

<pre><code>{ "Key" : "value", "anotherKey" : "anotherValue" }</pre></code>

El programa *net-watcher* desarrollado en el apartado anterior envía dos tipos de mensaje que tenemos que convertir a JSON:
1. Cuando la conección se establece, el cliente recibe el mensaje "No watching *target.txt* for changes..."
2. Cuando se producen cambios en el fichero, el cliente recibe otro mensaje donde se muestra la notificación y la fecha del cambio.

Codificaremos el primer mensaje de esta forma, donde *type* indica el tipo de mensaje, y *file* hace referencia al fichero que se está controlando: 

![imagen11](images/cap11.png)

En el segundo mensaje, *type* anunciará que el archivo ha sufrido cambios, y el campo *timestamp* contiene un valor entero que representa el número de milisegundos desde la medianoche del 1 de enero de 1970. Modificamos este mensaje:

![imagen12](images/cap12.png)

Ejecutamos el programa y observamos los cambios:

![imagen13](images/cap13.png)


### Creating Socket Client Connections

A continuación definimos un programa cliente en *Node.js* para recibir mensajes JSON en nuestro programa *net-watcher-json-service*. Veamos la implementación:

![imagen14](images/cap14.png)

- *net.connect* se usa para crear una conexión cliente local al puerto 60300.
- El objeto cliente es un Socket, igual que es el caso del servidor.
- Cada vez que ocurre un evento de datos, la función *callback* toma el objeto buffer entrante, analiza el mensaje JSON y luego registra en la consola el mensaje apropiado.
- El programa escucha unicamente eventos de datos.

Vemos su ejecución:

![imagen15](images/cap15.png)
