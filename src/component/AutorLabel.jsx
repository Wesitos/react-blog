'use-strict';

var AutorLabel = React.createClass({
    render: function(){
        var autor = this.props.autor;
        var autorPageUrl = ["", autor].join("/");
        return(
            <a href={autorPageUrl}>{autor}</a>
        );
    }
});

module.exports = AutorLabel;
