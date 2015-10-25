'use strict';

var through = require('through2');
var  gutil = require('gulp-util');
var Path = require('path');
var yamlFront = require('yaml-front-matter');

// relative path and base path
function makeJson(dataDict, relative) {
    var nameParams = relative.split(Path.sep).pop().split(":"); // [date, [id,] title]
    var fecha = nameParams[0];
    var postId = [nameParams[0],(nameParams.length<3)?1:nameParams[1]].join(":");
    var autor = relative.split(Path.sep)[0];
    var titulo = (dataDict.titulo || nameParams[nameParams.length-1].replace(".md", "").replace(/-/g, " ")).toLowerCase();
    var path = ["autor",
                autor,
                fecha.replace(/-/g,"/"),
                titulo.replace(/ /g,"-").replace(/$/, ".json")].join("/");
    var obj = {
        post: {
            meta: {
                id: [autor,postId].join(":"),
                fecha: fecha,
                autor: autor,
                titulo: titulo,
                url: ["", path.replace(/\.json$/, ".html")].join("/")
            },
            content: dataDict.content
        }};
    return {content:JSON.stringify(obj), path: path};
};

function buildPosts(){
    // Creating a stream through which each file will pass
    return through.obj(function(file, enc, cb) {
        var data = makeJson(yamlFront.loadFront(file.contents, 'content'), file.relative);
        gutil.log("buildPosts", file.relative);
        if (file.isNull()) {
            // return empty file
            return cb(null, file);
        }
        if (file.isBuffer()) {
            file.contents = new Buffer(data.content);
        }
        if (file.isStream()) {
            var stream = through();
            stream.write(text);
            file.contents = file.contents.pipe(stream);
        }
        file.path = Path.join(file.base, data.path);
        return cb(null, file);
    });
};

module.exports = buildPosts;
