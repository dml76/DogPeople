$(document).ready(function() {
	
	$('.reviews, .reviews-overlay, .reviews-close, .nearby-search, .rate-app').hide();
	
	/* ADJUST HEADER HEIGHT FOR STATUS BARS */
	if ((navigator.platform.indexOf("iPhone") != -1)) {
		$('header').css('height', '94px');
		$('header').css('padding', '35px 15px 15px');
		$('#menu ul li:first-of-type a').css('height', '74px');
		$('#menu ul li:first-of-type a').css('padding', '40px 15px 10px');
		$('.reviews-close').css('top', '35px');
	} else {
	    $('header').css('height', '54px');
	    $('header').css('padding', '15px');
	    $('#menu ul li:first-of-type a').css('height', '54px');
		$('#menu ul li:first-of-type a').css('padding', '20px 15px 10px');
		$('.reviews-close').css('top', '15px');
	}
	
	/* OFF-CANVAS MENUS */
	$(function() {
	    
	    $('.sub-menu li a').click(function() {
			$(".sub-menu a").removeClass('active');
			$(this).addClass('active');
			var itemType = $('.sub-menu').find('li a.active').attr('title');
			//menuPanel.close();
			//$('.refresh').fadeIn("slow");
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
	
	/* CHECK FOR PLATFORMS */
	var platformRateLink;	
	if ((navigator.platform.indexOf("iPhone") != -1)) {
		platformRateLink = 'itms-apps://itunes.apple.com/us/app/domainsicle-domain-name-search/id1005822759?ls=1&mt=8';
	} else {
	    platformRateLink = 'market://details?id=com.dmlapps.dogpeople';
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