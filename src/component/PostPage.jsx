'use-strict';

import React from "react";

import BlogHeader from './BlogHeader.jsx';
import Post from './Post.jsx';

var PostPage = React.createClass({
    propTypes:{
        data: React.PropTypes.shape({
            blog: React.PropTypes.shape({
                titulo: React.PropTypes.string,
                subtitulo: React.PropTypes.string
            }),
            page: React.PropTypes.oneOf(['main', 'post']),
            posts: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    // La forma de meta aun no esta bien definida
                    meta: React.PropTypes.object,
                    content: React.PropTypes.string
                }))
        })
    },
    render: function(){
        var data = this.props;
        return(
            <div>
                <BlogHeader {...data.blog}/>
                <Post {...data.post} resumido={false}/>
            </div>
        );
    }
});
module.exports = PostPage;
