---
layout: default
title:  "Creating Socket Client Connections"
date:   2020-03-15 13:39:18 +0000
categories: blog
author: "Pablo Bethencourt Díaz"
---

### Creating Socket Client Connections

A continuación definimos un programa cliente en *Node.js* para recibir mensajes JSON en nuestro programa *net-watcher-json-service*. Veamos la implementación:

![imagen14](images/cap14.png)

- *net.connect* se usa para crear una conexión cliente local al puerto 60300.
- El objeto cliente es un Socket, igual que es el caso del servidor.
- Cada vez que ocurre un evento de datos, la función *callback* toma el objeto buffer entrante, analiza el mensaje JSON y luego registra en la consola el mensaje apropiado.
- El programa escucha unicamente eventos de datos.

Vemos su ejecución:

![imagen15](images/cap15.png)
