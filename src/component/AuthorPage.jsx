"user strict";

import React from "react";

import BlogHeader from './BlogHeader.jsx';
import PostList from './PostList.jsx';
import AutorHeader from "./AutorHeader";

var AuthorPage = React.createClass({
    propTypes:{
        blog: React.PropTypes.shape({
            titulo: React.PropTypes.string,
            subtitulo: React.PropTypes.string
        }),
        autor: React.propTypes.shape({
            nombre: React.PropTypes.string.isRequired,
            nickname: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            descripcion: React.PropTypes.string.isRequired,
        }),
        page: React.PropTypes.oneOf(['main', 'post', 'autor']),
        post: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                // La forma de meta aun no esta bien definida
                meta: React.PropTypes.object,
                content: React.PropTypes.string
            })),
    },
    render: function(){
        var data = this.props;
        return(
            <div>
                <BlogHeader {...data.blog}/>
                <AutorHeader {...autor}/>
                <PostList post={data.post}/>
            </div>
        );
    }
});

module.exports = AuthorHeader;
