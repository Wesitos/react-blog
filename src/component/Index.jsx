'use-strict';

import React from "react";

import BlogHeader from './BlogHeader.jsx';
import PostList from './PostList.jsx';

var Index = React.createClass({
    propTypes:{
        blog: React.PropTypes.shape({
            titulo: React.PropTypes.string,
            subtitulo: React.PropTypes.string
        }),
        post: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                meta: React.PropTypes.shape({
                    id: React.PropTypes.string.isRequired,
                    fecha: React.PropTypes.string.isRequired,
                    autor: React.PropTypes.string.isRequired,
                    titulo: React.PropTypes.string.isRequired,
                    url: React.PropTypes.string.isRequired,
                }),
                content: React.PropTypes.string.isRequired
            }))
    },
    render: function(){
        var data = this.props;
        return(
            <div>
                <BlogHeader {...data.blog}/>
                <PostList post={data.post}/>
            </div>
        );
    }
});
module.exports = Index;
