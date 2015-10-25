'use-strict';

import React from "react";

var PostDate = React.createClass({
    render: function(){
        var date = new Date(this.props.fecha.split('-'));
        var listaFecha = [date.getUTCDate(),
                          date.getUTCMonth()+1,
                          date.getUTCFullYear()];
        var strFecha =  listaFecha.reduce(function(x,y){
            return x + "/" + y;
        });
        return(
            <time className="postDate" dateTime={this.props.fecha}>{strFecha}</time>
        );
    }
});

module.exports = PostDate;
