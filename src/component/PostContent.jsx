'use-strict';
import React from "react";

import VerMasButton from "./VerMasButton.jsx";

import MarkdownIt from 'markdown-it';
import ReplaceLink from 'markdown-it-replace-link';
import hljs from "highlight.js";

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
        var meta = this.props.meta;
        var assetsDir = ["","assets", meta.autor, ""].join("/");
        var MdRenderer= new MarkdownIt({
            html: false,
            breaks: false,
            linkify: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (__) {}
                }

                try {
                    return hljs.highlightAuto(str).value;
                } catch (__) {}

                return '';
            },
            replaceLink: function (link, env) {
                // Si es un link relativo hacia "assets/", 
                // lo manda a la carpeta de assets del usuario
                return link.replace(/^assets\//, assetsDir);
            }
        }).use(ReplaceLink);
        this.compiledText = MdRenderer.render(content);
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
