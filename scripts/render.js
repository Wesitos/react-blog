'use strict';
var glob = require("glob")
var fs = require("fs")
var mkdirp = require("mkdirp");
var gutil = require("gulp-util");

var React = require('react');
var Path = require('path');
var Plates = require('plates');

// Archivo de rutas
var routes = require("../routes");

// Transparently support JSX
require('node-jsx').install({extension: '.jsx'});

var renderPage = function(data, html, appName){
    var renderedComponent = require(["../src/app",appName+".jsx"].join(Path.sep))(data);
    var platesData = {
        script: ["/static/js/",appName,"-min.js"].join("")
    };
    var map = Plates.Map();
    map.where('id').is("app-container").append(renderedComponent);
    map.where('id').is("app-script").use("script").as('src');
    var output =  Plates.bind(html,platesData,map)
    return output
}

var renderAll = function(progress, cb){
    routes.routes.forEach(function (route){
        var filenames = glob.sync(Path.join("./build/json", route.data));
        filenames.forEach(function(filename){
            var data = require(["..",filename].join("/"));
            var html = fs.readFileSync(Path.join('./src/html', route.html),'utf-8');
            var output = renderPage(data, html, route.app);
            // Cambiamos la extension del nombre
            var baseName = [Path.basename(filename, Path.extname(filename)), ".html"].join("");
            var dirName = Path.join(Path.dirname(filename).replace("build/json", Path.join("build", route.route)));
            var path = Path.join(dirName, baseName);

            //Verificamos si las carpetas necesarias existen
            mkdirp.sync(Path.dirname(path));
            fs.writeFileSync(path, output);
            progress(filename, path);
        })
    })
    cb();
}
module.exports = renderAll;
