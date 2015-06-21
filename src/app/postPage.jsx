'use-strict';
//React como variable global
React = require('react');

Blag = require('../component/PostPage.jsx');

blogData = {
    "titulo": "Blag",
    "subtitulo": "Something, something, something complete"
};

if(typeof module !== 'undefined' && module.exports){
    module.exports = function(postData){
        return React.renderToString(<Blag post={postData} blog={blogData}/>);
    };
}
else{
    var request = new XMLHttpRequest();
    request.open('GET', '/data.json', true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400){
            var data = JSON.parse(this.response);
            React.render(<Blag {...data} blog={blogData}/>, document.body);
        };
    };
request.send();
}
