// ==UserScript==
// @name        LinkFlagger
// @version     17
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @run-at document-idle
// ==/UserScript==

var links = document.getElementsByTagName('a');
var element;

// Flags brainhoney links red
for (var i = 0; i < links.length; i++) {
    element = links[i];
    var newtitle = '';

    if (element.href.indexOf("https://byui.brainhoney") === 0) {
        element.style.color = "#d9432f";
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
        element.style.color = "#d9432f";
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
    if (element.target.indexOf("_blank") !== 0 && !element.hasAttribute("class") && element.href.indexOf("javascript") !== 0 && !element.hasAttribute("name") && !element.hasAttribute("id") && !element.hasAttribute('role') && !element.hasAttribute('style'))  {
        element.style.border = "3px solid #ffb700";
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
        images.style.border = "5px solid #d9432f";
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
        images.style.outline = "5px solid #176ced";
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

// If the file path contains the word "Course Files" 
var filediv = document.getElementsByClassName('d2l-fileviewer-text');
var filepath;
var filediv = document.getElementsByClassName('d2l-fileviewer-text');
for (var i = 0; i < filediv.length; i++) {
    element = filediv[i];
    filepath = element.getAttribute('data-location');
    
    if (filepath.indexOf('Course%20Files') > -1) {
        // Don't know how to make that statement inverted in javascript, so else it is for now. 
    } else {
        var body = document.getElementsByClassName('vui-breadcrumbs');
        var element2;
        var element2 = body[0];
        element2.style.border = "3px solid #d9432f";
        element2.setAttribute('title', 'Issues: The filepath doesn\'t have the words \'Course Files\'.' );
    }
}

// If title does not match the page title.  
var iframe = document.getElementsByTagName('iframe')[0];
var doc = iframe.contentWindow.document;
var titles = doc.getElementsByTagName('title');
var doctitles = document.getElementsByClassName("d2l-page-title");
var titleelement = doctitles[0];
var doctitle = titleelement.textContent;
element = titles[0];
var pagetitle = element.textContent;
if (pagetitle !== doctitle) {
    titleelement.style.border = "3px solid #176ced";
    var newtitle = "Issues: The HTML title \"" + pagetitle + "\" does not match the document title \"" + doctitle + "\"";
    titleelement.setAttribute('title', newtitle);
}
