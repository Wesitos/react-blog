'use-strict';
Blag = require('../component/Blag.jsx');

var request = new XMLHttpRequest();
request.open('GET', 'data.json', true);
request.onload = function() {
    if (this.status >= 200 && this.status < 400){
        var data = JSON.parse(this.response);
        React.render(<Blag data={data}/>, document.body);
    };
};
request.send();
