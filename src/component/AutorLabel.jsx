'use-strict';
import React from "react";

var AutorLabel = React.createClass({
    render: function(){
        var autor = this.props.autor;
        autor = autor.charAt(0).toUpperCase() + autor.slice(1).toLowerCase();
        var autorPageUrl = ["", autor].join("/");
        return(
            <a href={autorPageUrl}>{autor}</a>
        );
    }
});

module.exports = AutorLabel;
