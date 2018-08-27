$(function() {

	// ----- CAROUSELS ----- //

	// FUNCTIONS //
	// Stylization of controls 
	function styleControls(e, element) {
		var count = 0;
		element == '.module-fav-scenarios' 
			? count = parseInt(window.innerWidth/645/2)
			: count = parseInt(window.innerWidth/215);
		if (e.item) {
			e.item.index == 0 
				? $(element).find('.nav-arrows__left').attr('src','img/ArrowLeft.png') 
				: $(element).find('.nav-arrows__left').attr('src','img/ArrowLeft--selected.png')
			e.item.count - count - e.item.index == 0 
				? $(element).find('.nav-arrows__right').attr('src','img/ArrowLeft.png')
				: $(element).find('.nav-arrows__right').attr('src','img/ArrowLeft--selected.png')
		}
	}

	// -------------------- //

	// VERTICAL CAROUSEL //
	$('.module-main .up-btn').click(function(){
		console.log($(this).siblings('.vertical-slider').find('.vertical-slider__item').last().position().top, $(this).siblings('.vertical-slider').height());
		$(this).siblings('.vertical-slider').animate({
			scrollTop: $(this).parents('.module-main__info-box').height() - 40
		}, 400);
	});

	$('.vertical-slider').scroll(function(){
		if(document.innerWidth()>985){
			if($(this).find('.vertical-slider__item').last().position().top < $(this).height() - 100)
				$(this).parent().find('.up-btn').addClass('hidden');
			else 
				$(this).parent().find('.up-btn').removeClass('hidden');
		}
		
	});

	// -------------------- //

	// SCENARIOS OWL CAROUSEL //
	var owl2 = $('.owl-carousel').eq(0); 

	owl2.owlCarousel({ 
			margin:0,
			loop:false,
			autoWidth:false,
			items:1,
			mouseDrag: false
	});

	// Controls stylization
	owl2.on('changed.owl.carousel', function(e){
		styleControls(e, '.module-fav-scenarios');
	});

	// Controls events
	$('.module-fav-scenarios .nav-arrows__right').click(function() { 
    owl2.trigger('next.owl.carousel');
	})	
	$('.module-fav-scenarios .nav-arrows__left').click(function() {
    owl2.trigger('prev.owl.carousel');
	})

	// -------------------- //

	// DEVICES OWL CAROUSEL //
	var owl = $('.owl-carousel').eq(1); 
	
	// Initialization
	owl.owlCarousel({ 
			margin:0,
			loop:false,
			autoWidth:true,
			items:1,
			mouseDrag: false
	});

	// Controls stylization
	owl.on('changed.owl.carousel', function(e){
		styleControls(e, '.module-fav-devices');
	});

	// Controls events
	$('.module-fav-devices .nav-arrows__right').click(function() { 
    owl.trigger('next.owl.carousel');
	})	
	$('.module-fav-devices .nav-arrows__left').click(function() {
    owl.trigger('prev.owl.carousel');
	})	

	// -------------------- //

	// MODALS //
	function openModal(th){
		if(th.find('.modal-inner').length > 0){
			var el = th.find('.modal-inner').html();
			$('body > .item-modal .item-modal__inner').append(el);
			$('main').addClass('blured');
			$('body > .item-modal').css('display','flex').animate({
				opacity : 1
			},120);
			$('body > .item-modal .modal-inner').fadeIn(200);
		}
	}
	function closeModal(){
		$('main').removeClass('blured');
		$('body > .item-modal').animate({
				opacity : 0
			},120).fadeOut(100).find('.item-modal__inner').remove();
		$('body > .item-modal').append('<div class="item-modal__inner"></div>');
	}

	$('.typical-item').click(function(e){
		e.stopPropagation();
		openModal($(this));
	});
	$('.item-modal__inner').click(function(e){
		e.stopImmediatePropagation();
	});
	$(document).delegate('.item-modal__inner', 'click', function(event){
    event.stopPropagation();
	});
	$('body').on('click', '.modal-buttons__close', function() {
		closeModal();
		console.log(1);
	});
	$(document).click(function(){
		closeModal();
	});


	// -------------------- //

	// MOBILE NAV //
	$('.mobile-nav-icon').click(function(){
		$('.mobile-nav').slideToggle();
	});

});
