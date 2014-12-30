'use-strict';
var AutorLabel  = require('./AutorLabel.jsx');
var PostDate = require('./PostDate.jsx');

var PostHeader = React.createClass({
    render: function(){
        var postData = this.props.postData;
        var meta = postData.meta;
        var titulo = meta.titulo;
        var autor = meta.autor;
        var fecha = meta.fecha;
        return(
            <header>
                <h2>{titulo}</h2>
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
