'use-strict';
var AutorLabel  = require('./AutorLabel.jsx');
var PostDate = require('./PostDate.jsx');

var PostHeader = React.createClass({
    linkOnClickHandler: function(event){
        event.preventDefault();
    },
    render: function(){
        var props = this.props;
        var titulo = props.titulo;
        var autor = props.autor;
        var fecha = props.fecha;
        var id = props.id;
        var postUrl = ["", "posts", autor.nickname, id].join("/");
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
