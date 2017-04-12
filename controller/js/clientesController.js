function servicesPOST(){
	var cliente = $('#group_inp').val();

	if(!/^[A-Za-z0-9 \+]*$/.test(cliente))
		return;

	$('#services-dw').html('');

	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data: {
			cliente: cliente,
			method: 'get_client_services'
		},
		success: function(data){
			console.log(data);
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

function clientesPOST(){
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/clientesController.php',
		data:{
			method: 'get_clientes'
		},
		success: function(data){
			try{
				var json_obj = jQuery.parseJSON(data);
				var clientes = [];
				
				for(i = 0; i < json_obj.length; i++){
					clientes.push(json_obj[i].razon_social);
				}
				
				$('#group_inp').autocomplete({
					source: clientes
				});
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

$(document).ready(function(){
	$('#group_inp').change(function(){
		servicesPOST();
	});
	$('#services-dw').click(function(){
		if($(this).html() == "")
			servicesPOST();
	});
	clientesPOST();
});