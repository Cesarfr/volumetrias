$(document).ready(function(){
	$('.to').datepicker({
		autoclose: true,
		minViewMode: 1,
		format: 'yyyy/mm'
	}).on('changeDate', function(selected){
		FromEndDate = new Date(selected.date.valueOf());
		FromEndDate.setDate(FromEndDate.getDate(new Date(selected.date.valueOf())));
		$('.from').datepicker('setEndDate', FromEndDate);
	});
	$.validate({
		lang: 'es'
	  });
});