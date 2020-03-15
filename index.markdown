---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
---

### Pablo Bethencourt Díaz

### alu0100658705@ull.edu.es

## Práctica 3: Node.js 8 the Right Way. Networking with Sockets

En este capítulo trabajaremos con el soporte incorporado de **Node.js** para conexiones de socket de bajo nivel. Los sockets TCP forman el *backbone* de las aplicaciones de red actuales.

Los contenidos que se trabajan en este capítulo son los siguientes:

1. **Node.js Core**: Creación de módulos personalizados para alojar código reutilizable.

2. **Patterns** : Partiendo que una conexión de red tiene dos puntos finales (endpoints), un patrón común es que un punto final actúe como servidor mientras el otro lo hace como cliente. Se trabajarán con ambos puntos finales.

3. **JavaScriptism** : Utilidades de *Node.js* para crear jerarquías de clases.

4. **Supporting Code** : Trabajar con el framework *Mocha* para realizar pruebas unitarias.

Para comenzar, se desarrollará un servidor TCP simple y otro más completo. Luego se irán mejorando a medida que se trabajen aspectos como la robuztes, la modularidad y la testeabilidad.

### Contenidos: 
- [Listening for Socket Connections](Listening-Socket-Connections.html)
- [Implementing a Messaging Protocol](Implementing-Messaging-Protocol.html)
- [Creating Socket Client Connections](Creating-Socket-Client-Connections.html)
- [Testing Network Application Functionality](Testing-Network-Application-Functionality.html)
- [Extending Core Classes in Custom Modules](Extending-Core-Classes.html)
- [Developing Unit Test with Mocha](Unit-Test-Mocha.html)
- [Ejercicios](Ejercicios.html)