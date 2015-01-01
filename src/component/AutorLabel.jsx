'use-strict';

var AutorLabel = React.createClass({
    render: function(){
        var autor = this.props.autor;
        var autorPageUrl = "/autor/" + autor.nickname;
        return(
            <a href={autorPageUrl}>{autor.nombre}</a>
        );
    }
});

module.exports = AutorLabel;
