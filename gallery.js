document.addEventListener('DOMContentLoaded', function (event) {
	var source_url =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vTaZtWYZ8Yw10FfxZKggClVnQhmNOntinNQonp7tE1pESO58AWfll_UcxWM1sFuNc8bWnCrLgEm6Pjp/pub?gid=6620390&single=true&output=csv';

	d3.csv(source_url, function (d) {
		d.id = +d.id;
		d.title = d.title;
		d.prefix = d.prefix;
		d.ext = d.ext;
		d.first_image = +d.first_image;
		d.last_image = +d.last_image;

		return d;
	}).then(function (dataset) {
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

		var gallery = document.getElementById('gallery');
		var zoom_div = document.getElementById('zoom_div');
		var zoom_img = document.getElementById('zoom_img');
		var caption = document.getElementById('caption');
		var selections_screen = document.getElementById('selections_screen');
		var results_table = document.getElementById('results_table');

		var show_selections_btn = document.getElementById('show_selections_btn');
		var clear_selections_btn = document.getElementById('clear_selections_btn');
		var confirm_btn = document.getElementById('confirm_btn');
		var reset_btn = document.getElementById('reset_btn');
		var copy_btn = document.getElementById('copy_btn');
		var close_btn = document.getElementById('close_btn');

		var titles = getUniqueValues(dataset, 'title');

		var selected_ids = [];
		var confirmed_urls = [];
		var scroll_div;

		var thumb_urls = [];
		var full_urls = [];
		var thumb_prefix = 'https://moviethumbs.fancaps.net/';
		var full_prefix = 'https://mvcdn.fancaps.net/';
		var ext = '.jpg';

		// var start_id = 3452902;
		// var end_id = start_id + 50;

		var idx = 0;

		//populate archive dropdown
		var mySelect = $('#movie_select');
		$.each(titles, function (val, text) {
			mySelect.append($('<option></option>').val(val).html(text));
		});

		// update image_links on change in dropdown selection
		$('#movie_select').change(function (event) {
			var selected_idx = parseInt($(this).val());
			selected_title = dataset[selected_idx].title;
			start_id = dataset[selected_idx].first_image;
			end_id = dataset[selected_idx].last_image;
			prefix = dataset[selected_idx].prefix;
			ext = dataset[selected_idx].ext;

			// console.log("------");
			// console.log("selected_idx: " + selected_idx);
			// console.log(selected_title);
			// console.log(start_id + " to " + end_id);

			showImages();
		});

		function showImages() {
			gallery.replaceChildren();

			for (var i = start_id; i < end_id; i++) {
				var thumb_url = thumb_prefix + i + ext;
				var full_url = full_prefix + i + ext;
				thumb_urls.push(thumb_url);
				full_urls.push(full_url);

				var div = document.createElement('div');
				div.classList.add('col', 'p-1', 'm-0', 'thumb-img');

				var img = document.createElement('img');
				img.id = 'thumb_' + idx;
				img.src = thumb_url;
				img.title = full_url;
				img.classList.add('img-responsive', 'thumb-img');
				img.onclick = function () {
					var id_name = this.getAttribute('id');
					scroll_div = id_name;
					console.log('scroll_div: ' + scroll_div);
					var id_num = id_name.replace('thumb_', '');
					showZoomImg(id_num);
				};
				div.append(img);
				gallery.append(div);
				idx += 1;
			}
		}
		function showZoomImg(id_num) {
			var this_thumb = document.getElementById('thumb_' + id_num);

			if (this_thumb.classList.contains('selected')) {
				// unselect
				this_thumb.classList.remove('selected');
				selected_ids = selected_ids.filter((item) => item !== id_num);
			} else {
				// select
				zoom_img.src = full_urls[id_num];
				caption.innerHTML = full_urls[id_num];

				window.scrollTo(0, 200);

				show_selections_btn.style.display = 'none';
				clear_selections_btn.style.display = 'none';
				reset_btn.style.display = 'none';
				gallery.style.display = 'none';
				selections_screen.style.display = 'none';

				zoom_div.style.display = 'block';
				zoom_img.style.display = 'block';
				close_btn.style.display = 'inline-block';

				this_thumb.classList.add('selected');
				selected_ids.push(id_num);
			}
		}

		var showSelections = function () {
			if (selected_ids.length > 0) {
				selections_screen.replaceChildren();
				confirmed_urls = [];

				for (const idx of selected_ids) {
					var div = document.createElement('div');
					div.classList.add('row', 'p-3', 'm-0', 'selected-row');

					var overlay = document.createElement('div');
					overlay.classList.add('col-1', 'overlay');
					div.append(overlay);

					var img_div = document.createElement('div');
					img_div.classList.add('col-11');
					var img = document.createElement('img');
					img.classList.add('selected-img', 'img-responsive');
					img.src = full_urls[idx];
					img.id = 'img_' + idx;
					// img.style.maxWidth = '100%';
					img_div.append(img);
					div.append(img_div);

					div.onclick = function () {
						console.log(this);
						var this_num = this.childNodes[0];
						var this_img = this.childNodes[1].childNodes[0];
						var idx = this_img.getAttribute('id').replace('img_', '');
						console.log(idx);

						if (this_img.classList.contains('confirmed')) {
							console.log('confirmed');
						} else {
							this_img.classList.add('confirmed');
							confirmed_urls.push(full_urls[idx]);
							this_num.innerHTML = confirmed_urls.length;
						}
						console.log(this);
					};
					selections_screen.append(div);
				}

				gallery.style.display = 'none';
				zoom_img.style.display = 'none';
				zoom_div.style.display = 'none';
				selections_screen.style.display = 'inline-block';
				results_screen.style.display = 'none';
				results_table.style.display = 'none';
				show_selections_btn.style.display = 'none';
				clear_selections_btn.style.display = 'none';
				confirm_btn.style.display = 'inline-block';
				reset_btn.style.display = 'inline-block';
				copy_btn.style.display = 'none';
				close_btn.style.display = 'inline-block';
			}
		};

		confirm_btn.onclick = function () {
			console.log(confirmed_urls);
			if (confirmed_urls.length > 0) {
				results_table.replaceChildren();

				for (var i = 0; i <= confirmed_urls.length; i++) {
					var row = document.createElement('tr');

					var frame_num = document.createElement('td');
					frame_num.innerHTML = i + 1;

					var title = document.createElement('td');
					title.innerHTML = selected_title;

					var url = document.createElement('td');
					url.innerHTML = confirmed_urls[i];

					row.append(frame_num);
					row.append(title);
					row.append(url);
					results_table.append(row);
				}

				var last_row = document.createElement('tr');
				frame_num.innerHTML = confirmed_urls.length + 1;
				title.innerHTML = selected_title;
				url.innerHTML = confirmed_urls[confirmed_urls.length - 1];
				results_table.append(last_row);

				gallery.style.display = 'none';
				zoom_img.style.display = 'none';
				zoom_div.style.display = 'none';
				selections_screen.style.display = 'none';
				results_screen.style.display = 'block';
				results_table.style.display = 'block';
				show_selections_btn.style.display = 'none';
				clear_selections_btn.style.display = 'none';
				confirm_btn.style.display = 'none';
				reset_btn.style.display = 'none';
				copy_btn.style.display = 'inline-block';
				close_btn.style.display = 'inline-block';

				copy_btn.onclick = function () {
					var range = document.createRange();
					range.selectNode(results_table);
					window.getSelection().addRange(range);
					document.execCommand('copy');
				};
			}
		};

		show_selections_btn.onclick = function () {
			showSelections();
		};

		reset_btn.onclick = function () {
			showSelections();
		};

		clear_selections_btn.onclick = function () {
			for (const i of selected_ids) {
				const thumb_id = 'thumb_' + i;
				document.getElementById(thumb_id).classList.remove('selected');
			}
			selected_ids = [];
		};

		close_btn.onclick = function () {
			gallery.style.display = 'flex';
			zoom_img.style.display = 'none';
			zoom_div.style.display = 'none';
			selections_screen.style.display = 'none';
			results_screen.style.display = 'none';
			results_table.style.display = 'none';
			show_selections_btn.style.display = 'inline-block';
			clear_selections_btn.style.display = 'inline-block';
			confirm_btn.style.display = 'none';
			reset_btn.style.display = 'none';
			copy_btn.style.display = 'none';
			close_btn.style.display = 'none';
			document
				.getElementById(scroll_div)
				.scrollIntoView({ behavior: 'smooth', block: 'center' });
		};

		zoom_img.onclick = function () {
			gallery.style.display = 'flex';
			zoom_img.style.display = 'none';
			zoom_div.style.display = 'none';
			selections_screen.style.display = 'none';
			results_screen.style.display = 'none';
			results_table.style.display = 'none';
			show_selections_btn.style.display = 'inline-block';
			clear_selections_btn.style.display = 'inline-block';
			confirm_btn.style.display = 'none';
			reset_btn.style.display = 'none';
			copy_btn.style.display = 'none';
			close_btn.style.display = 'none';
			document
				.getElementById(scroll_div)
				.scrollIntoView({ behavior: 'smooth', block: 'center' });
		};
	});
});
