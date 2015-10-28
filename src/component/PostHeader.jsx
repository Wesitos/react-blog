'use-strict';
import React from "react";

import AuthorLabel  from './AuthorLabel.jsx';
import PostDate from './PostDate.jsx';

var PostHeader = React.createClass({
    linkOnClickHandler: function(event){
        return;
    },
    render: function(){
        var props = this.props;
        var titulo = props.titulo;
        titulo = titulo.charAt(0).toUpperCase() + titulo.slice(1).toLowerCase();
        var autor = props.autor;
        var fecha = props.fecha;
        var id = props.id;
        var postUrl = props.url;
        return(
            <header className="blogPostHeader">
                <a ref="postLink"
                   className="postName"
                   href={postUrl}
                   onClick={this.linkOnClickHandler}>
                    <h1>{titulo}</h1>
                </a>
                <p className="postSubHeader">
                    <span>{"por "}</span>
                    <AuthorLabel autor={autor}/>
                    <span>{" el "}</span>
                    <PostDate fecha={fecha}/>
                </p>
            </header>
        );
    }
});
module.exports = PostHeader;
