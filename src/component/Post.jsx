'use-strict';
import React from "react";

import PostHeader from './PostHeader.jsx';
import PostContent from './PostContent.jsx';

var Post = React.createClass({
    propTypes: {
        meta: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            fecha: React.PropTypes.string.isRequired,
            autor: React.PropTypes.string.isRequired,
            titulo: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
        }),
        content: React.PropTypes.string.isRequired,
    },
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
                <PostContent meta={meta} content={content} resumido={resumido}/>
                <hr/>
            </article>
        );
    }
});

module.exports = Post;
