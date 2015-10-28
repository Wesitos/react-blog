'use-strict';
import React from "react";

var BlogHeader = React.createClass({
    render: function(){
        var titulo = this.props.titulo;
        var subtitulo = this.props.subtitulo;
        return(
            <header id="blogHeader">
                <a href="/">{titulo}</a>
                <h3>{subtitulo}</h3>
            </header>
        );
    }
});

module.exports = BlogHeader;
