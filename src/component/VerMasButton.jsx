'use-strict';

var VerMasButton = React.createClass({
    render: function(){
        var callback = this.props.onClickCallback;
        var resumido = this.props.resumido;
        return(
            <span hidden={!resumido}
                className={"verMasButton"}
                onClick={callback}
                >
                Ver Mas
            </span>
        );
    }
});

module.exports = VerMasButton;
