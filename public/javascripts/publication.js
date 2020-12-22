$(document).ready(function () {
	// $('.pub_sub_menu > 	ul > li > a').click(function () {
	// 	$('.on').removeClass('on');
	// 	$(this).addClass('on');
	// 	if ($(this).text() == '해외학술지') {
	// 		$('[class^="pub_tr"]').css({ display: 'none' });
	// 		$('.pub_tr1').css({ display: '' });
	// 	}
	// 	if ($(this).text() == '해외학회발표') {
	// 		$('[class^="pub_tr"]').css({ display: 'none' });
	// 		$('.pub_tr2').css({ display: '' });
	// 	}
	// 	if ($(this).text() == '국내학술지') {
	// 		$('[class^="pub_tr"]').css({ display: 'none' });
	// 		$('.pub_tr3').css({ display: '' });
	// 	}
	// 	if ($(this).text() == '국내학회발표') {
	// 		$('[class^="pub_tr"]').css({ display: 'none' });
	// 		$('.pub_tr4').css({ display: '' });
	// 	}
	// });

	$('[class^="pub_tr"]').css({ display: 'none' });
	$('.pub_tr1')
		.css({ display: '' })
		.each(function (index, item) {
			if (index % 2 == 0) {
				$(item).css('backgroundColor', 'rgba(128,128,128,0.2)');
			}
		});
	$('.pub_sub_menu > 	ul > li').click(function () {
		$('.on').removeClass('on');
		$(this).addClass('on');
		$('[class^="pub_tr"]').hide();
		let class_name = '.pub_tr';
		if ($(this).text() == '해외학술지') {
			class_name += '1';
			// $('.pub_tr1').css({ display: '' });
		}
		if ($(this).text() == '해외학회발표') {
			class_name += '2';
			// $('.pub_tr2').css({ display: '' });
		}
		if ($(this).text() == '국내학술지') {
			class_name += '3';
			// $('.pub_tr3').css({ display: '' });
		}
		if ($(this).text() == '국내학회발표') {
			class_name += '4';
			// $('.pub_tr4').css({ display: '' });
		}
		$(class_name)
			.css({ display: '' })
			.each(function (index, item) {
				if (index % 2 == 0) {
					$(item).css('backgroundColor', 'rgba(128,128,128,0.2)');
				}
			});
	});
});
