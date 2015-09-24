// ==UserScript==
// @name        Link Highlighter
// @description Highlights brainhoney links.
// @include     *
// @exclude     *brainhoney.com*
// ==/UserScript==


var links = document.getElementsByTagName('a');

var element;

// Flags brainhoney links red
for (var i = 0; i < links.length; i++) {

    element = links[i];

    if (element.href.indexOf("https://byui.brainhoney") == 0) {

        element.style.color = "#ff0000";
        element.style.backgroundColor = "#000000";
    }
}

// Flags box links red
for (var i = 0; i < links.length; i++) {

    element = links[i];

    if (element.href.indexOf("https://app.box") == 0) {

        element.style.color = "#ff0000";
        element.style.backgroundColor = "#000000";
    }
}

// Flags links that dont open in new windows yellow
//for ( var i = 0; i < links.length; i++ ) {


// Flags images from brainhoney with red border
var linksimg = document.getElementsByTagName('img');
var element;

for (var i = 0; i < linksimg.length; i++) {

    element = linksimg[i];

    if (element.src.indexOf("https://byui.brainhoney") == 0) {

        element.style.border = "10px solid #ff0000";
    }
}