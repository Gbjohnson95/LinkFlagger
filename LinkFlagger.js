// ==UserScript==
// @name        LinkFlagger
// @version     10
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
    }
}

// Flags box links red
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.href.indexOf("https://app.box") === 0) {
        element.style.color = "#ff0000";
    }
}

// Flags links that don't open in new window
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.target.indexOf("_blank") !== 0 && !element.hasAttribute("class") && element.href.indexOf("javascript") !== 0 && !element.hasAttribute("name") && !element.hasAttribute("id"))  {
        element.style.border = "3px dotted #ffaa00";
    }
}

// Puts a red bar at the top if the title is wrong.
var titles = document.getElementsByTagName('title');
for (var i; i < links.length; i++) {
    element = titles[i];
    if (element.innerHTML == "BYU-Idaho") {
        var body = document.getElementsByTagName('body');
        var element1;
        
        var element1 = body[0];
        
        element.style.borderTop = "3px dotted #ff0000";
    }


}

var linksimg = document.getElementsByTagName('img');
var images;

// Flags images from brainhoney with red border
for (var i = 0; i < linksimg.length; i++) {
    images = linksimg[i];
    if (images.src.indexOf("https://byui.brainhoney") === 0) {
        images.style.border = "5px solid #ff0000";
    }
}

// Flags images without alt with a blue border. 
for (var i = 0; i < linksimg.length; i++) {
    images = linksimg[i];
    if (!images.hasAttribute("alt") && !images.hasAttribute("class") ) {
        images.style.outline = "5px solid #0000ff";
    }
}
