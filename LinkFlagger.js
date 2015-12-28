// ==UserScript==
// @name        LinkFlagger
// @version     44
// @author      Grant Johnson
// @description Highlights brainhoney and box links and images.
// @include     *brightspace.com*
// @require     http://code.jquery.com/jquery-latest.js
// @run-at document-end
// ==/UserScript==
window.addEventListener("load", function () {

	if (document.title == "Login - Brigham Young University - Idaho") {
		swspoilers();
	}

	// Clean or flag
	var ciframe = document.querySelectorAll("iframe");
	if (ciframe.length > 0) {
		dctitle = document.querySelector("h1[class*='d2l-page-title']"); // Get the page title.
		if (dctitle.textContent == "Edit HTML File") {
			fixIssues(); // Fix issues if on edit page
		} else if (ciframe[0].getAttribute('class').includes('d2l-iframe')) {
			flagCode(); // Otherwise flag page
		}
	}

	var bs, is, brs, divs, bolds, spans, as, empty, altimg, body, emdivs, baddiv;

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
		$(emdivs).contents().unwrap();
		$(baddiv).contents().unwrap().wrap('<p/>');
		$(body).find("img:not([alt])").attr("alt", "");
		$(bs).contents().unwrap().wrap('<strong/>');
		$(altimg).attr("alt", "");
		$(is).contents().unwrap().wrap('<em/>');
		$(bolds).contents().unwrap().wrap('<strong/>');
		$(spans).contents().unwrap();
		$(as).attr("target", "_blank");
		$(empty).remove();
	}

	function reportBack() {
		alert("Number of <b>s fixed: " + $(bs).length +
			"\nNumber of <i>s fixed: " + $(is).length +
			"\nNumber of bolded <span>s replaced: " + $(bolds).length +
			"\nNumber of <span>s removed: " + $(spans).length +
			"\nNumber of Bad <a>s targets fixed: " + $(as).length +
			"\nNumber of empty Elements removed: " + $(empty).length +
			"\nNumber of <div>s removed: " + $(emdivs).length +
			"\nNumber of <div>s replaced: " + $(baddiv).length +
			"\n\nWritten By Grant Johnson");
		$("a[id*='fixstuff']").html('<strong style="color: #00cc00;">' + numPosFixes() + " Issues fixed!</strong>");
	}

	function numPosFixes() {
		return $(emdivs).length +
		$(baddiv).length +
		$(altimg).length +
		$(bs).length +
		$(is).length +
		$(bolds).length +
		$(spans).length +
		$(as).length +
		$(empty).length;
	}

	function updateVars() {
		bs     = ciframe[0].contentWindow.document.querySelectorAll("b");
		is     = ciframe[0].contentWindow.document.querySelectorAll("i");
		brs    = ciframe[0].contentWindow.document.querySelectorAll("br");
		body   = ciframe[0].contentWindow.document.querySelectorAll("*");
		bolds  = ciframe[0].contentWindow.document.querySelectorAll("span[style*='bold']");
		spans  = ciframe[0].contentWindow.document.querySelectorAll("span:not([style])");
		as     = ciframe[0].contentWindow.document.querySelectorAll("a:not([target='_blank'])");
		empty  = ciframe[0].contentWindow.document.querySelectorAll("strong:empty, em:empty, br, b:empty");
		altimg = ciframe[0].contentWindow.document.querySelectorAll("img:not([alt])");
		emdivs = $(body).filter("div:empty[id!='main'][id!='header'][id!='article']");
		baddiv = $(body).filter("div[id!='main'][id!='header'][id!='article']");
	}

	function flagCode() {
		body = ciframe[0].contentWindow.document.querySelectorAll("*");

		// Set the vars once
		var bhlink = $(body).filter("a[href*='brainhoney.com']");
		var boxlink = $(body).filter("a[href*='box.com']");
		var benlink = $(body).filter("a[href*='courses.byui.edu']");
		var bolds = $(body).filter("[style*='bold']");
		var badtar = $(body).filter("a:not([target='_blank'])");
		var alimage = $(body).filter("img:not([alt])");
		var bhimage = $(body).filter("img[src*='brainhoney']");
		var emlink = $(body).filter("a:empty");

		// Flag the content
		$(bhlink).css({
			"color"      : "#d9432f",
			"outline"    : "3px solid #d9432f",
			"background" : "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"
		});
		$(boxlink).css({
			"color"      : "#d9432f",
			"outline"    : "3px solid #d9432f",
			"background" : "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"
		});
		$(benlink).css({
			"color"      : "#d9432f",
			"outline"    : "3px solid #d9432f",
			"background" : "repeating-linear-gradient(135deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"
		});
		$(bolds).css({
			"outline"    : "3px solid #689F38",
			"background" : "repeating-linear-gradient( 45deg, #DCEDC8, #DCEDC8 5px, #ffffff 5px, #ffffff 10px)"
		});
		$(badtar).css({
			"border"     : "3px solid #ffb700",
			"background" : "repeating-linear-gradient(135deg, #FFE0B2, #FFE0B2 5px, #ffffff 5px, #ffffff 10px)"
		});
		$(emlink).css({
			"border"    : "3px solid #0057e7"
		});
		$(bhimage).css({
			"border"    : "5px solid #d9432f"
		});
		$(alimage).css({
			"outline"   : " 5px solid #176ced"
		});

		// Set titles
		seterrortitles(bhlink  , 'This is an iLearn 2.0 link, ');
		seterrortitles(boxlink , 'This a Box link, ');
		seterrortitles(benlink , 'This is a Benjamin link, ');
		seterrortitles(bolds   , 'Embeded font-weight, ');
		seterrortitles(badtar  , 'This link does not open in a new window, ');
		seterrortitles(emlink  , 'This link has an empty href or text, ');
		seterrortitles(bhimage , 'This image is from BrainHoney, ');
		seterrortitles(alimage , 'This Image has no alt text, ');

		// Flag filepath and page title
		flagflepath(document.querySelector("div[class*='d2l-fileviewer-text']"), document.querySelector("ol[class*='vui-breadcrumbs']")); // Checks File path
		flagpgtitle(document.querySelector("h1[class*='d2l-page-title']"), ciframe[0].contentWindow.document.querySelector("title")); // Checks the titles*/
	}

	function flagflepath(flepath, pathdiv) {
		if (!flepath.getAttribute('data-location').includes('%20Files')) {
			$(pathdiv).css({
				"border"     : "3px solid #d9432f",
				"background" : "repeating-linear-gradient(45deg, #ffcdd2, #ffcdd2 5px, #ffffff 5px, #ffffff 10px)"
			});
			$(pathdiv).attr("title", "Error: The filepath doesn\'t have the words \'Course Files\' or \'Content Files\'.");
		}
	}

	function flagpgtitle(dctitle, httitle) {
		if ($(body).filter("title").length === 0) {
			$(dctitle).css({
				"border"     : "3px solid #176ced",
				"background" : "repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)"
			});
			$(dctitle).attr("title", "Error: No Title Found");
		} else if (dctitle.textContent != httitle.textContent) {
			$(dctitle).css({
				"border"     : "3px solid #176ced",
				"background" : "repeating-linear-gradient(135deg, #BBDEFB, #BBDEFB 5px, #ffffff 5px, #ffffff 10px)"
			});
			$(dctitle).attr("title", "Error: The HTML title \"" + httitle.textContent + "\" does not match the document title \"" + dctitle.textContent + "\"");
		}
	}

	function seterrortitles(elements, titletext) {
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
		$(document.querySelector("h1[class*='d2l-login-portal-heading']")).html('<h1 style="font-size: 24px; text-align: center; color: #ff0000"><span style="font-weight:bold">"WHY DID YOU HAVE TO SPOIL THE FORCE AWAKENS"</span></h1><br><img width="100%" src="http://i.imgur.com/HTeuMZ8.gif">');
	}
});
