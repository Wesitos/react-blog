'use-strict';
var AutorLabel  = require('./AutorLabel.jsx');
var PostDate = require('./PostDate.jsx');

var PostHeader = React.createClass({
    linkOnClickHandler: function(event){
        event.preventDefault();
        console.log("Link", this.refs.postLink.props.href);
    },
    render: function(){
        var postData = this.props.postData;
        var meta = postData.meta;
        var titulo = meta.titulo;
        var autor = meta.autor;
        var fecha = meta.fecha;
        var postUrl = "/post/" + meta.id;
        return(
            <header className="blogPostHeader">
                <a ref="postLink"
                   href={postUrl} onClick={this.linkOnClickHandler}><h2>{titulo}</h2></a>
                <p> {"por "}
                    <AutorLabel autor={autor}/>
                    {" el "}
                    <PostDate fecha={fecha}/>
                </p>
            </header>
        );
    }
});
module.exports = PostHeader;
