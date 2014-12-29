react-blog
============
Blog con frontend con react y nodejs como backend.
### Estructura de carpetas
    training
    ├── build : CSS y Javascript compilados para navegador (creado al construir)
    │   ├── css
    │   └── js : Scripts de /src/app/ compilados
    │       └── vendor : Librerias externas
    ├── media
    └── src
        ├── app : Scripts principales de cada pagina (jsx)
        ├── component : Componentes de react (jsx)
        ├── css
        └── html
### JSX
Un componente de react por archivo en `src/component`. Los componentes se referenciaran entre si utilizando `require` (CommonJS). Ejemplo:
``` js
    /*Archivo: src/component/Foo.jsx */
    
    // Utilizamos el componente Faa que se encuentra en la misma carpeta
    var Faa = require("./Faa.jsx");
    
    var Foo = React.createClass({
        render: function(){
            return(<Faa data="lalala"/>);
        }
    });
    /* Al final de cada componente, hay que almacenarlo en module.exports
       para que pueda ser utilizado */
    module.exports = Foo;
```
``` js
    /* Archivo: src/app/index.jsx */
    
    // Utilizamos un componente de react en el script
    var Foo = require("../component/Foo.jsx");
    
    React.render(<Foo/>, document.body);
```
``` html
<!-- Archivo: src/html/index.html -->
<!DOCTYPE html>
<html>
    <head>
        <script src="static/js/vendor/react-with-addons.js" />
        <script src="/static/js/index.js" />
    </head>
    <body></body>
</html
```
### Como utilizar
Instalar dependencias
``` bash
$ npm install
```
Para construir.
``` bash
$ npm run gulp
```
Para ejecutar
``` bash
$ node app.js
```
