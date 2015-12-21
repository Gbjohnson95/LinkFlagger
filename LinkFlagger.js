// ==UserScript==
// @name        LinkFlagger
// @version     41
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

    function flagCode() {
        flagbhlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='brainhoney.com']")); // Flag BrainHoney Links
        flagbenlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='courses.byui.edu']"));
        flagbxlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='box.com'")); // Flag Box Links
        flagatlinks(ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])")); // Flag Links that do not open in new windows
        flagemlinks(ciframe[0].contentWindow.document.querySelectorAll("a:not([href])")); // Flag Links that
        flagemlinks(ciframe[0].contentWindow.document.querySelectorAll("a:empty")); // Flag Empty Links
        flagbhimage(ciframe[0].contentWindow.document.querySelectorAll("img[src*='brainhoney']")); // Flag BrainHoney Images
        flagalimage(ciframe[0].contentWindow.document.querySelectorAll("img:not([alt])")); // Flag Images without alt text
        flagallbold(ciframe[0].contentWindow.document.querySelectorAll("[style*='bold']")); // Flags all bold elements
        flagflepath(document.querySelector("div[class*='d2l-fileviewer-text']"), document.querySelector("ol[class*='vui-breadcrumbs']")); // Checks File path
        flagpgtitle(document.querySelector("h1[class*='d2l-page-title']"), ciframe[0].contentWindow.document.querySelector("title")); // Checks the titles*/
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
        alert("Number of <b>s fixed: " + bs.length +
              "\nNumber of <i>s fixed: " + is.length +
              "\nNumber of bolded <span>s replaced: " + bolds.length +
              "\nNumber of <span>s removed: " + spans.length +
              "\nNumber of Bad <a>s targets fixed: " + as.length +
              "\nNumber of empty Elements removed: " + empty.length +
              "\nNumber of alt attributes added to images: " + altimg.length +
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

    function flagbenlinks(benlinks) {
        var i;
        for (i = 0; i < benlinks.length; i++) {
            benlinks[i].style.color = "#d9432f";
            benlinks[i].style.outline = "3px solid #d9432f";
            benlinks[i].style.background = "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(benlinks[i], 'This is a Benjamin link, ');

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

    // Flag Links with empty attributes
    function flagemlinks(emlinks) {
        var i;
        for (i = 0; i < emlinks.length; i++) {
            emlinks[i].style.border = "3px solid #0057e7";
            seterrortitle(emlinks[i], 'This link has an empty href or text, ');
        }
    }

    // Flag BrainHoney images
    function flagbhimage(bhimage) {
        var i;
        for (i = 0; i < bhimage.length; i++) {
            bhimage[i].style.border = "5px solid #d9432f";
            seterrortitle(bhimage[i], 'This image is from BrainHoney, ');
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
        if (!fpath.includes('%20Files')) {
            pathdiv.style.border = "3px solid #d9432f";
            pathdiv.style.background = "repeating-linear-gradient(45deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)";
            seterrortitle(pathdiv, 'The filepath doesn\'t have the words \'Course Files\' or \'Content Files\'.');
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

    function swspoilers() {
        var countdown = document.querySelector("h1[class*='d2l-login-portal-heading']");
        $(countdown).html('<h1 style="font-size: 48px; text-align: center; color: #ff0000; font-weight: bold;">HEARING STAR WARS SPOILERS LIKE</h1><br><img width="100%" src="http://i.imgur.com/31ti6mB.gif">');
    }
});
