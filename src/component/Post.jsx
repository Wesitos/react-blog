'use-strict';
import React from "react";

import PostHeader from './PostHeader.jsx';
import PostContent from './PostContent.jsx';

var Post = React.createClass({
    getDefaultProps: function(){
        return{
            resumido: true
        };
    },
    render: function(){
        var meta = this.props.meta;
        var content = this.props.content;
        var resumido = this.props.resumido;
        return (
            <article className="blogPost">
                <PostHeader {...meta}/>
                <PostContent content={content} resumido={resumido}/>
                <hr/>
            </article>
        );
    }
});

module.exports = Post;
