'use-strict';
var Post = require('./Post.jsx');

var PostList = React.createClass({
    render: function(){
        var data = this.props.data;
        var listaPosts = data.posts;
        var resumido = true;
        if (data.page == 'post')
        { // Nos aseguramos que solo hay un elemento en la lista
          listaPosts = [listaPosts[0]];
          resumido = false;
        };
        var postDescriptors = listaPosts.map(function(postData){
            return <Post data={postData} resumido={resumido} key={"post-" + postData.meta.id}/>;
        });
        return(
            <section id="blogPostList">
                {postDescriptors}
            </section>
        );
    }
});

module.exports = PostList;
