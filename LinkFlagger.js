// ==UserScript==
// @name        LinkFlagger
// @version     38
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {

    if (document.title == "Login - Brigham Young University - Idaho") {
        //starwarscountdown();
        JediReflexes();
        //hypnotoad();
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
        flagbenlinks(ciframe[0].contentWindow.document.querySelectorAll("a[href*='content.byui.edu']"))
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

    var bs,
        is,
        brs,
        divs,
        bolds,
        spans,
        as,
        empty,
        altimg,
        body;

    function fixIssues() {
        updateVars();
        if (numPosFixes() > 0) {
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" id="fixstuff" style="vertical-align: top;"><strong>BETA:</strong> Fix <span style="color: #ff0000; font-weight: bold;">' + numPosFixes() + '</span> issues</a>');
            document.getElementById("fixstuff").addEventListener("click", function () {
                updateVars();
                cleanCode();
                reportBack();
            });
        } else {
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" style="vertical-align: top;"><strong>BETA: </strong><span style="color: #00cc00; font-weight: bold;">No Fixable Issues Found.</span></a>');
        }

    }

    function cleanCode() {
        $(body).find("b").contents().unwrap().wrap('<strong/>');
        $(body).find("i").contents().unwrap().wrap('<em/>');
        $(body).filter("div:empty[id!='main'][id!='header'][id!='article']").contents().unwrap();
        $(body).filter("div[id!='main'][id!='header'][id!='article']").contents().unwrap().wrap('<p/>');
        $(body).find("span[style*='bold']").contents().unwrap().wrap('<strong/>');
        $(body).find("span:not([style*='font-size'])").contents().unwrap();
        $(body).find("a:not([target='_blank'])").attr("target", "_blank");
        $(body).find("img:not([alt])").attr("alt", "");
        $(body).find("strong:empty, em:empty, a:empty, br").remove();
        $(body).filter("p:empty").contents().unwrap();
    }

    function reportBack() {
        alert("Number of <b>s fixed: " + bs.length
              + "\nNumber of <i>s fixed: " + is.length
              //+ "\nNumber of <div>s replaced: " + divs.length
              + "\nNumber of bolded <span>s replaced: " + bolds.length
              + "\nNumber of <span>s removed: " + spans.length
              + "\nNumber of Bad <a>s targets fixed: " + as.length
              + "\nNumber of empty Elements removed: " + empty.length
              + "\nNumber of alt attributes added to images: " + altimg.length
              + "\n\nWritten By Grant Johnson");

        $("a[id*='fixstuff']").html('<strong style="color: #00cc00;">' + numPosFixes() + " Issues fixed!</strong>");
    }

    function numPosFixes() {
        return bs.length + is.length + bolds.length + spans.length + as.length + empty.length + altimg.length;
    }

    function updateVars() {
        bs = ciframe[0].contentWindow.document.querySelectorAll("b");
        is = ciframe[0].contentWindow.document.querySelectorAll("i");
        brs = ciframe[0].contentWindow.document.querySelectorAll("br");
        body = ciframe[0].contentWindow.document.querySelectorAll("*");
        //divs = ciframe[0].contentWindow.document.querySelectorAll("div[id!='randomCrap']");
        //divs = $
        bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
        spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
        as = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
        empty = ciframe[0].contentWindow.document.querySelectorAll("strong:empty, em:empty, a:empty, br");
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

    function starwarscountdown() {
        var title = document.querySelector("title");
        if (title.innerHTML == "Login - Brigham Young University - Idaho") {
            var target_date = new Date("Dec 17 2015 20:00:00 GMT-0600").getTime();
            var days,
                hours,
                minutes,
                seconds;
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
                countdown.innerHTML = "THE FORCE AWAKENS IN<br />" + days + "D " + hours + "H " + minutes + "M " + seconds + "S";
                countdown.style.fontWeight = "bold";
                countdown.style.color = "#FFE81F";
                countdown.style.textAlign = "center";
                countdown.style.fontSize = "36px";
                countdown.style.textShadow = "0 0 5px #000000";
            }, 1000);
        }
    }

    function JediReflexes() {
        var countdown = document.querySelector("h1[class*='d2l-login-portal-heading']");
        $(countdown).html('<h1 style="font-size: 42px; text-align: center; color: #ff0000">BRIGHTSPACE BE LIKE</h1><br><video class="share-video" id="share-video" poster="https://thumbs.gfycat.com/SinfulPastelGoldenmantledgroundsquirrel-poster.jpg" autoplay="" muted="" loop=""><source id="webmSource" src="https://zippy.gfycat.com/SinfulPastelGoldenmantledgroundsquirrel.webm" type="video/webm"><source id="mp4Source" src="https://zippy.gfycat.com/SinfulPastelGoldenmantledgroundsquirrel.mp4" type="video/mp4"></video>');
    }

    function hypnotoad() {
        var countdown = document.querySelector("h1[class*='d2l-login-portal-heading']");
        countdown.innerHTML = 'ALL GLORY TO THE BRIGHTSPACE<br /><iframe width="830" height="479" src="https://www.youtube.com/embed/t9eIL3bauuw?autoplay=1;autohide=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
        countdown.style.fontWeight = "bold";
        countdown.style.color = "#000000";
        countdown.style.textAlign = "center";
        countdown.style.fontSize = "75px";

    }
});
