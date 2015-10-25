"user strict";

import React from "react";

var AuthorCard = React.createClass({
    propTypes: {
        autor: React.propTypes.shape({
            nombre: React.PropTypes.string.isRequired,
            nickname: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            descripcion: React.PropTypes.string.isRequired,
        }).isRequired,
        linkedName: React.propTypes.bool,
    },
    getDefaultProps: function(){
        return {linkedName: false};
    },
    render: function(){
        var props = this.props;
        return(
            <div>
                <header>
                    <h3>{props.nombre}</h3>
                    <span class="">{props.url}</span>
                </header>
                <p>{props.descripcion}</p>
            </div>
        );
    }
});

module.exports = AuthorCard;
