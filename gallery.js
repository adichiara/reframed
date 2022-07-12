
$(document).ready(function () {

	var start_id = 1362371;
	var end_id = 1367493;
	// var end_id = start_id + 100; 
	var selected_images = [];

	function copyLink(x) {
		document.execCommand('copy');
		console.log('copyLink');
	}

	for (var i=start_id; i<=end_id; i++) {
		
		var image_url_full = 'https://mvcdn.fancaps.net/' + i + '.jpg'

		var image_url_full2 = 'https://cdni.fancaps.net/file/fancaps-movieimages/' + i + '.jpg'

		var image_url_thumb = 'https://moviethumbs.fancaps.net/' + i + '.jpg'	
		 
		var img = document.createElement('img');
		var id_name = 'img_' + i;
		img.id = id_name;
    img.src = image_url_thumb;  
		img.title = image_url_full;
		img.classList.add('img-responsive','image');
		$('#gallery').append(img);
/* 		$('#' + id_name).click(function() { 
				console.log('clicked: ' + id_name);
			});
		 */
	 
		}

var path;
	$(document).on('click','.image', function() {
			url = $(this).attr('title');			
			id_name = $(this).attr('id');	

			// unselect
			if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				selected_images = selected_images.filter(item => item !== url)	
			} 
			// select
			else {  
				$(this).addClass('selected');		
				selected_images.push(url);
			}
			
		$('#output_area').empty();			
			for (var i=0; i<selected_images.length; i++) {

        var img = document.createElement('img');
        var id_name = selected_images[i];
        img.src = selected_images[i];  
        img.title = selected_images[i];
        img.classList.add('img-responsive','image','selected-list');
				$('#output_area').append(img);			
    
				// var output = document.createElement("p");
				// output.innerHTML = selected_images[i];
				
				// $('#output_area').append(output);			
			}
			
			
		});
		
				
		 
/* 	$(document).on('keydown',function(evt) {
	if(evt.ctrlKey && evt.which == 86) {
		console.log('keydown');
		$('#field').html(path);
		}
	}); */
});
