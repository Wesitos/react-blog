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
