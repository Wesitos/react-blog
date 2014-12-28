'user strict';
React = require('react/addons');

var PostDate = React.createClass({
    render: function(){
        var date = new Date(this.props.fecha); 
        var listaFecha = [date.getUTCDate(),
                          date.getUTCMonth(),
                          date.getUTCFullYear()];
        var strFecha =  listaFecha.reduce(function(x,y){
            return x + "/" + y;
        });
        return(
            <span className="postDate">{strFecha}</span>
        );
    }
});


module.exports = PostDate;
