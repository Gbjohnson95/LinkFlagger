// ==UserScript==
// @name        LinkFlagger
// @version     40
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @exclude     *brainhoney.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {

    if (document.title == "Login - Brigham Young University - Idaho") {
        starwarscountdown();
        //JediReflexes();
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

    var bs, is, brs, divs, bolds, spans, as, empty, altimg, body;

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
            $("div[class*='d2l-left d2l-inline']").after('<a type="button" roll="button" class="d2l-button vui-button" id="fixstuff" style="vertical-align: top;">Fix <span style="color: #ff0000; font-weight: bold;">' + numPosFixes() + '</span> issues <em>Can interfere with formating</em></a>');
        }

    }

    function cleanCode() {
        $(body).filter("div:empty[id!='main'][id!='header'][id!='article']").contents().unwrap();
        $(body).filter("div[id!='main'][id!='header'][id!='article']").contents().unwrap().wrap('<p/>');
        $(body).find("img:not([alt])").attr("alt", "");
        $(bs).contents().unwrap().wrap('<strong/>').length;
        $(is).contents().unwrap().wrap('<em/>').length;
        $(bolds).contents().unwrap().wrap('<strong/>');
        $(spans).contents().unwrap();
        $(as).attr("target","_blank");
        $(empty).remove();
    }

    function reportBack() {
        alert("Number of <b>s fixed: " + bs.length
              + "\nNumber of <i>s fixed: " + is.length
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
        bolds = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
        spans = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
        as = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
        empty = ciframe[0].contentWindow.document.querySelectorAll("strong:empty, em:empty, a:empty, br");
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
        if ($(body).filter("title").length == 0){
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

    function starwarscountdown() {
        var target_date = new Date("Dec 17 2015 20:00:00 GMT-0600").getTime();
        var days,
            hours,
            minutes,
            seconds;
        var countdown = document.querySelector("h1[class*='d2l-login-portal-heading']");
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
        hours = parseInt(seconds_left / 3600);
        seconds_left = seconds_left % 3600;
        minutes = parseInt(seconds_left / 60);
        seconds = parseInt(seconds_left % 60);
        $(countdown).html("THE FORCE AWAKENS IN<br />" + days + "D " + hours + "H " + minutes + "M " + seconds + "S");
        $(countdown).css({"font-weight":"bold", "color":"#FFE81F", "font-size":"72px", "text-align":"center", "text-shadow":"0 0 5px #000000"});

        setInterval(function () {
            var current_date = new Date().getTime();
            var seconds_left = (target_date - current_date) / 1000;
            days = parseInt(seconds_left / 86400);
            seconds_left = seconds_left % 86400;
            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;
            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);
            $(countdown).html("THE FORCE AWAKENS IN<br />" + days + "D " + hours + "H " + minutes + "M " + seconds + "S");
            $(countdown).css({"font-weight":"bold", "color":"#FFE81F", "font-size":"72px", "text-align":"center", "text-shadow":"0 0 5px #000000"});
        }, 1000);
    }

    function JediReflexes() {
        $("h1[class*='d2l-login-portal-heading']").html('<h1 style="font-size: 42px; text-align: center; color: #ff0000">BRIGHTSPACE BE LIKE</h1><br><video class="share-video" id="share-video" poster="https://thumbs.gfycat.com/SinfulPastelGoldenmantledgroundsquirrel-poster.jpg" autoplay="" muted="" loop=""><source id="webmSource" src="https://zippy.gfycat.com/SinfulPastelGoldenmantledgroundsquirrel.webm" type="video/webm"><source id="mp4Source" src="https://zippy.gfycat.com/SinfulPastelGoldenmantledgroundsquirrel.mp4" type="video/mp4"></video>');
    }

    function hypnotoad() {
        $("h1[class*='d2l-login-portal-heading']").html('ALL GLORY TO THE BRIGHTSPACE<br /><iframe width="830" height="479" src="https://www.youtube.com/embed/t9eIL3bauuw?autoplay=1;autohide=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>');
        $("h1[class*='d2l-login-portal-heading']").css({"font-weight":"bold", "color":"#000000", "font-size":"75px", "text-align":"center"});
    }
});
