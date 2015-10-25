import ReactDOM from "react-dom";
import {cloneElement} from "react";

module.exports = function(Component){
    var request = new XMLHttpRequest();
    var path = window.location.pathname;
    var dataPath = ["/json",path.endsWith(".html")?path.replace(/\.html$/,".json"):path.replace(/$/, "index.json")].join("") ;
    request.open('GET', dataPath, true);
    
    request.onload = function() {
        if (this.status >= 200 && this.status < 400){
            var pageData = JSON.parse(this.response);
            ReactDOM.render(cloneElement(Component, pageData),
                            document.getElementById("app-container"));
        };
    };
    request.send();
};

