// Script
// Navbar height

function navbarHeight(h, wHtml) {
	var c = $('.navbar-container'),
		f = $('#header-footer');

	if(wHtml>767) {
		c.css({'min-height': h});
		f.css({"display": "block"});
	} else {
		c.css({'min-height': 0});
		f.css({"display": "none"});
	}
}

$(window).on('load resize', function() {
	var h = $(window).height(),
		w = $(window).width(),
		hHtml = $('html').height(),
		wHtml = $('html').width(),
		wButton = $('.btn-container .btn').outerWidth(),
		hButton = $('.btn-container .btn').outerHeight(),
		wImgLeft = (wHtml - wButton)/2 + 10 + 1,
		wImgRight = (wHtml - wButton)/2 - 10 + 1,
		wImg = (wHtml - wButton)/2 + 1;
		hImg = (hHtml - hButton)/2 + 1;

	navbarHeight(h, wHtml);

	if(wHtml>767) {
		if($('body').hasClass('home')) {
			$('.rays-left').css({'width': wImgLeft});
			$('.rays-right').css({'width': wImgRight});
		}
	} else {
		if($('body').hasClass('home')) {
			$('.rays-left').css({'width': wImg});
			$('.rays-right').css({'width': wImg});
		}
	}

	if($('body').hasClass('home')) {
		$('.rays-left, .rays-right').css({'height': hImg});
	}
});

jQuery(document).ready(function(){
	// Bootstrap Carousel
	$(document).bind('keyup', function(e) {
		if(e.which == 39){
			$('.carousel').carousel('next');
		}
		else if(e.which == 37){
			$('.carousel').carousel('prev');
		}
	});

	// Navbar Dropdown menu
	$('.dropdown-menu').click(function (e) {
		e.stopPropagation();
	});

	// Gallery Slider Modal
	// Copy loaded image into carousel
	var inner = $('.gallery-carousel.modal .carousel-inner');
	var item_default = inner.find('.item').eq(0);
	$('.gallery .item img').on('load').each(function(i) {
		var item = item_default.clone();
		var title = $(this).attr("title");
		var src = $(this).attr('src');
		var slide = $(this).parent().parent().index() + 1;

		item.find('.entry-footer .entry-title').html(title);
		item.find('img').attr("src", src);
		item.find('.entry-indicators').html('<span class="slide-id">' + slide + '</span>');
		item.appendTo(inner);
		if (i === 0){ // set first item active
			item.addClass('active');
		}

	});
	item_default.remove();

	var count = $('.gallery .item').length;
	var ind_count = $('<span class="slash">/</span><span class="count">' + count + '</span>');
	ind_count.appendTo('.gallery-carousel.modal .entry-indicators');
	if(count == 1) {
		$('.gallery-carousel.modal .carousel-control, .gallery-carousel.modal .entry-indicators').addClass('hidden');
	}
	// Activate the carousel
	$('.gallery-carousel.modal .carousel').carousel({interval:false});

	// change modal title when slide changes
	$('.gallery-carousel.modal .carousel').on('slid.bs.carousel', function () {
	});

	// When clicking a image
	$('.gallery .item').click(function(){
		var id = $(this).index();
		$('.gallery-carousel.modal .item').removeClass('active');
		$('.gallery-carousel.modal .item').eq(id).addClass('active'); // slide carousel to selected
		$('.gallery-carousel.modal').modal('show'); // show the modal
	});

	$('.about .content img').click(function(e){
		e.stopPropagation();
	});

	// Close Gallery
	$('.gallery-carousel.modal').click(function(event) {
		if ($(event.target).closest('.modal-content, .carousel-control').length) return;
		$(this).modal('hide');
	});

	function adjustModalMaxHeightAndPosition(){
		// Gallery Modal
		$('.gallery-carousel.modal .item').each(function(){

			var dialogMarginTop = parseInt($(this).find('.modal-dialog').css('margin-top').replace("px", ""));
			var dialogMarginBottom = parseInt($(this).find('.modal-dialog').css('margin-bottom').replace("px", ""));

			var modalContentHeight = $(window).height() - (dialogMarginTop + dialogMarginBottom);

			var modalContentMaxHeight = parseInt($(this).find('.modal-content').css('max-height').replace("px", ""));
			var modalContentMinHeight = 320 - (dialogMarginTop + dialogMarginBottom);
			var footerHeight = parseInt($(this).find('.entry-footer').css('height').replace("px", ""));

			if(modalContentMaxHeight && modalContentMaxHeight < modalContentHeight){
				modalContentHeight = modalContentMaxHeight;
			}
			if(modalContentHeight <= modalContentMinHeight) {
				modalContentHeight = modalContentMinHeight;
			}
			$(this).find('img').css({ 'max-height': modalContentHeight - footerHeight});
		});
	}

	$(window).on('load resize', adjustModalMaxHeightAndPosition);
});
