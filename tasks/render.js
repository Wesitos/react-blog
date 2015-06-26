'use strict';

var renderPages = require('../render.js');
var gutil = require('gulp-util');
var dataConfig = require('../config.json').path.data;
var Path = require('path');

module.exports =  function(done){
    renderPages(function(origin, dest){
        gutil.log("Render", origin, ">>", dest);
    }, done);
};
module.exports.dependencies = ['posts'];
module.watch = Path.join(dataConfig.src, ['**/*', dataConfig.extname].join(''));
