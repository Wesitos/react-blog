react-blog
============
Blog estatico construido con react.
### Estructura de carpetas
    Blag
    ├── build : Raiz de los archivos servidos
    ├── static
    │   │   ├── css
    │   │   └── js
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
Los scripts en App deben encargarse del renderizado de la pagina cuando se ejecuten en el cliente.
Esto incluye descargar la data necesaria para el renderizado.
Al ejecutarse en el servidor, deben exportar una funcion que reciba las propiedades del componente
y devuelva el componente renderizado en una cadena.
``` js
    /* Archivo: src/app/index.jsx */
    
    // Utilizamos un componente de react en el script
    var Foo = require("../component/Foo.jsx");
    
    React.render(<Foo/>, document.body);
    
    if(typeof window !== 'undefined' && window.document){
        var path = window.location.pathname;
        var dataPath = ["/json",path.endsWith(".html")?path.replace(/\.html$/,".json"):path.replace(/$/, "index.json")].join("") ;
        request.open('GET', dataPath, true);
        request.onload = function() {
            if (this.status >= 200 && this.status < 400){
                var appData = JSON.parse(this.response);
                React.render(<Foo {...appData}/>, document.getElementById("app-container"));
            };
        };
        request.send();
    }
    else if(typeof module !== 'undefined' &&  module.exports){
        module.exports = function(appData){
            return React.renderToString(<Foo {...appData}/>);
        };
    }
```
Utilizamos Plates.js para inyectar el componente renderizado en el documento html ademas
de incluir el script que manejara las actualizaciones en el cliente.
``` html
<!-- Archivo: src/html/index.html -->
<!DOCTYPE html>
<html>
    <head>
        <script src="static/js/vendor/vendor.js"></script>
    </head>
    <body>
        <div id="app-container"></div>
        <script src=""></script> <!-- <script src="/static/js/index.js"></script> -->
    </body>
</html
```
### Como utilizar
Instalar dependencias
``` bash
$ npm install
```
Para construir.
``` bash
$ npm run build
```
Para construir continuamente
``` bash
$ npm run dev
```
Para ejecutar
``` bash
$ node app.js
```
