// ==UserScript==
// @name        LinkFlagger Campus Edition
// @version     1
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {
    var ciframe = document.getElementsByTagName('iframe');
    if (ciframe.length === 1) {
        dctitle = document.querySelector("h1[class*='d2l-page-title']");
        if (dctitle.textContent !== "Edit HTML File") {
            flagbhlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='brainhoney']"));
            flagbxlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='box'"));
            flagbhimage(ciframe[0].contentWindow.document.querySelectorAll("img[src*='brainhoney']"));
        }
    }
    function flagbhlinks(bhlinks) {
        var i;
        for (i = 0; i < bhlinks.length; i++) {
            bhlinks[i].style.color = "#d9432f";
            bhlinks[i].style.outline = "3px solid #d9432f";
            bhlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            bhlinks[i].innerHTML = "<strong>I-LEARN 2.0 LINK: </strong>" + bhlinks[i].innerHTML;
            seterrortitle(bhlinks[i], 'THIS LINK IS FROM ILEARN 2.0, ILEARN 2.0 IS SHUTTING DOWN');

        }
    }
    function flagbxlinks(bxlinks) {
        var i;
        for (i = 0; i < bxlinks.length; i++) {
            bxlinks[i].style.color = "#d9432f";
            bxlinks[i].style.outline = "3px solid #d9432f";
            bxlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            bxlinks[i].innerHTML = "<strong>BOX LINK: </strong>" + bxlinks[i].innerHTML;
            seterrortitle(bxlinks[i], 'THIS IS A BOX LINK, BOX IS SHUTTING DOWN!');
        }
    }
    function flagbhimage(bhimage) {
        var i;
        for (i = 0; i < bhimage.length; i++) {
            bhimage[i].style.border = "5px solid #d9432f";
            seterrortitle(bhimage[i], 'THIS IMAGE IS FROM ILEARN 2.0, ILEARN 2.0 IS SHUTTING DOWN!');
        }
    }
    function seterrortitle(element, titletext) {
        var newtitle = '';
        var curtitle = '';
        if (element !== undefined) {
            if (element.title.indexOf('ERROR') === 0) {
                curtitle = '';
                curtitle = element.getAttribute('title');
                newtitle = curtitle + titletext;
            } else {
                newtitle = 'ERROR: ' + titletext;
            }
            element.setAttribute('title', newtitle);
        }
    }
});
