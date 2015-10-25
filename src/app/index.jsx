'use-strict';

import React from "react";
import App from '../component/Index.jsx';

var blogData = {
    "titulo": "Blag",
    "subtitulo": "Something, something, something complete"
};

var Component = <App blog={blogData}/>;

if (typeof window !== 'undefined' && window.document)
    require("../component/Browser.jsx")(Component);

module.exports = Component;
