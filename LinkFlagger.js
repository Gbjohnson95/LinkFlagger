// ==UserScript==
// @name        LinkFlagger
// @version     15
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
    var newtitle = '';

    if (element.href.indexOf("https://byui.brainhoney") === 0) {
        element.style.color = "#ff0000";
        if (element.title.indexOf('Issues') === 0) {
            var curtitle = '';
            curtitle = element.getAttribute('title');
            newtitle = curtitle + 'This is an iLearn 2.0 link, ';
        } else {
            newtitle = 'Issues: This is an iLearn 2.0 link, ';
        }
        element.setAttribute('title', newtitle);
    }
}

// Flags box links red
for (var i = 0; i < links.length; i++) {
    element = links[i];
    var newtitle = '';
    if (element.href.indexOf("https://app.box") === 0) {
        element.style.color = "#ff0000";
        if (element.title.indexOf('Issues') === 0) {
            var curtitle = '';
            curtitle = element.getAttribute('title');
            newtitle = curtitle + 'This a Box link, ';
        } else {
            newtitle = 'Issues: This a Box link, ';
        }
        element.setAttribute('title', newtitle);
    }
}

// Flags links that don't open in new window
for (var i = 0; i < links.length; i++) {
    element = links[i];
    var newtitle = '';
    if (element.target.indexOf("_blank") !== 0 && !element.hasAttribute("class") && element.href.indexOf("javascript") !== 0 && !element.hasAttribute("name") && !element.hasAttribute("id") && !element.hasAttribute('role'))  {
        element.style.border = "3px dotted #ffaa00";
        if (element.title.indexOf('Issues') === 0) {
            var curtitle = '';
            curtitle = element.getAttribute('title');
            newtitle = curtitle + 'This link does not open in a new window, ';
        } else {
            newtitle = 'Issues: This link does not open in a new window, ';
        }
        element.setAttribute('title', newtitle);
    }
}

var linksimg = document.getElementsByTagName('img');
var images;

// Flags images from brainhoney with red border
for (var i = 0; i < linksimg.length; i++) {
    images = linksimg[i];
    var newtitle = '';
    if (images.src.indexOf("https://byui.brainhoney") === 0) {
        images.style.border = "5px solid #ff0000";
        if (images.title.indexOf('Issues') === 0) {
            var curtitle = '';
            curtitle = images.getAttribute('title');
            newtitle = curtitle + 'This Image is hosted by iLearn 2.0, ';
        } else {
            newtitle = 'Issues: This Image is hosted by iLearn 2.0, ';
        }
        images.setAttribute('title', newtitle);
    }
}

// Flags images without alt with a blue border. 
for (var i = 0; i < linksimg.length; i++) {
    images = linksimg[i];
    var newtitle = '';
    if (!images.hasAttribute("alt") && !images.hasAttribute("class") ) {
        images.style.outline = "5px solid #0000ff";
        if (images.title.indexOf('Issues') === 0) {
            var curtitle = '';
            curtitle = images.getAttribute('title');
            newtitle = curtitle + 'This Image has no alt text, ';
        } else {
            newtitle = 'Issues: This Image has no alt text, ';
        }
        images.setAttribute('title', newtitle);
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
