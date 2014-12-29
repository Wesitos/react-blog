'use-strict';
var MarkdownConverter = new Showdown.converter();

var PostContent = React.createClass({
    getDefaultProps: function(){
        return {
            palabrasResumen: 100
        };
    },
    render: function(){
        var postText = MarkdownConverter.makeHtml(this.props.data);
        var acortarTexto = false;
        if (this.props.resumido){
            var listaPalabras = postText.split(" ");
            var cuentaPalabras = listaPalabras.length;
            if (cuentaPalabras > this.props.palabrasResumen){
                acortarTexto = true;
            };
        };
        return(
            <section dangerouslySetInnerHTML={
                     {__html:acortarTexto?postText.split("<p>").slice(0,2).join("<p>"):postText}}>
            </section>
        );
    }
});

module.exports = PostContent;
