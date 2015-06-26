'use strict';

var del = require('del');
var blogConf = require("../config.json").blog;

module.exports =  function(done){
    del(blogConf.autor.build, done);
}
