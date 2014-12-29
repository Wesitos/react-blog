'use-strict';
var Post = require('./Post.jsx');

var PostList = React.createClass({
    render: function(){
        var listaPosts = this.props.data.map(function(postProps){
            return <Post data={postProps} resumido={true}/>;
        });
        return(
            <section>
                {listaPosts}
            </section>
        );
    }
});

module.exports = PostList;
