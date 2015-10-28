'use strict';
var glob = require("glob");
var fs = require("fs");
var mkdirp = require("mkdirp");
var gutil = require("gulp-util");
var async = require("async");

var cloneElement = require('react').cloneElement;
var ReactDOMServer = require('react-dom/server');
var Path = require('path');
var Plates = require('plates');

// Archivo de rutas
var routes = require("../routes");

// Transparently support JSX
require("babel/register");

var renderPage = function(data, html, appName){
    var Component = require(["../src/app",appName+".jsx"].join(Path.sep));
    var renderedComponent = ReactDOMServer.renderToString(cloneElement(Component, data));
    var platesData = {
        script: ["/static/js/",appName, ".js"].join("")
    };
    var map = Plates.Map();
    map.where('id').is("app-container").append(renderedComponent);
    map.where('id').is("app-script").use("script").as('src');
    var output =  Plates.bind(html,platesData,map);
    return output;
};

var renderAll = function(progress, done){
    // Procesa cada ruta
    async.each(routes.routes, processRoute,
               function(err){
                   // Aca terminamos la ejecucion de toda la funcion
                   done();
               });

    function processRoute(route, routeCallback){
        var filenames = glob(Path.join("./build/json", route.data),
                             renderFileBatch);

        function renderFileBatch(err, filenames){
            async.each(filenames, renderFile, function(err){
                // Aca terminamos con esta ruta
                routeCallback();
            });

            function renderFile(filename, fileCallback){
                var data = require(Path.join("..",filename));
                var html = fs.readFileSync(Path.join('./src/html', route.html),'utf-8');
                var output = renderPage(data, html, route.app);
                // Cambiamos la extension del nombre
                var baseName = [Path.basename(filename, Path.extname(filename)), ".html"].join("");
                var dirName = Path.join(Path.dirname(filename).replace("build/json", Path.join("build", route.route)));
                var path = Path.join(dirName, baseName);

                // Verificamos si las carpetas necesarias existen antes de guardar
                // el html
                mkdirp(Path.dirname(path), saveOutput);

                // Funcion para guardar el html
                function saveOutput(){
                    fs.writeFile(path, output, function(err){
                        // Aca acabamos con el archivo
                        progress(filename, path);
                        fileCallback();
                    });
                };
            }
        }
    };
};
module.exports = renderAll;
