var through = require('through2');
var  gutil = require('gulp-util');
var Path = require('path');

const PLUGIN_NAME = "build-posts";

function makeJson(filetext, filename, path) {
    var nameParams = filename.split(":"); // [date, [id,] title]
    var postId = [nameParams[0],(nameParams.length<3)?1:nameParams[1]].join(":");
    var obj = {
        meta: {
            id: postId,
            fecha: nameParams[0],
            autor: Path.dirname(path).split(Path.sep).slice(-2)[0],
            titulo: (nameParans.length<3)?nameParams[2]:nameParams[3]
        },
        content: filetext
    };
    return JSON.stringify(obj);
};

function buildPosts(){
    var stream = through.obj(function(file, enc, cb) {
        var text = makeJson(file.contents, file.relative, file.base);
        var textBuffer = new Buffer(text); // allocate ahead of time

        // Creating a stream through which each file will pass
        return through.obj(function(file, enc, cb) {
            if (file.isNull()) {
                // return empty file
                return cb(null, file);
            }
            if (file.isBuffer()) {
                file.contents = Buffer.concat([textBuffer, file.contents]);
            }
            if (file.isStream()) {
                var stream = through();
                stream.write(text);
                file.contents = file.contents.pipe(stream);
            }
            cb(null, file);
        });
    });
};


// var buildPosts = function(postsPath, buildPath, cb){
//     glob(postsPath, function (err, files){
//         var bufferList = files.map(function getFiles(fileName){
//             fs.readFile(fileName, function(err,data){
//                 if(data) makePost(data, filename, buildPath);});
//         });
//     });
// };

module.exports = buildPosts;
