// ==UserScript==
// @name        LinkFlagger
// @version     4
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// ==/UserScript==

var links = document.getElementsByTagName('a');
var element;

// Flags brainhoney links red
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.href.indexOf("https://byui.brainhoney") === 0) {
        element.style.color = "#ff0000";
        element.style.backgroundColor = "#000000";
    }
}

// Flags box links red
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.href.indexOf("https://app.box") === 0) {
        element.style.color = "#ff0000";
        element.style.backgroundColor = "#000000";
    }
}

// Flags links that don't open in new window
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.target.indexOf("_blank") !== 0 && !element.hasAttribute("class") && element.href.indexOf("http") == 0) {
        element.style.border = "3px dotted #ffaa00";
    }
}

var linksimg = document.getElementsByTagName('img');
var element;

// Flags images from brainhoney with red border
for (var i = 0; i < linksimg.length; i++) {
    element = linksimg[i];
    if (element.src.indexOf("https://byui.brainhoney") === 0) {
        element.style.border = "5px solid #ff0000";
    }
}

// Flags images without alt with a blue border. 
for (var i = 0; i < linksimg.length; i++) {
    element = linksimg[i];
    if (!element.hasAttribute("alt")) {
        element.style.outline = "5px solid #0000ff";
    }
}
