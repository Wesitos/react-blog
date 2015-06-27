'use strict';

var gulp = require('gulp');
var buildPosts = require('../scripts/buildPosts.js');
var plugins = require('gulp-load-plugins')();
var postConfig = require('../config.json').blog.post;
var dataConfig = require('../config.json').path.data;

module.exports = function(){
    var makePostList = plugins.jsoncombine("index.json", function(data){
        var postList = [];
        for(var key in data){
            postList.push(data[key].post);
        };
        postList.sort(function(x,y){
            var fechaX = new Date(x.fecha.split('-'));
            var fechaY = new Date(y.fecha.split('-'));

            return (fechaY - fechaX) || x.autor.localeCompare(y.autor);
        });
        var outData = {post: postList}
        return new Buffer(JSON.stringify(outData));
    })

    return gulp.src(postConfig.src)
        .pipe(buildPosts())
        .pipe(gulp.dest(dataConfig.build))
        .pipe(makePostList)
        .pipe(gulp.dest(dataConfig.build))
};

module.watch = postConfig.src;
