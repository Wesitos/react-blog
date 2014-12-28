'use-strict';
React = require('react/addons');

var BlogHeader = React.createClass({
    render: function(){
        var titulo = this.props.titulo;
        var subtitulo = this.props.subtitulo;
        var style = {
            width: '100%'
        };
        return(
            <header className="blogHeader" style={style}>
                <h1>{titulo}</h1>
                <h3>{subtitulo}</h3>
            </header>
        );
    }
});

module.exports = BlogHeader;
