
$(document).ready(function () {

	var source_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSzskwMAka_TYxIV33UEBLOrE2b46sPRd7oiKaxx5KC_kSUU_lKJpIkgPVB-iHV5LTH3LaDE-lwUQgm/pub?gid=150341003&single=true&output=csv';
	
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
		var captionText = document.getElementById("caption");
		var path;
		var selected_images = [];
				
		
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
		
		
		function copyLink(x) {
			document.execCommand('copy');
			console.log(x);
		}

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
				img.classList.add('img-responsive','image');
				$('#gallery').append(img);
			}
			


			$(document).on('click','.image', function() {
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
						modal.style.display = "block";
						modalImg.src = url;
						captionText.innerHTML = url;
						copyLink(url);
						//selected_images.push(url);
					}

				$('#output_area').empty();			
					for (var i=0; i<selected_images.length; i++) {
						var output = document.createElement("p");
						output.innerHTML = selected_images[i];

						$('#output_area').append(output);			
					}

				});


			modalImg.onclick = function(){
				modal.style.display = "none";
			}
		
		}


	
		});
});
	
