// ==UserScript==
// @name        LinkFlagger
// @version     13
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
        element.setAttribute('title', 'This a iLearn 2.0 link and HAS TO be updated to iLearn 3.0. ');
    }
}

// Flags box links red
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.href.indexOf("https://app.box") === 0) {
        element.style.color = "#ff0000";
        element.setAttribute('title', 'This a Box link, Box has shut down functionality, Move to Equella. ');
    }
}

// Flags links that don't open in new window
for (var i = 0; i < links.length; i++) {
    element = links[i];
    if (element.target.indexOf("_blank") !== 0 && !element.hasAttribute("class") && element.href.indexOf("javascript") !== 0 && !element.hasAttribute("name") && !element.hasAttribute("id") && !element.hasAttribute('role'))  {
        element.style.border = "3px dotted #ffaa00";
        element.setAttribute('title', 'This link does not open in a new window, and needs to. ');
    }
}

var linksimg = document.getElementsByTagName('img');
var images;

// Flags images from brainhoney with red border
for (var i = 0; i < linksimg.length; i++) {
    images = linksimg[i];
    if (images.src.indexOf("https://byui.brainhoney") === 0) {
        images.style.border = "5px solid #ff0000";
        images.setAttribute('title', 'This Image is hosted by iLearn 2.0, and HAS TO be moved to iLearn 3.0. ');
    }
}

// Flags images without alt with a blue border. 
for (var i = 0; i < linksimg.length; i++) {
    images = linksimg[i];
    if (!images.hasAttribute("alt") && !images.hasAttribute("class") ) {
        images.style.outline = "5px solid #0000ff";
    }
}

// If title is BYU-Idaho or Vanilla Template it puts a red box around the page. 
var titles = document.getElementsByTagName('title');
for (var i = 0; i < links.length; i++) {
    element = titles[i];
    if (element.textContent == "BYU-Idaho" || element.textContent == "Vanilla Template") {
        var body = document.getElementsByTagName('body');
        var element1;
        var element1 = body[0];
        element1.style.border = "10px solid #00ffff";
    }
}
