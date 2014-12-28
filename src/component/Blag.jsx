'user strict';

React = require('react/addons');
BlogHeader = require('./BlogHeader.jsx');
PostList = require('./PostList.jsx');

var Blag = React.createClass({
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
