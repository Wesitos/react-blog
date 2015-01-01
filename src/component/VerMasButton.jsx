'use-strict';

var VerMasButton = React.createClass({
    render: function(){
        var callback = this.props.onClickCallback;
        return(
            <p className="blogVerMasButton"
               onClick={callback}
               >
                Ver Mas
            </p>
        );
    }
});

module.exports = VerMasButton;
