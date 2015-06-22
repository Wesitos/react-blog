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
    request.open('GET', ["/json", window.location.pathname.replace(".html",".json")].join(""), true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400){console.log("Data loaded!");
            var data = JSON.parse(this.response);
            React.render(<App post={data} blog={blogData}/>, document.getElementById("app-container"));
        };
    };
    request.send();
}
else if(typeof module !== 'undefined' &&  module.exports){
    module.exports = function(postData){
        return React.renderToString(<App post={postData} blog={blogData}/>);
    };
}
