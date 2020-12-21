$(document).ready(function () {
	// photo detail popup library
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
		},
	});
	// sub menu
	$('.sub_menu > 	ul > li > a').click(function () {
		$('.on').removeClass('on');
		$(this).addClass('on');
	});
	const input_img = document.getElementById('input_img');
	const preview_container = document.getElementById('img_preview');
	const preview_default_text = preview_container.querySelector(
		'.img_preview_default_text'
	);
	input_img.addEventListener('change', function () {
		console.log(this.files);
		for (let i = 0; i < this.files.length; i++) {
			const file = this.files[i];
			if (file) {
				const reader = new FileReader();

				preview_default_text.style.display = 'none';
				let preview_img = document.createElement('img');
				preview_img.setAttribute('class', 'img_preveiw_img');
				preview_img.style.display = 'block';
				preview_img.style.width = '150px';
				preview_img.style.height = '150px';
				preview_img.style.margin = '5px';
				preview_img.style.backgroundSize = 'cover';

				reader.addEventListener('load', function () {
					preview_img.setAttribute('src', this.result);
				});

				reader.readAsDataURL(file);
				preview_container.appendChild(preview_img);
			} else {
				preview_default_text.style.display = null;
			}
		}
	});
});
