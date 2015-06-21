'use-strict';
var Post = require('./Post.jsx');

var PostList = React.createClass({
    render: function(){
        var listaPosts = this.props.posts;
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
