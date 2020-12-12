$(document).ready(function () {
	$('.sub_menu > 	ul > li > a').click(function () {
		$('.on').removeClass('on');
		$(this).addClass('on');
	});
});
