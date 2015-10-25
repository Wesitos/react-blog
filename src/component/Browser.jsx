import ReactDOM from "react-dom";
import {cloneElement} from "react";

module.exports = function(Component){
    var request = new XMLHttpRequest();
    var path = window.location.pathname;
    var dataPath = path.replace(/^/, "/json") //Carpeta json
                       .replace(/\.html$/, ".json") //Cambia html por json
                       .replace(/\/$/, "/index.json"); // Para los index
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

