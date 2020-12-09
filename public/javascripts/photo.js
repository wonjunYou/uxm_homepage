// $('.document').ready(function () {
// 	// photo.pug
// 	$('.photo-container').magnificPopup({
// 		delegate: 'a',
// 		type: 'image',
// 		gallery: {
// 			enabled: true,
// 		},
// 	});
// });

$(document).ready(function () {
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
		},
	});
});
