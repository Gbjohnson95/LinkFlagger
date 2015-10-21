// ==UserScript==
// @name        LinkFlagger (v2)
// @version     24
// @author      Grant Johnson
// @description Flags common mistakes
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {

    var ciframe = document.getElementsByTagName('iframe');

    var bhlinks, bxlinks, atlinks, bhimage, alimage, httitle, flepath, dctitle, allbold, pathdiv;

    if (ciframe.length == 1) { // When the frame with the frame with the iframe loads
        bhlinks = ciframe[0].contentWindow.document.querySelectorAll("a[href*='brainhoney']"); // BrainHoney Links
        bxlinks = ciframe[0].contentWindow.document.querySelectorAll("a[href*='box'"); // Box Links
        atlinks = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])"); // Links that do not open in new windows
        bhimage = ciframe[0].contentWindow.document.querySelectorAll("img[src*='brainhoney']"); // BrainHoney Images
        alimage = ciframe[0].contentWindow.document.querySelectorAll("img:not([alt])"); // Images without alt text
        flepath = document.querySelector("div[class*='d2l-fileviewer-text']"); // Gets File path
        pathdiv = document.querySelector("ol[class*='vui-breadcrumbs']");
        httitle = ciframe[0].contentWindow.document.querySelector("title"); // Gets the title out of the doc
        dctitle = document.querySelector("h1[class*='d2l-page-title']"); // Gets the D2l page title
        allbold = ciframe[0].contentWindow.document.querySelectorAll("[style*='bold']"); // Gets all bold elements

        flagbhlinks(); // Flags BrainHoney Links
        flagbxlinks(); // Flags Box Links
        flagatlinks(); // Flags Links that dont open in new windows
        flagbhimage(); // Flags BrainHoney Images
        flagalimage(); // Flags Images withough Alt tags
        flagflepath(); // Flags Incorrect File Paths
        flagtitle();   // Flags Incorrect Titles
        flagbold();    // Flags Embeded Font-weight
    }

    // Flag BrainHoney links
    function flagbhlinks() {
        var i;
        for (i = 0; i < bhlinks.length; i++) {
            bhlinks[i].style.color = "#d9432f";
            bhlinks[i].style.outline = "3px solid #d9432f";
            bhlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(bhlinks[i], 'This is an iLearn 2.0 link, ');

        }
    }

    // Flag Box links
    function flagbxlinks() {
        var i;
        for (i = 0; i < bxlinks.length; i++) {
            bxlinks[i].style.color = "#d9432f";
            bxlinks[i].style.outline = "3px solid #d9432f";
            seterrortitle(bxlinks[i], 'This a Box link, ');
        }
    }

    // Flag links that don't open in new windows
    function flagatlinks() {
        var i;
        for (i = 0; i < atlinks.length; i++) {
            atlinks[i].style.border = "3px solid #ffb700";
            atlinks[i].style.background = "repeating-linear-gradient(135deg, #FFE0B2, #FFE0B2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(bxlinks[i], 'This link does not open in a new window, ');
        }
    }

    // Flag BrainHoney images
    function flagbhimage() {
        var i;
        for (i = 0; i < bhimage.length; i++) {
            bhimage[i].style.border = "5px solid #d9432f";
            seterrortitle(bhimage[i], 'This link does not open in a new window, ');
        }
    }

    // Flag images without any alt attribute
    function flagalimage() {
        var i;
        for (i = 0; i < alimage.length; i++) {
            alimage[i].style.outline = "5px solid #176ced";
            seterrortitle(alimage[i], 'This Image has no alt text, ');
        }
    }

    // Check the filepath
    function flagflepath() {
        var fpath = flepath.getAttribute('data-location');
        if (fpath.indexOf('Course%20Files') > -1) {

        } else {
            pathdiv.style.border = "3px solid #d9432f";
            pathdiv.style.background = "repeating-linear-gradient(45deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(pathdiv, 'The filepath doesn\'t have the words \'Course Files\'.');
        }
    }

    // Check the titles
    function flagtitle() {
        var pagetitle = dctitle.textContent;
        var htmltitle = httitle.textContent;
        if (pagetitle != htmltitle) {
            dctitle.style.border = "3px solid #176ced";
            dctitle.style.background = "repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(dctitle, "The HTML title \"" + htmltitle + "\" does not match the document title \"" + pagetitle + "\"");
        }
    }

    // Flag all bolds
    function flagbold() {
        var i;
        for (i = 0; i < allbold.length; i++) {
            allbold[i].style.outline = "3px solid #689F38";
            allbold[i].style.background = "repeating-linear-gradient(45deg, #DCEDC8, #DCEDC8 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(allbold[i], 'Embeded font-weight, ');
        }
    }

    // Change titles
    function seterrortitle(element, titletext) {
        var newtitle = '';
        var curtitle = '';
        if (element != undefined) {
            if (element.title.indexOf('Issues') === 0) {
                curtitle = '';
                curtitle = element.getAttribute('title');
                newtitle = curtitle + titletext;
            } else {
                newtitle = 'Issues: ' + titletext;
            }
            element.setAttribute('title', newtitle);
        }
    }
});
