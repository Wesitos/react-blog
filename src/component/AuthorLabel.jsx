'use-strict';
import React from "react";

var AuthorLabel = React.createClass({
    render: function(){
        var autor = this.props.autor;
        autor = autor.charAt(0).toUpperCase() + autor.slice(1).toLowerCase();
        var autorPageUrl = ["/autor", autor.toLowerCase()].join("/");
        return(
            <a href={autorPageUrl}>{autor}</a>
        );
    }
});

module.exports = AuthorLabel;
