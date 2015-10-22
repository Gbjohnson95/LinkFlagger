// ==UserScript==
// @name        LinkFlagger (v2)
// @version     25
// @author      Grant Johnson
// @description Flags common mistakes
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {

    var ciframe = document.getElementsByTagName('iframe');

    if (document.querySelector("title").innerHTML == "Login - Brigham Young University - Idaho") {
           starwarscountdown();
    }
    
    if (ciframe.length == 1) { // When the frame with the frame with the iframe loads
        dctitle = document.querySelector("h1[class*='d2l-page-title']"); // Get the page title.
        if (dctitle.textContent != "Edit HTML File") { // If the page is editable, dont run.
            flagbhlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='brainhoney']"));                                         // Flag BrainHoney Links
            flagbxlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='box'"));                                                 // Flag Box Links
            flagatlinks(ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])"));                                      // Flag Links that do not open in new windows
            flagbhimage(ciframe[0].contentWindow.document.querySelectorAll("img[src*='brainhoney']"));                                        // Flag BrainHoney Images
            flagalimage(ciframe[0].contentWindow.document.querySelectorAll("img:not([alt])"));                                                // Flag Images without alt text
            flagflepath(document.querySelector("div[class*='d2l-fileviewer-text']"), document.querySelector("ol[class*='vui-breadcrumbs']")); // Checks File path
            flagpgtitle(document.querySelector("h1[class*='d2l-page-title']"), ciframe[0].contentWindow.document.querySelector("title"));     // Checks the titles
            flagallbold(ciframe[0].contentWindow.document.querySelectorAll("[style*='bold']"));                                               // Flags all bold elements
        }
    }

    // Flag BrainHoney links
    function flagbhlinks(bhlinks) {
        var i;
        for (i = 0; i < bhlinks.length; i++) {
            bhlinks[i].style.color = "#d9432f";
            bhlinks[i].style.outline = "3px solid #d9432f";
            bhlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(bhlinks[i], 'This is an iLearn 2.0 link, ');

        }
    }

    // Flag Box links
    function flagbxlinks(bxlinks) {
        var i;
        for (i = 0; i < bxlinks.length; i++) {
            bxlinks[i].style.color = "#d9432f";
            bxlinks[i].style.outline = "3px solid #d9432f";
            seterrortitle(bxlinks[i], 'This a Box link, ');
        }
    }

    // Flag links that don't open in new windows
    function flagatlinks(atlinks) {
        var i;
        for (i = 0; i < atlinks.length; i++) {
            atlinks[i].style.border = "3px solid #ffb700";
            atlinks[i].style.background = "repeating-linear-gradient(135deg, #FFE0B2, #FFE0B2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(atlinks[i], 'This link does not open in a new window, ');
        }
    }

    // Flag BrainHoney images
    function flagbhimage(bhimage) {
        var i;
        for (i = 0; i < bhimage.length; i++) {
            bhimage[i].style.border = "5px solid #d9432f";
            seterrortitle(bhimage[i], 'This link does not open in a new window, ');
        }
    }

    // Flag images without any alt attribute
    function flagalimage(alimage) {
        var i;
        for (i = 0; i < alimage.length; i++) {
            alimage[i].style.outline = "5px solid #176ced";
            seterrortitle(alimage[i], 'This Image has no alt text, ');
        }
    }

    // Check the filepath
    function flagflepath(flepath, pathdiv) {
        var fpath = flepath.getAttribute('data-location');
        if (fpath.indexOf('Course%20Files') > -1) {

        } else {
            pathdiv.style.border = "3px solid #d9432f";
            pathdiv.style.background = "repeating-linear-gradient(45deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(pathdiv, 'The filepath doesn\'t have the words \'Course Files\'.');
        }
    }

    // Check the titles
    function flagpgtitle(dctitle, httitle) {
        var pagetitle = dctitle.textContent;
        var htmltitle = httitle.textContent;
        if (pagetitle != htmltitle) {
            dctitle.style.border = "3px solid #176ced";
            dctitle.style.background = "repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(dctitle, "The HTML title \"" + htmltitle + "\" does not match the document title \"" + pagetitle + "\"");
        }
    }

    // Flag all bolds
    function flagallbold(allbold) {
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
        if (element !== undefined) {
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

    function starwarscountdown() {
        var title = document.querySelector("title");
        if (title.innerHTML == "Login - Brigham Young University - Idaho") {
            var target_date = new Date("Dec 17 2015 20:00:00 GMT-0600").getTime();
            var days, hours, minutes, seconds;
            var countdown = document.querySelector("h1[class*='d2l-login-portal-heading']");
            setInterval(function () {
                var current_date = new Date().getTime();
                var seconds_left = (target_date - current_date) / 1000;
                days = parseInt(seconds_left / 86400);
                seconds_left = seconds_left % 86400;
                hours = parseInt(seconds_left / 3600);
                seconds_left = seconds_left % 3600;
                minutes = parseInt(seconds_left / 60);
                seconds = parseInt(seconds_left % 60);
                countdown.innerHTML = "THE FORCE AWAKENS IN - " + days + "d, " + hours + "h, " + minutes + "m, " + seconds + "s";
            }, 1000);
        }
    }
});
