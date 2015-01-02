'use-strict';
var VerMasButton = require("./VerMasButton.jsx");

var MarkdownConverter = new Showdown.converter({extensions: ['github']});

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
        this.setState({resumido: false});
    },

    componentWillMount: function(){
        var postData = this.props.postData;
        var content = postData.content;
        this.compiledText = MarkdownConverter.makeHtml(content);
    },
    componentDidMount: function(){
        var post = this.refs.post.getDOMNode();
        // Seleccionamos los bloques de codigo
        var listaBloques = post.getElementsByTagName('code');
        for(var i=0; i< listaBloques.length;i++)
            hljs.highlightBlock(listaBloques[i]);
    },
    componentDidUpdate: function(){
        this.componentDidMount();
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
        var PostArticle = (
            <article
                className="blogPostText"
                ref="post"
                dangerouslySetInnerHTML={
                {__html:acortarTexto?postText.split("<p>").slice(0,2).join("<p>"):postText}}
                >
            </article>
        );
        var Boton = (
            <VerMasButton postMeta={postMeta}
                          onClickCallback={this.verMasCallback}
                          />
        );
        return(
            <section className="blogPostContent">
                {PostArticle}
                {acortarTexto?Boton:undefined}
            </section>
        );
    }
});

module.exports = PostContent;
