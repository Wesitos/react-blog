'use-strict';
import React from "react";

import Post from './Post.jsx';

var PostList = React.createClass({
    propTypes:{
        post: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                meta: React.PropTypes.shape({
                    id: React.PropTypes.string.isRequired,
                    fecha: React.PropTypes.string.isRequired,
                    autor: React.PropTypes.string.isRequired,
                    titulo: React.PropTypes.string.isRequired,
                    url: React.PropTypes.string.isRequired,
                }),
                content: React.PropTypes.string.isRequired,
            })),
        resumido: React.PropTypes.bool,
    },
    getDefaultProps: function(){
        return {resumido: true};
    },
    render: function(){
        // Por si solo es un post
        var listaPosts = this.props.post;
        var postDescriptors = listaPosts.map(function(postData){
            return <Post {...postData} key={"post-" + postData.meta.id}/>;
        });
        return(
            <main id="blogPostList">
                {postDescriptors}
            </main>
        );
    }
});

module.exports = PostList;
