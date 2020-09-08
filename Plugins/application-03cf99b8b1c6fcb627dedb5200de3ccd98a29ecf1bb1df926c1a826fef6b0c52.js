function sliding() {
	for (var e = [], l = 0; l < allSlides.length; ++l) {
		if ("none" != allSlides[l].style.display && l != allSlides.length - 1) {
			e.push(l), e.push(l + 1); break
		}
		if ("none" != allSlides[l].style.display && l == allSlides.length - 1) {
			e.push(l), e.push(0); break
		}
	} return e
}
function slideSwitch() {
	iter = sliding();
	var e = iter[0];
	if (arguments[0] === undefined)
		var l = iter[1];
	else var l = arguments[0];
	inProgress = 1;
	var i = "slider-video-" + l, s = document.getElementById(i);
	s && s.play();
	var a = $(allSlides[e]), t = $(allSlides[l]);
	a.addClass("last-active"),
        t.addClass("active").css({ opacity: 0, display: "block" }).animate({ opacity: 1 }, 1500, function () { }),
        a.css({ opacity: 1 }).animate({ opacity: 0 }, 1e3, function () {
        	a.removeClass("active").removeClass("last-active"),
            $(a).css("display", "none")
        });
	var o = $(allTitles[e]), n = $(allTitles[l]);
	o.addClass("last-active"),
        n.addClass("active").css({ opacity: 0 }).animate({ opacity: 1 }, 1500, function () {
        	n.removeClass("next")
        }),
        o.css({ opacity: 1 }).animate({ opacity: 0 }, 1e3, function () {
        	o.removeClass("active").removeClass("last-active")
        });
	var c = $(allBlocks[e]), d = $(allBlocks[l]);
	c.addClass("last-active"),
        d.addClass("active").css({ opacity: 0 }).animate({ opacity: 1 }, 1500, function () {
        	d.removeClass("next")
        }),
        c.css({ opacity: 1 }).animate({ opacity: 0 }, 1e3, function () {
        	c.removeClass("active").removeClass("last-active"), inProgress = 0
        });
	var r = $(".slide-point-active"); r.prop("disabled", !1).removeClass("slide-point-active"), r = $(allPoints[l]), r.addClass("slide-point-active").prop("disabled", !0)
}
function slideMove(e) {
	0 == inProgress && (slideSwitch(e), clearInterval(sliderLoop), sliderLoop = setInterval(function () {
		slideSwitch()
	}, 4e3))
}
function stopVideo() {
	try {
		var e = "slider-video-" + (iter > 0 ? iter : 0); document.getElementById(e).pause()
	} catch (e) { }
}
function navClick() {
	$("#mobile-nav").toggleClass("mobile-navigation-active"), $("body").toggleClass("locked")
}
var sliderLoop, slideInterval = null, switchTime = 0, allSlides = "", allTitles = "", allBlocks = "", allPoints = "", inProgress = 0;
$(function () {
	allSlides = $("div.slideshow-image"), allTitles = $("div.slideshow-title"), allBlocks = $("div.slideshow-block"), allPoints = $(".slide-changer"); try { document.getElementById("slider-video-0").play() } catch (e) { } sliderLoop = setInterval(function () { slideSwitch() }, 4e3)
});