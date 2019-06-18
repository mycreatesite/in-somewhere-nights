//objectfit
objectFitImages();

//youtube defer
function youtube_defer() {
	var iframeList = document.querySelectorAll('.youtube');
	var iframes = Array.prototype.slice.call(iframeList, 0);
	iframes.forEach(function (iframe) {
		if (iframe.getAttribute('data-src')) {
			iframe.setAttribute('src', iframe.getAttribute('data-src'));
		}
	});
}
window.addEventListener('load', youtube_defer);


//loading & mvIsActive
$(function () {
	var loading = $("#loading");
	var loadingImg = $('#loading_img');
	var mainVisual = $('#mainVisual');
	var mvHead = $('#mvHead');
	var txt = $('.txt');
	var isHidden = function () {
		loading.addClass('is-active');
		loadingImg.fadeOut(1000);
		setTimeout(function () {
			loading.hide();
			mainVisual.addClass('is-active');
			txt.on('animationend', function () {
				mvHead.textyle({
					duration: 700,
					delay: 0,
					easing: 'linear',
					callback: null
				});
			});
		}, 1000);
	};
	setTimeout(isHidden, 3000);
});


//parallax
$(function () {
	var parallax = $('.parallax');
	var mvParallax = $('.mvParallax');
	$(window).on('scroll', function () {
		var scroll = $(this).scrollTop();
		if (scroll > 1600) {
			return false;
		} else {
			mvParallax.css({
				'transform': 'translate(' + scroll / 40 + 'px' + ',' + scroll / 40 + 'px)',
				'width': 100 + scroll / 150 + '%',
				'height': 100 + scroll / 150 + '%',
			});
			parallax.each(function () {
				var paraSpeed = $(this).attr('data-paraSpeed');
				$(this).css('transform', 'translateY(' + scroll / paraSpeed + 'px)');
			});
		}
	});
});


//spNavHeader
$(function () {
	var hamb = $('#hamb');
	var spNav = $('#spNav');
	var spNavLink = $('#spNav li a');
	var section = $('section');
	hamb.add(spNavLink).on('click', function () {
		spNav.toggleClass('is-show');
		hamb.toggleClass('is-show');
	});
	section.on('click', function () {
		if (hamb.hasClass('is-show')) {
			spNav.toggleClass('is-show');
			hamb.toggleClass('is-show');
		}
	});
});


//smoothScroll
$(function () {
	var headerLink = $('#header a[href^="#"]');
	headerLink.on('click', function () {
		var href = $(this).attr('href');
		var target = $(href == '#' || href === "" ? 'html' : href);
		var position = target.offset().top;
		$('html,body').animate({ scrollTop: position - 50 }, 600, 'swing');
		return false;
	});
});


//scrollEvents
$(window).on('scroll load', _.throttle(function () {
	//common_variables
	var windowHeight = $(this).height();
	var scroll = $(this).scrollTop();
	//contents-events
	var starters = $('.starter');
	starters.each(function () {
		var stPoint = $(this).offset().top;
		var delay = $(this).attr('data-delay');
		var diff = 0;
		if (scroll > stPoint - windowHeight + diff) {
			$(this).css('transition-delay', delay + 'ms').addClass('is-active');
		}
	});
}, 200));