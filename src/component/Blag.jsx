'use-strict';

var BlogHeader = require('./BlogHeader.jsx');
var PostList = require('./PostList.jsx');

var Blag = React.createClass({
    propTypes:{
        data: React.PropTypes.shape({
            blog: React.PropTypes.shape({
                titulo: React.PropTypes.string,
                subtitulo: React.PropTypes.string
            }),
            page: React.PropTypes.oneOf(['main', 'post']),
            posts: React.PropTypes.arrayOf(
                React.PropTypes.shape({
                    // La forma de meta aun no esta bien definida
                    meta: React.PropTypes.object,
                    content: React.PropTypes.string
                }))
        })
    },
    render: function(){
        var data = this.props.data;
        return(
            <div>
                <BlogHeader {...data.blog}/>
                <PostList data={data.posts}/>
            </div>
        );
    }
});
module.exports = Blag;
