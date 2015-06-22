'use-strict';
//React como variable global
React = require('react');

App= require('../component/PostPage.jsx');

blogData = {
    "titulo": "Blag",
    "subtitulo": "Something, something, something complete"
};

if(typeof window !== 'undefined' && window.document){
    var request = new XMLHttpRequest();
    var path = window.location.pathname;
    var dataPath = ["/json",path.endsWith(".html")?path.replace(/\.html$/,".json"):path.replace(/$/, "index.json")].join("") ;
    request.open('GET', dataPath, true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400){
            var pageData = JSON.parse(this.response);
            React.render(<App {...pageData} blog={blogData}/>, document.getElementById("app-container"));
        };
    };
    request.send();
}
else if(typeof module !== 'undefined' &&  module.exports){
    module.exports = function(pageData){
        return React.renderToString(<App {...pageData} blog={blogData}/>);
    };
}
