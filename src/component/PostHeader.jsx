'user-strict';
AutorLabel  = require('./AutorLabel.jsx');
PostDate = require('./PostDate.jsx');

var PostHeader = React.createClass({
    render: function(){
        var autor = this.props.autor;
        return(
            <header>
                <h2>{this.props.titulo}</h2>
                <p> {"por "}
                    <AutorLabel autor={autor}/>
                    {" el "}
                    <PostDate fecha={this.props.fecha}/>
                </p>
            </header>
        );
    }
});
module.exports = PostHeader;
