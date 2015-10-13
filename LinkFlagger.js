// ==UserScript==
// @name        LinkFlagger
// @version     24
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @run-at document-end
// ==/UserScript==
// START Links =======================================================================
var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i = i + 1) {
    var element = links[i];
    var curtitle;
    var newtitle;
    // START Flags Links That Dont Open In New Windows -------------------------------
    if (element.target.indexOf("_blank") !== 0 && !element.hasAttribute("class") && element.href.indexOf("javascript") !== 0 && !element.hasAttribute("name") && !element.hasAttribute("id") && !element.hasAttribute('role') && !element.hasAttribute('style')) {
        element.style.border = "3px solid #ffb700";
        element.style.background = "repeating-linear-gradient(135deg, #FFE0B2, #FFE0B2 5px, #ffffff 5px, #ffffff 10px)";
        element.style.fontWeight = "bold";
        newtitle = '';
        if (element.title.indexOf('Issues') === 0) {
            curtitle = '';
            curtitle = element.getAttribute('title');
            newtitle = curtitle + 'This link does not open in a new window, ';
        } else {
            newtitle = 'Issues: This link does not open in a new window, ';
        }
        element.setAttribute('title', newtitle);
    }
    // END Flags Links That Dont Open In New Windows ---------------------------------
    // START Flags BrainHoney Links --------------------------------------------------
    if (element.href.indexOf("https://byui.brainhoney") === 0) {
        element.style.color = "#d9432f";
        element.style.outline = "3px solid #d9432f";
        element.style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
        element.style.fontWeight = "bold";
        var newtitle = '';
        if (element.title.indexOf('Issues') === 0) {
            curtitle = '';
            curtitle = element.getAttribute('title');
            newtitle = curtitle + 'This is an iLearn 2.0 link, ';
        } else {
            newtitle = 'Issues: This is an iLearn 2.0 link, ';
        }
        element.setAttribute('title', newtitle);
    }
    // END Flags BrainHoney Links ----------------------------------------------------
    // START Flags Box Links ---------------------------------------------------------
    if (element.href.indexOf("https://app.box") === 0) {
        element.style.color = "#d9432f";
        element.style.outline = "3px solid #d9432f";
        element.style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
        element.style.fontWeight = "bold";
        newtitle = '';
        if (element.title.indexOf('Issues') === 0) {
            curtitle = '';
            curtitle = element.getAttribute('title');
            newtitle = curtitle + 'This a Box link, ';
        } else {
            newtitle = 'Issues: This a Box link, ';
        }
        element.setAttribute('title', newtitle);
    }
    // END Flags Box Links -----------------------------------------------------------
}
// END Links =========================================================================
// START Images ======================================================================
var linksimg = document.getElementsByTagName('img');
for (i = 0; i < linksimg.length; i = i + 1) {
    var images = linksimg[i];
    newtitle = '';
    var curtitle;

    // START Flags BrainHoney Images -------------------------------------------------
    if (images.src.indexOf("https://byui.brainhoney") === 0) {
        images.style.border = "5px solid #d9432f";
        if (images.title.indexOf('Issues') === 0) {
            curtitle = '';
            curtitle = images.getAttribute('title');
            newtitle = curtitle + 'This Image is hosted by iLearn 2.0, ';
        } else {
            newtitle = 'Issues: This Image is hosted by iLearn 2.0, ';
        }
        images.setAttribute('title', newtitle);
    }
    // END Flags BrainHoney Images ---------------------------------------------------
    // START Flags Images Without Alt Attribute --------------------------------------
    if (!images.hasAttribute("alt") && !images.hasAttribute("class")) {
        images.style.outline = "5px solid #176ced";
        if (images.title.indexOf('Issues') === 0) {
            curtitle = '';
            curtitle = images.getAttribute('title');
            newtitle = curtitle + 'This Image has no alt text, ';
        } else {
            newtitle = 'Issues: This Image has no alt text, ';
        }
        images.setAttribute('title', newtitle);
    }
    // END Flags Images Without Alt Attribute ----------------------------------------
}
// END Images ========================================================================
// START File Path Checker ===========================================================
var filediv = document.getElementsByClassName('d2l-fileviewer-text');
var filepath;
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
        element2.style.background = "repeating-linear-gradient(45deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
        element2.setAttribute('title', 'Issues: The filepath doesn\'t have the words \'Course Files\'.');
    }
}
// END File Path Checker =============================================================
// START Title Checker ===============================================================
window.onload = function() {
    var iframes = document.getElementsByTagName('iframe');
    for (i = 0; i < iframes.length; i = i + 1) {
        iframe = iframes[i];
        var newtitle;
        element = iframe.contentWindow.document.getElementsByTagName('title')[0];
        var pagetitle = element.textContent;
        var titleelement = document.getElementsByClassName("d2l-page-title")[0];
        var doctitle = titleelement.textContent;
        if (pagetitle != doctitle) {
            titleelement.style.border = "3px solid #176ced";
            titleelement.style.background = "repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)";
            newtitle = "Issues: The HTML title \"" + pagetitle + "\" does not match the document title \"" + doctitle + "\"";
            titleelement.setAttribute('title', newtitle);
        }
        var spans = iframe.contentWindow.document.getElementsByTagName('span');
        var span;
        var curtitle1;
        for (var h = 0; h < spans.length; h = h + 1) {
            span = spans[h];
            if (span.style.fontWeight == 'bold') {
                span.style.outline = "3px solid #689F38";
                span.style.background = "repeating-linear-gradient(45deg, #DCEDC8, #DCEDC8 5px, #ffffff 5px, #ffffff 10px)";
                newtitle = '';
                if (span.title.indexOf('Issues') === 0) {
                    curtitle1 = '';
                    curtitle1 = span.getAttribute('title');
                    newtitle = curtitle1 + 'Embeded font-weight, ';
                } else {
                    newtitle = 'Issues: Embeded font-weight, ';
                }
                span.setAttribute('title', newtitle);
            }
        }
        var ps = iframe.contentWindow.document.getElementsByTagName('p');
        var p;
        for (h = 0; h < spans.length; h = h + 1) {
            p = ps[h];
            if (p.style.fontWeight == 'bold') {
                p.style.outline = "3px solid #689F38";
                p.style.background = "repeating-linear-gradient(45deg, #DCEDC8, #DCEDC8 5px, #ffffff 5px, #ffffff 10px)";
                newtitle = '';
                if (p.title.indexOf('Issues') === 0) {
                    curtitle1 = '';
                    curtitle1 = p.getAttribute('title');
                    newtitle = curtitle1 + 'Embeded font-weight, ';
                } else {
                    newtitle = 'Issues: Embeded font-weight, ';
                }
                p.setAttribute('title', newtitle);
            }
        }
    }
};
// END Title Checker =================================================================
