'use-strict';
import React from "react";

import Post from './Post.jsx';

var PostList = React.createClass({
    render: function(){
        var listaPosts = [].concat(this.props.post);
        var postDescriptors = listaPosts.map(function(postData){
            return <Post {...postData} resumido={true} key={"post-" + postData.meta.id}/>;
        });
        return(
            <section id="blogPostList">
                {postDescriptors}
            </section>
        );
    }
});

module.exports = PostList;
