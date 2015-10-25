'use-strict';

import React from "react";
import _ from "lodash";

import BlogHeader from './BlogHeader.jsx';
import PostList from './PostList.jsx';

var PostPage = React.createClass({
    propTypes:{
        data: React.PropTypes.shape({
            blog: React.PropTypes.shape({
                titulo: React.PropTypes.string,
                subtitulo: React.PropTypes.string
            }),
            post: React.PropTypes.shape({
                // La forma de meta aun no esta bien definida
                meta: React.PropTypes.object,
                content: React.PropTypes.string
            })
        })
    },
    render: function(){
        var data = this.props;
        var post = _.clone(data.post, true);
        post.resumido= true;
        return(
            <div>
                <BlogHeader {...data.blog}/>
                <PostList post={[post]} />
            </div>
        );
    }
});
module.exports = PostPage;
