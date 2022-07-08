
$(document).ready(function () {

	
	function getLinks() {
		return [
			'https://mvcdn.fancaps.net/1533120.jpg',
			'https://mvcdn.fancaps.net/1534539.jpg',
			'https://mvcdn.fancaps.net/1533528.jpg',
			'https://mvcdn.fancaps.net/1534553.jpg',
			'https://mvcdn.fancaps.net/1534177.jpg',
			'https://mvcdn.fancaps.net/1534323.jpg'
			];
	}
	
	var image_links = getLinks();
	
	
	// setup left right buttons
	$('#left_btn').click(function() {
		updateSlideIndex(slideIndex -= 1);
	});
	
	$('#right_btn').click(function() {
		updateSlideIndex(slideIndex += 1);
	});
		
	// setup image number buttons
	image_links.forEach(function (item, index) {
		console.log(item, index);
		id_name = 'btn_' + index+1;
		$('#num_button_area').append(
			$(document.createElement('button')).prop({
				type: 'button',
				id: id_name,
				innerHTML: index+1,
				class: 'w3-button slide_btn w3-dark-gray'
			})
		);
		$('#' + id_name).click(function() { 
			updateSlideIndex(index);			
		});
	});
	
	
	var slideIndex = 0;
	updateSlideIndex(slideIndex);
	
	
	
	function showSlide(num) {
		document.getElementById('slide1').src = image_links[num];
	}
		
	function updateButtonColor(num) {
		image_links.forEach(function (item, index) {
			id_name = 'btn_' + index+1;
			if (num == index) {
				$('#' + id_name).removeClass("w3-dark-gray");
				$('#' + id_name).addClass("w3-red");    
				}
			else {
				$('#' + id_name).removeClass("w3-red");
				$('#' + id_name).addClass("w3-dark-gray");    
			}
		});
	}
	

	function updateSlideIndex(n) {
		if (n == image_links.length) {
			n = 0;
			//slideIndex = 0;
		}    
		if (n < 0) {
			n = image_links.length - 1;
			//slideIndex = image_links.length - 1;
		}		
		slideIndex = n;
		showSlide(slideIndex);
		updateButtonColor(slideIndex);
		console.log(slideIndex);
	}


});
