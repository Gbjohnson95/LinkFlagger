// ==UserScript==
// @name        LinkFlagger Campus Edition
// @version     2
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {
    var ciframe = document.getElementsByTagName('iframe');

    var bs,
        is,
        brs,
        divs,
        bolds,
        spans,
        as,
        empty,
        altimg,
        body,
        ps;

    if (ciframe.length === 1) {
        dctitle = document.querySelector("h1[class*='d2l-page-title']");
        if (dctitle.textContent !== "Edit HTML File") {
            flagbhlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='brainhoney']"));
            flagbxlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='box'"));
            flagbhimage(ciframe[0].contentWindow.document.querySelectorAll("img[src*='brainhoney']"));
        } else if (dctitle.textContent == "Edit HTML File") {
            fixIssues();
        }
    }

    function fixIssues() {
        updateVars();
        if (numPosFixes() > 0) {
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" id="fixstuff" style="vertical-align: top;">Fix <span style="color: #ff0000; font-weight: bold;">' + numPosFixes() + '</span> issues <em>Can interfere with formating</em></a>');
            document.getElementById("fixstuff").addEventListener("click", function () {
                updateVars();
                
                $(body).filter("div:empty[id!='main'][id!='header'][id!='article']").contents().unwrap();
                $(body).filter("div[id!='main'][id!='header'][id!='article']").contents().unwrap().wrap('<p/>');
                $(body).find("img:not([alt])").attr("alt", "");

                $(bs).contents().unwrap().wrap('<strong/>');
                $(is).contents().unwrap().wrap('<em/>');
                $(bolds).contents().unwrap().wrap('<strong/>');
                $(spans).contents().unwrap();
                $(as).attr("target","_blank");
                $(empty).remove();

                $("a[id*='fixstuff']").html('<strong style="color: #00cc00;">' + numPosFixes() + " Issues fixed!</strong>");
            });
        } else {
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" style="vertical-align: top;"><strong>BETA: </strong><span style="color: #00cc00; font-weight: bold;">No Fixable Issues Found.</span></a>');
        }

    }

    function numPosFixes() {
        return bs.length + is.length + bolds.length + spans.length + as.length + empty.length + altimg.length;
    }

    function updateVars() {
        bs = ciframe[0].contentWindow.document.querySelectorAll("b");
        is = ciframe[0].contentWindow.document.querySelectorAll("i");
        brs = ciframe[0].contentWindow.document.querySelectorAll("br");
        body = ciframe[0].contentWindow.document.querySelectorAll("*");
        divs = ciframe[0].contentWindow.document.querySelectorAll("div:not([id])");
        bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
        spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
        as = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
        empty = ciframe[0].contentWindow.document.querySelectorAll("strong:empty, em:empty, a:empty, br");
        altimg = ciframe[0].contentWindow.document.querySelectorAll("img:not([alt])");
        ps = ciframe[0].contentWindow.document.querySelectorAll("p:empty")
    }


    function flagbhlinks(bhlinks) {
        var i;
        for (i = 0; i < bhlinks.length; i++) {
            bhlinks[i].style.color = "#d9432f";
            //bhlinks[i].style.outline = "3px solid #d9432f";
            //bhlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            bhlinks[i].innerHTML = "<strong>I-LEARN 2.0 LINK: </strong>" + bhlinks[i].innerHTML;
            seterrortitle(bhlinks[i], 'THIS LINK IS FROM ILEARN 2.0, ILEARN 2.0 IS SHUTTING DOWN');

        }
    }
    function flagbxlinks(bxlinks) {
        var i;
        for (i = 0; i < bxlinks.length; i++) {
            bxlinks[i].style.color = "#d9432f";
            //bxlinks[i].style.outline = "3px solid #d9432f";
            //bxlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
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
