
$(document).ready(function () {

	var source_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS_0YBYvDYcxDoHXPuRjYU9NZe_e-ezOtIjYoVaepDGhWE0waffJT59tVxI0F_JGytHWB5s52DnxnFq/pub?gid=372625441&single=true&output=csv';

	d3.csv(source_url, function(d) {
//	 	console.log(d[0]);
		d.id = +d.id;
		d.title = d.title;
		d.prefix = d.prefix;
		d.ext = d.ext;
		d.first_image = +d.first_image;
		d.last_image = +d.last_image;
		
		return d;
		}).then(function(dataset) {
			
		//console.log(dataset);		
		console.log('Total dataset entries: ' + dataset.length);
		
		function getUniqueValues(d, key) {
			var unique_set = [];
			for (var i = 0; i < d.length; i++) {
				if (!unique_set.includes(d[i][key])) {
					unique_set.push(d[i][key]);
					}
				}
			return unique_set;
		}
		
		titles = getUniqueValues(dataset, 'title');
		var selected_idx;		
		var selected_title;
		var start_id;
		var end_id;
		var prefix;
		var ext;
		
		var modal = document.getElementById("myModal");
		var modalImg = document.getElementById("modal_img");
		var modalSelected = document.getElementById("modal_selected");
		var closeButton = document.getElementById("close");
		var resetButton = document.getElementById("reset");
		var selectionsButton = document.getElementById("show_selections_btn");
		var captionText = document.getElementById("caption");

		var path;
		var selected_images = [];
		var confirmed_images = [];
				
		
		//populate archive dropdown
		var mySelect = $('#movie_select');
		$.each(titles, function(val, text) {
			mySelect.append(
				$('<option></option>').val(val).html(text));
		});

		// update image_links on change in dropdown selection
		$("#movie_select").change(function (event) {
			selected_idx = parseInt($(this).val());
			selected_title = dataset[selected_idx].title;
			start_id = dataset[selected_idx].first_image;
			end_id = dataset[selected_idx].last_image;
			prefix = dataset[selected_idx].prefix;
			ext = dataset[selected_idx].ext;
			
			console.log('------');
			console.log('selected_idx: ' + selected_idx);
			console.log(selected_title);
			console.log(start_id + ' to ' + end_id);
			
			showImages();
		});
		
		
		
		function showImages() {
		
			$('#gallery').empty()
			
			//end_id = start_id + 50;
			for (var i=start_id; i<=end_id; i++) {

				var image_url_full = 'https://mvcdn.fancaps.net/' + i + '.jpg';
// 				var image_url_full2 = 'https://cdni.fancaps.net/file/fancaps-movieimages/' + i + '.jpg';
// 				var image_url_thumb = 'https://moviethumbs.fancaps.net/' + i + '.jpg';				 
				var image_url_thumb = prefix + i + ext;		

				var img = document.createElement('img');
				var id_name = 'img_' + i;
				img.id = id_name;
				img.src = image_url_thumb;  
				img.title = image_url_full;
				img.classList.add('img-responsive','thumb');
				$('#gallery').append(img);
			}
			


			$(document).on('click','.thumb', function() {
					id_name = $(this).attr('id');	
					console.log(id_name);

					url = $(this).attr('title');				
					console.log(url);

					// unselect
					if ($(this).hasClass('selected')) {
						$(this).removeClass('selected');
						selected_images = selected_images.filter(item => item !== url)	
					} 
					// select
					else {  
						$(this).addClass('selected');		
						modalSelected.style.display = 'none';
						modalImg.style.display = 'block';	
						modal.style.display = "block";
						modalImg.src = url;
						captionText.innerHTML = url;
						selected_images.push(url);
					}
				});


			$(document).on('click','.modal-selected', function() {
					id_name = $(this).attr('id');	
					console.log(id_name);

					url = $(this).attr('title');				
					console.log(url);

					// unselect
					if ($(this).hasClass('confirmed')) {
						$(this).removeClass('confirmed');
						confirmed_images = confirmed_images.filter(item => item !== url)	
					} 
					// select
					else {  
						$(this).addClass('confirmed');		
						modalSelected.style.display = 'none';
						modalImg.style.display = 'block';	
						modal.style.display = "block";
						modalImg.src = url;
						captionText.innerHTML = url;
						selected_images.push(url);
					}
				});


				// $('#output_area').empty();			
				// 	for (var i=0; i<selected_images.length; i++) {
				// 		var output = document.createElement("p");
				// 		output.innerHTML = selected_images[i];
				// 		// $('#output_area').append(output);			
				// 	}


			modalImg.onclick = function(){
				modal.style.display = "none";
				resetButton.style.display = 'none';
			}
			closeButton.onclick = function(){
				modal.style.display = "none";
				resetButton.style.display = 'none';
			}
			
			selectionsButton.onclick = function(){
				$('#modal_selected').empty();
				modalImg.style.display = 'none';	
				resetButton.style.display = 'block';
				modalSelected.style.display = 'block';
					
				captionText.style.display = 'none';

				console.log(selected_images);
				modal.style.display = "block";
				
				for (var i=0; i<selected_images.length; i++) {	
					
					var img = document.createElement('img');
					/* img.id = id_name; */
					img.src = selected_images[i];  
					img.classList.add('img-responsive','modal-selected');
					$('#modal_selected').append(img);		
				}
				
				/* modal.style.display = "none" */
			}
			
		}


	
		});
});
	
