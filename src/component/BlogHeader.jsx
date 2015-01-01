'use-strict';

var BlogHeader = React.createClass({
    render: function(){
        var titulo = this.props.titulo;
        var subtitulo = this.props.subtitulo;
        return(
            <header id="blogHeader" className="shadow">
                <a href="/"><h1>{titulo}</h1></a>
                <h3>{subtitulo}</h3>
            </header>
        );
    }
});

module.exports = BlogHeader;
