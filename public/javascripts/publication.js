$(document).ready(function () {
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
		let class_name = '.pub_tr' + ($(this).index() + 1);
		$(class_name)
			.css({ display: '' })
			.each(function (index, item) {
				if (index % 2 == 0) {
					$(item).css('backgroundColor', 'rgba(128,128,128,0.2)');
				}
			});
	});
});
