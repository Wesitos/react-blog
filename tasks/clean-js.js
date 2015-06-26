'use strict';

var del = require('del');
var scriptConf = require("../config.json").path.script;

module.exports =  function(done){
    del( scriptConf.build , done );
};
