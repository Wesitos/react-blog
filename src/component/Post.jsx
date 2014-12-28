React = require('react/addons');
PostHeader = require('./PostHeader.jsx');
PostContent = require('./PostContent.jsx');

var Post = React.createClass({
    getDefaultProps: function(){
        return{
            resumido: false
        };
    },
    render: function(){
        var headerProps = this.props.data.header;
        var contentData = this.props.data.content;
        var resumido = this.props.resumido;
        return (
            <article className="blogPost">
                <PostHeader {...headerProps}/>
                <PostContent data={contentData} resumido={resumido}/>
            </article>
        );
    }
});
