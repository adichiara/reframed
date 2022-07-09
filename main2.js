

$(document).ready(function () {

	d3.csv(source_url, function(d) {
		d.game_num = +d.game_num;
		d.order = +d.order;
		d.url = d.url;
		return d;
	}).then(function(dataset) {

		//  do everything here:
		
		function getUniqueValues(d, key) {
			var unique_set = [];
			for (var i = 0; i < d.length; i++) {
				if (!unique_set.includes(d[i][key])) {
					unique_set.push(d[i][key]);
				}
			}
			return unique_set;
		}

		function filterData(d, key, value) {
			var filtered_data_new = [];
			for (var i = 0; i < d.length; i++) {
				if (d[i][key] == value) {
					filtered_data_new.push(d[i].url);
				}
			}
			return filtered_data_new;
		}

		// var filtered_data = [];
		var game_num_filter;
		var game_nums = getUniqueValues(dataset, "game_num");
		var max_game_num = d3.max(game_nums);
		var slideIndex = 0;

		//populate archive dropdown
		var mySelect = $('#num_select');
		$.each(game_nums, function(val, text) {
			mySelect.append(
				$('<option></option>').val(val).html(text)
			);
		});
		$("#num_select").val(game_nums.indexOf(max_game_num));

		// initialize image_links to most recently added
		var image_links = filterData(dataset, 'game_num', max_game_num);

		// update image_links on change in dropdown selection
		$("#num_select").change(function (event) {
			game_num_filter = game_nums[$(this).val()];
			image_links = filterData(dataset, 'game_num', game_num_filter);
			console.log('filterImageLinks: ' + game_num_filter);
			updateSlideIndex(0);
		});
		
		// setup left right buttons
		$('#left_btn').click(function() {
			updateSlideIndex(slideIndex -= 1);
		});
		
		$('#right_btn').click(function() {
			updateSlideIndex(slideIndex += 1);
		});
					

		// setup image number buttons
		image_links.forEach(function (item, index) {
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
			}    
			if (n < 0) {
				n = image_links.length - 1;
			}		
			slideIndex = n;
			console.log('updateSlideIndex: ' + slideIndex);
			showSlide(slideIndex);
			updateButtonColor(slideIndex);
		}

	});
});



	
	
	
	





