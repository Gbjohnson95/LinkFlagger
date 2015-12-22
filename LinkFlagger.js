// ==UserScript==
// @name        LinkFlagger
// @version     43
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {

    if (document.title == "Login - Brigham Young University - Idaho") {
        swspoilers();
    }

    var ciframe = document.querySelectorAll("iframe");
    if (ciframe.length > 0) {
        dctitle = document.querySelector("h1[class*='d2l-page-title']"); // Get the page title.
        if (dctitle.textContent == "Edit HTML File") {
            fixIssues();
        } else if (ciframe[0].getAttribute('class').includes('d2l-iframe')) {
            flagCode();
        }
    }

    var bs,is,brs,divs,bolds,spans,as,empty,altimg,body;

    function fixIssues() {
        updateVars();
        if (numPosFixes() > 0) {
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" id="fixstuff" style="vertical-align: top;"><strong>BETA:</strong> Fix <span style="color: #ff0000; font-weight: bold;">' + numPosFixes() + '</span> issues. <em>Can interfere with formating</em></a>');
            document.getElementById("fixstuff").addEventListener("click", function () {
                updateVars();
                cleanCode();
                reportBack();
            });
        } else {
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" style="vertical-align: top;"><span style="color: #00bb00; font-weight: bold;">No Fixes Found</span></a>');
        }

    }

    function cleanCode() {
        $(body).filter("div:empty[id!='main'][id!='header'][id!='article']").contents().unwrap();
        $(body).filter("div[id!='main'][id!='header'][id!='article']").contents().unwrap().wrap('<p/>');
        $(body).find("img:not([alt])").attr("alt", "");
        $(bs).contents().unwrap().wrap('<strong/>');
        $(is).contents().unwrap().wrap('<em/>');
        $(bolds).contents().unwrap().wrap('<strong/>');
        $(spans).contents().unwrap();
        $(as).attr("target","_blank");
        $(empty).remove();
    }

    function reportBack() {
        alert("Number of <b>s fixed: " + $(bs).length +
              "\nNumber of <i>s fixed: " + $(is).length +
              "\nNumber of bolded <span>s replaced: " + $(bolds).length +
              "\nNumber of <span>s removed: " + $(spans).length +
              "\nNumber of Bad <a>s targets fixed: " + $(as).length +
              "\nNumber of empty Elements removed: " + $(empty).length +
              "\nNumber of <div>s removed: " + $(body).filter("div:empty[id!='main'][id!='header'][id!='article']").length +
              "\nNumber of <div>s replaced: " + $(body).filter("div[id!='main'][id!='header'][id!='article']").length +
              "\n\nWritten By Grant Johnson");

        $("a[id*='fixstuff']").html('<strong style="color: #00cc00;">' + numPosFixes() + " Issues fixed!</strong>");
    }

    function numPosFixes() {
        return $(body).filter("div:empty[id!='main'][id!='header'][id!='article']").length +
            $(body).filter("div[id!='main'][id!='header'][id!='article']").length +
            $(body).find("img:not([alt])").length +
            $(bs).length +
            $(is).length +
            $(bolds).length +
            $(spans).length +
            $(as).length +
            $(empty).length;
    }

    function updateVars() {
        bs = ciframe[0].contentWindow.document.querySelectorAll("b");
        is = ciframe[0].contentWindow.document.querySelectorAll("i");
        brs = ciframe[0].contentWindow.document.querySelectorAll("br");
        body = ciframe[0].contentWindow.document.querySelectorAll("*");
        bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
        spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
        as = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
        empty = ciframe[0].contentWindow.document.querySelectorAll("strong:empty, em:empty, br");
        altimg = ciframe[0].contentWindow.document.querySelectorAll("img:not([alt])");
    }

    function flagCode() {
        body = ciframe[0].contentWindow.document.querySelectorAll("*");

        // Flag the 
        $(body).filter("a[href*='brainhoney.com']").css({"color":"#d9432f", "outline":"3px solid #d9432f", "background":"repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"});
        $(body).filter("a[href*='box.com']").css({"color":"#d9432f", "outline":"3px solid #d9432f", "background":"repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"});
        $(body).filter("a[href*='courses.byui.edu']").css({"color":"#d9432f", "outline":"3px solid #d9432f", "background":"repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"});
        $(body).filter("[style*='bold']").css({"outline":"3px solid #689F38", "background":"repeating-linear-gradient(45deg, #DCEDC8, #DCEDC8 5px, #ffffff 5px, #ffffff 10px)"});
        $(body).filter("a:not([target='_blank'])").css({"border":"3px solid #ffb700", "background":"repeating-linear-gradient(135deg, #FFE0B2, #FFE0B2 5px, #ffffff 5px, #ffffff 10px)"});
        $(body).filter("a:empty").css({"border":"3px solid #0057e7"});
        $(body).filter("img[src*='brainhoney']").css({"border":"5px solid #d9432f"});
        $(body).filter("img:not([alt])").css({"outline":"5px solid #176ced"});

        // Set titles
        seterrortitles($(body).filter("a[href*='brainhoney.com']"), 'This is an iLearn 2.0 link, ');
        seterrortitles($(body).filter("a[href*='box.com']"), 'This a Box link, ');
        seterrortitles($(body).filter("a[href*='courses.byui.edu']"), 'This is a Benjamin link, ');
        seterrortitles($(body).filter("[style*='bold']"), 'Embeded font-weight, ');
        seterrortitles($(body).filter("a:not([target='_blank'])"), 'This link does not open in a new window, ');
        seterrortitles($(body).filter("a:empty"), 'This link has an empty href or text, ');
        seterrortitles($(body).filter("img[src*='brainhoney']"), 'This image is from BrainHoney, ');
        seterrortitles($(body).filter("img:not([alt])"), 'This Image has no alt text, ');

        // Flag filepath and page title
        flagflepath(document.querySelector("div[class*='d2l-fileviewer-text']"), document.querySelector("ol[class*='vui-breadcrumbs']")); // Checks File path
        flagpgtitle(document.querySelector("h1[class*='d2l-page-title']"), ciframe[0].contentWindow.document.querySelector("title")); // Checks the titles*/
    }

    function flagflepath(flepath, pathdiv) {
        if (!flepath.getAttribute('data-location').includes('%20Files')) {
            $(pathdiv).css({"border":"3px solid #d9432f", "background":"repeating-linear-gradient(45deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"});
            seterrortitle(pathdiv, 'The filepath doesn\'t have the words \'Course Files\' or \'Content Files\'.');
        }
    }

    function flagpgtitle(dctitle, httitle) {
        if ($(body).filter("title").length === 0){
            $(dctitle).css({"border":"3px solid #176ced", "background":"repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)"});
            seterrortitle(dctitle, "No Title Found");
        } else if (dctitle.textContent != httitle.textContent) {
            $(dctitle).css({"border":"3px solid #176ced", "background":"repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)"});
            seterrortitle(dctitle, "The HTML title \"" + httitle.textContent + "\" does not match the document title \"" + pagetitle + "\"");
        }
    }

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

    function seterrortitles(elements, titletext){
        var newtitle = '';
        var curtitle = '';
        for (i = 0; i < elements.length; i++) {
            if (elements[i] !== undefined) {
                if (elements[i].title.indexOf('Issues') === 0) {
                    curtitle = '';
                    curtitle = elements[i].getAttribute('title');
                    newtitle = curtitle + titletext;
                } else {
                    newtitle = 'Issues: ' + titletext;
                }
                elements[i].setAttribute('title', newtitle);
            }
        }
    }

    function swspoilers() {
        var countdown = document.querySelector("h1[class*='d2l-login-portal-heading']");
        $(countdown).html('<h1 style="font-size: 24px; text-align: center; color: #ff0000"><span style="font-weight:bold">"WHY DID YOU HAVE TO SPOIL THE FORCE AWAKENS"</span></h1><br><img width="100%" src="http://i.imgur.com/HTeuMZ8.gif">');
    }
});
