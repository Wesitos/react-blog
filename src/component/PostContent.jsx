'use-strict';
var VerMasButton = require("./VerMasButton.jsx");

var marked = require("marked");
var pygmentize = require('pygmentize-bundled');

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang, callback) {
        pigmentize({ lang: lang, format: 'html' }, code, function (err, result) {
            callback(err, result.toString());
        });}
});

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
        var content = this.props.content;
        this.compiledText = marked(content);
    },
    componentDidUpdate: function(){
        this.componentDidMount();
    },
    render: function(){
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
            <VerMasButton onClickCallback={this.verMasCallback} />
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
