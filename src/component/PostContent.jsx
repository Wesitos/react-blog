'use-strict';
var VerMasButton = require("./VerMasButton.jsx");

var MarkdownConverter = new Showdown.converter();

var PostContent = React.createClass({
    getDefaultProps: function(){
        return {
            resumido: true,
            palabrasResumen: 100
        };
    },
    getInitialState: function(){
        return {
            resumido: this.props.resumido
        };
    },
    compiledText: "",

    verMasCallback: function(event){
        console.log("click");
        this.setState({resumido: false});
    },

    componentWillMount: function(){
        var postData = this.props.postData;
        var content = postData.content;
        this.compiledText = MarkdownConverter.makeHtml(content);
    },

    render: function(){
        var postData = this.props.postData;
        var postMeta = postData.meta;
        var postText = this.compiledText;
        var resumido = this.state.resumido;
        var acortarTexto = false;
        if (resumido){
            var listaPalabras = postText.split(" ");
            var cuentaPalabras = listaPalabras.length;
            if (cuentaPalabras > this.props.palabrasResumen){
                acortarTexto = true;
            };
        };
        return(
            <section>
                <article 
                    className="PostContent"
                    dangerouslySetInnerHTML={
                    {__html:acortarTexto?postText.split("<p>").slice(0,2).join("<p>"):postText}}
                    >
                </article>
                {/* Boton Ver mas*/}
                <VerMasButton postMeta={postMeta}
                              resumido={resumido}
                              onClickCallback={this.verMasCallback}
                                        />
            </section>
        );
    }
});

module.exports = PostContent;
