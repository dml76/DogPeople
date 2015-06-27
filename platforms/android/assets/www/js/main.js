$(document).ready(function() {
	
/* PREVENT VERTICAL SCROLLING SYSTEM SETTING */
$(document).bind("touchmove", function(e){
    e.preventDefault();
});
$('.reviews').on('touchmove', function (e) {
     e.stopPropagation();
});

/* FIND VIEWPORT HEIGHT IN PIXELS FOR ANDROID DEVICES */
getMapHeight();

function getMapHeight() {
	var mapHeight = (window.innerHeight + 'px');
	$('.container').css('height', mapHeight);
	//alert(mapHeight);
} 

// Listen for resize changes
window.addEventListener("resize", function() {
	getMapHeight();
}, false);
	
$('.reviews, .reviews-overlay, .reviews-close, .nearby-search, .rate-app').hide();
	
	/* ADJUST HEADER HEIGHT FOR STATUS BARS */
	if ((navigator.platform.indexOf("iPhone")  != -1) || (navigator.platform.indexOf("iPad")  != -1)) {
		$('header').css('height', '74px');
		$('header').css('padding', '35px 15px 15px');
		$('#menu ul li:first-of-type a').css('height', '59px');
		$('#menu ul li:first-of-type a').css('padding', '32px 15px 8px');
		$('.reviews-close').css('top', '35px');
		$('#site-wrapper').css('padding-top', '0');
		$('.container').css('top', '-74px');
		$('.reviews').css('padding', '74px 5% 5% 5%');
	} else {
	    $('header').css('height', '54px');
	    $('header').css('padding', '15px');
	    $('#menu ul li:first-of-type a').css('height', '39px');
		$('#menu ul li:first-of-type a').css('padding', '12px 15px 8px');
		$('.reviews-close').css('top', '15px');
		$('#site-wrapper').css('padding-top', '0');
		$('.container').css('top', '-54px');
		$('.reviews').css('padding', '54px 5% 5% 5%');
	}
	
	/* Override autocomplete positioning */
	function addNewStyle(newStyle) {
	    var styleElement = document.getElementById('styles_js');
	    if (!styleElement) {
	        styleElement = document.createElement('style');
	        styleElement.type = 'text/css';
	        styleElement.id = 'styles_js';
	        document.getElementsByTagName('head')[0].appendChild(styleElement);
	    }
	    styleElement.appendChild(document.createTextNode(newStyle));
	}
	if ((navigator.platform.indexOf("iPhone")  != -1) || (navigator.platform.indexOf("iPad")  != -1)) {
		addNewStyle('#pac-input {top:80px !important;}')
	} else {
		addNewStyle('#pac-input {top:60px !important;}')
	}
	
	/* Display alert if no internet connection */
	
	if (document.eventListener("offline", onOffline, false);) {
	    function connectionTooltip() {
			$('.connection').fadeOut("slow");
		}
		setTimeout(connectionTooltip, 3000)
	}
	else {
	    // nothing
	};
	
	/* OFF-CANVAS MENUS */
	$(function() {
	    
	    $('.sub-menu li a').click(function() {
			$(".sub-menu a").removeClass('active');
			$(this).addClass('active');
			var itemType = $('.sub-menu').find('li a.active').attr('title');
			findPlaces();
			return false;
		});
	    
	    var menuPanel = $('#menu-panel').scotchPanel({
	        containerSelector: '#site-wrapper',
	        direction: 'left',
	        duration: 300,
	        transition: 'ease',
	        clickSelector: '.menu-tap, .filter, .sub-menu li a',
	        distanceX: '250px',
	        enableEscapeKey: true,
	        
	      beforePanelOpen: function() {
		      $('header, .signin_cont').css({
	            '-moz-transform': 'translate3d(250px, 0, 0)',
	            '-ms-transform': 'translate3d(250px, 0, 0)',
	            '-o-transform': 'translate3d(250px, 0, 0)',
	            '-webkit-transform': 'translate3d(250px, 0, 0)',
	            'transform': 'translate3d(250px, 0, 0)'
	          });
	        },
	        beforePanelClose: function() {
	          $('header, .signin_cont').css({
	            '-moz-transform': 'translate3d(0, 0, 0)',
	            '-ms-transform': 'translate3d(0, 0, 0)',
	            '-o-transform': 'translate3d(0, 0, 0)',
	            '-webkit-transform': 'translate3d(0, 0, 0)',
	            'transform': 'translate3d(0, 0, 0)'
	          });
	          
	          /* VIEW TITLE */
			  var itemType = $('.sub-menu').find('li a.active').attr('title');
			  $( ".logo" ).replaceWith( "<span class='logo'>" + itemType + "</span>" );
			  
	        }
	    });
	
	});
	
	// Redirect Android links to system
	function openExternal(elem) {
	    window.open(elem.href, "_system");
	    return false; // Prevent execution of the default onClick handler 
	}
	
	/* CHECK FOR PLATFORMS */
	var platformRateLink;	
	if ((navigator.platform.indexOf("iPhone")  != -1) || (navigator.platform.indexOf("iPad")  != -1)) {
		platformRateLink = 'itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id1005822759?ls=1&mt=8';
	} else {
	    platformRateLink = 'http://play.google.com/store/apps/details?id=com.dmlapps.dogpeople';
	}
	document.getElementById("platform-link").setAttribute("href",platformRateLink);
	
	/* SHOW RATE THIS APP MODAL AGAIN ONCE PER WEEK */
	function rateAppRepeat() {
		$('.rate-app').fadeIn("fast");
	}
	setTimeout(rateAppRepeat, 10000);
	//setTimeout(rateAppRepeat, 604800000);
	
	/* SHOW RATE THIS APP MODAL INITIALLY */
	$('.rate-app .remind').click(function(){
        $('.rate-app').fadeOut("fast");
        setTimeout(rateAppRepeat, 10000)
    });
	
	/* NEVER SHOW RATE THIS APP MODAL AGAIN */
	$('.rate-app .cancel').click(function(){
        $('.rate-app').fadeOut("fast");
    });
	
	/* SHOW FILTER TOOLTIP */
    function filterTooltip() {
		$('.filter').fadeOut("slow");
		
		// Drop in initial markers
		findPlaces();
	}
	setTimeout(filterTooltip, 3000)
    				    
	$(".nearby-search").click(function(){
        $('.refresh').fadeIn("slow");
        if (!$('.sub-menu li a').hasClass("active")) {
			$('.sub-menu li a.all').addClass("active");
		}
        var itemType = $('.sub-menu').find('li a.active').attr('title');
		$( ".logo" ).replaceWith( "<span class='logo'>" + itemType + "</span>" );
        panLoc();
        findPlaces();
    });
    
    $('.refresh').hide();
    $(".refresh").click(function(){
        findPlaces();
    });

})