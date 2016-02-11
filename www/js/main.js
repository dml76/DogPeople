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
	} 
	
	// Listen for resize changes
	window.addEventListener("resize", function() {
		getMapHeight();
	}, false);
		
	$('.reviews, .reviews-overlay, .reviews-close, .nearby-search, .rate-app, .menu-tap, #floating-panel').hide();
	
	/* ADJUST HEADER HEIGHT FOR STATUS BARS */
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i))) {
		$('header').css('height', '74px');
		$('header').css('padding', '35px 15px 15px');
		$('#menu ul li:first-of-type a').css('height', '59px');
		$('#menu ul li:first-of-type a').css('padding', '32px 15px 8px');
		$('.reviews-close').css('top', '35px');
		$('#site-wrapper').css('padding-top', '0');
		$('.container').css('top', '-74px');
		$('.reviews').css('padding', '74px 5% 5% 5%');
		$('.zipcode-search').css('top', '80px');
	} else {
	    $('header').css('height', '54px');
	    $('header').css('padding', '15px');
	    $('#menu ul li:first-of-type a').css('height', '39px');
		$('#menu ul li:first-of-type a').css('padding', '12px 15px 8px');
		$('.reviews-close').css('top', '15px');
		$('#site-wrapper').css('padding-top', '0');
		$('.container').css('top', '-54px');
		$('.reviews').css('padding', '54px 5% 5% 5%');
		$('.zipcode-search').css('top', '60px');
	}
		
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
	
	/* SHOW RATE THIS APP MODAL AGAIN ONCE PER WEEK */
	function rateAppRepeat() {
		$('.rate-app').fadeIn("fast");
	}
	//setTimeout(rateAppRepeat, 10000);
	setTimeout(rateAppRepeat, 604800000);
	
	/* SHOW RATE THIS APP MODAL INITIALLY */
	$('.rate-app .remind').click(function(){
        $('.rate-app').fadeOut("fast");
        setTimeout(rateAppRepeat, 10000)
    });
	
	/* NEVER SHOW RATE THIS APP MODAL AGAIN */
	$('.rate-app .cancel').click(function(){
        $('.rate-app').fadeOut("fast");
    });
    				    
	$(".nearby-search").click(function(){
        $( "input#address" ).val("");
        $(".clear-search").hide();
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
    
    function showDefaultPlaces() {
		// Load the default category places
		findPlaces();
	}
	setTimeout(showDefaultPlaces, 3000);
	
	// Clear Search
	$(".clear-search").click(function(){
       $( "input#address" ).val("");
       $(".clear-search").hide();
    });

})