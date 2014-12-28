'user strict';
var MarkdownConverter = new Showdown.converter();

var Blag = React.createClass({
    render: function(){
        var data = this.props.data;
        return(
            <div>
                <BlogHeader {...data.blog}/>
                <PostsList data={data.posts}/>
            </div>
        );
    }
});

var BlogHeader = React.createClass({
    render: function(){
        var titulo = this.props.titulo;
        var subtitulo = this.props.subtitulo;
        var style = {
            width: '100%'
        };
        return(
            <header className="blogHeader" style={style}>
                <h1>{titulo}</h1>
                <h3>{subtitulo}</h3>
            </header>
        );
    }
});

var PostsList = React.createClass({
    render: function(){
        var listaPosts = this.props.data.map(function(postProps){
            return <Post data={postProps} resumido={true}/>;
        });
        return(
            <section>
                {listaPosts}
            </section>
        );
    }
});

var Post = React.createClass({
    getDefaultProps: function(){
        return{
            resumido: false
        };
    },
    render: function(){
        var headerProps = this.props.data.header;
        var contentData = this.props.data.content;
        var resumido = this.props.resumido;
        return (
            <article className="blogPost">
                <PostHeader {...headerProps}/>
                <PostContent data={contentData} resumido={resumido}/>
            </article>
        );
    }
});

var PostHeader = React.createClass({
    render: function(){
        var autor = this.props.autor;
        return(
            <header>
                <h2>{this.props.titulo}</h2>
                <p> {"por "}
                    <AutorLabel autor={autor}/>
                    {" el "}
                    <PostDate fecha={this.props.fecha}/>
                </p>
            </header>
        );
    }
});

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

var AutorLabel = React.createClass({
    render: function(){
        var autor = this.props.autor;
        return(
            <a href={autor.url}>{autor.nombre}</a>
        );
    }
});

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
