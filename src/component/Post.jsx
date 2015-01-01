'use-strict';
var PostHeader = require('./PostHeader.jsx');
var PostContent = require('./PostContent.jsx');

var Post = React.createClass({
    getDefaultProps: function(){
        return{
            resumido: false
        };
    },
    render: function(){
        var postData = this.props.data;
        var resumido = this.props.resumido;
        return (
            <article className="blogPost">
                <PostHeader postData={postData}/>
                <PostContent postData={postData} resumido={resumido}/>
                <hr/>
            </article>
        );
    }
});

module.exports = Post;
