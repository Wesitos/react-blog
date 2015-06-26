'use strict';

var gulp = require('gulp');
var buildPosts = require('../buildPosts.js');
var plugins = require('gulp-load-plugins')();
var postConfig = require('../config.json').blog.post;
var dataConfig = require('../config.json').path.data;

module.exports = function(){
    var makePostList = plugins.jsoncombine("index.json", function(data){
        var postList = [];
        for(var key in data){
            postList.push(data[key].post);
        };
        var outData = {posts: postList}
        return new Buffer(JSON.stringify(outData));
    })

    return gulp.src(postConfig.src)
        .pipe(buildPosts())
        .pipe(gulp.dest(dataConfig.build))
        .pipe(makePostList)
        .pipe(gulp.dest(dataConfig.build))
};

module.watch = postConfig.src;
