function servicesPOST(){
	var cliente = $('#group_inp').val();
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		cliente: cliente,
		success: function(data){
			try{
				var json_obj = jQuery.parseJSON(data);
				for(i = 0; i < json_obj.length; i++){
					$('#services-dw').append(
					'<option value="'+json_obj[i].id+'">'+json_obj[i].descripcion+'</option>'
					);
				}
			}catch(err){
				alert("Error del servidor, contacte con el administrador. " + err.message);
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error ocurred saving data");
		}
	});
}
