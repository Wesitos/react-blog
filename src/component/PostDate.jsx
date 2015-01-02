'use-strict';

var PostDate = React.createClass({
    render: function(){
        var date = new Date(this.props.fecha.split('-'));
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
