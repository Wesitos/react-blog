'use-strict';
//React como variable global
React = require('react');

Blag = require('../component/Index.jsx');

blogData = {
    "titulo": "Blag",
    "subtitulo": "Something, something, something complete"
};

if(typeof module !== 'undefined' && module.exports){
    module.exports = function(postData){
        return React.renderToString(<Blag posts={postData} blog={blogData}/>);
    };
}
else{
    var request = new XMLHttpRequest();
    request.open('GET', '/json/index.json', true);
    request.onload = function() {
        if (this.status >= 200 && this.status < 400){
            var data = JSON.parse(this.response);
            React.render(<Blag {...data} blog={blogData}/>, document.body);
        };
    };
request.send();
}
