'use-strict';

var AutorLabel = React.createClass({
    render: function(){
        var autor = this.props.autor;
        return(
            <a href={autor.url}>{autor.nombre}</a>
        );
    }
});

module.exports = AutorLabel;
