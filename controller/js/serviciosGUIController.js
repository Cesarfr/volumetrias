var clientsNum = 0;
var currPage = 1;
var visiblePages = 15;

function serviciosPOST(){

	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data:{
			method: 'get_services',
		},
		success: function(data){
			try{
				var json_obj = jQuery.parseJSON(data);
				
				addTableElements(json_obj);
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

function addTableElements(jsonObj){
	var tBody = $('#servicio-tabla-body');
	var paginator;
	var rowClass;
	tBody.html('');
	
	for(i = 0; i < jsonObj.length; i++){
		if(i % 2 == 1)
			rowClass = '<tr class="strip-one">';
		else
			rowClass = '<tr class="strip-two">';
		
		tBody.append(
		rowClass+
			'<td>'+
			'<button type="button" class="btn btn-default btn-circle delete-btn btn-primary" title="Borrar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-minus"></i></button>'+
			'<button type="button" class="btn btn-default btn-circle modifi-btn btn-primary" title="Modificar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-pencil"></i></button>'+
			'</td>'+
			'<td class="id-col">'+jsonObj[i].id+'</td>'+
			'<td class="name-col">'+jsonObj[i].descripcion+'</td>'+
		'</tr>'
		);
	}
	
	$('.delete-btn').click(function(){
		deleteService($(this));
	});
	
	$('.modifi-btn').click(function(){
		modifiService($(this));
	});
	
	$('[data-toggle="popover"]').popover();
}

function modifiServicioPOST(newName, id){
	var modifiInput = $('.modifi-input');
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data:{
			id: id,
			newname: newName,
			method: 'modify_service'
		},
		success: function(data){
			console.log(data);
			if(data == 'exito'){
				modifiInput.parent().html(newName);
				alert('El cambio se realizó con éxito');
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function modifiService(button){
	var nombreCell = button.parent().parent().find('.name-col');
	var IDCell = button.parent().parent().find('.id-col');
	var modifiInput = $('.modifi-input');
	var nombre;
	var prev_nombre;
	var id;
	
	$('.modifi-input').each(function(){
		nombre = $(this).attr('placeholder');
		$(this).parent().html(nombre);
	});
	
	nombre = nombreCell.html();

	nombreCell.html(
	'<input class="modifi-input" type="text" value="'+nombre+'" placeholder="'+nombre+'">'
	);
	
	prev_nombre = $('.modifi-input').attr('placeholder');
	id = IDCell.html();
	
	$('.modifi-input').change(function(){
		nombre = $('.modifi-input').val();
		$('#dialog-confirm').html(
		'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>¿Está seguro de modificar este elemento?</p>'
		);
		$('#dialog-confirm').attr('title', "Modificar elemento");
		showDialogConfirmModifi(nombre, id);
	});
	$('.modifi-input').keyup(function(key){
		if(key.keyCode == 27){
			nombre = $(this).attr('placeholder');
			$(this).parent().html(nombre);
		}
	});
	$('.modifi-input').focus();
}

function cancelModifi(){
	var razon_social = $('.modifi-input').attr('placeholder');
	$('.modifi-input').parent().html(razon_social);
}

function showDialogConfirmModifi(newName, id){
	$( "#dialog-confirm" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Modificar": function() {
				modifiServicioPOST(newName, id);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				cancelModifi();
				$( this ).dialog( "close" );
			}
		}
    });
}

function deleteServicePOST(id, row){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data:{
			id: id,
			method: 'delete_service'
		},
		success: function(data){
			console.log(data);
			if(data == 'exito'){
				row.remove();
				alert('El cambio se realizó con éxito');
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function deleteService(button){
	var rowParent = button.parent().parent();
	var IDCell = button.parent().parent().find('.id-col');
	var dialog = $('#dialog-confirm');
	
	dialog.html(
	'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>¿Está seguro de eliminar este elemento?</p>'
	);
	dialog.attr('title', "Eliminar elemento");
	
	id = IDCell.html();
	
	showDialogConfirmDelete(id, rowParent);
}

function showDialogConfirmDelete(id, row){
	$( "#dialog-confirm" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Borrar": function() {
				deleteServicePOST(id, row);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				$( this ).dialog( "close" );
			}
		}
    });
}

function countPOST(){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data:{
			method: 'countClients'
		},
		success: function(data){
			clientsNum = parseInt(data);
			visiblePages = clientsNum / visiblePages;

			if(clientsNum > 0)
				clientesPOST();
			else{
				alert("No hay regitros disponibles");
				return;
			}
				
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function showDialogAdd(){
	$( "#dialog-add-client" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Agregar": function() {
				addPOST();
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				$( this ).dialog( "close" );
			}
		}
    });
}

function addPOST(){
	var nombre = $('#name').val();
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data:{
			serviceName: nombre,
			method: 'add_service'
		},
		success: function(data){
			console.log(data);
			if(data == 'exito'){
				alert("Se ha insertado con éxito un registro");
				location.reload();
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

$(document).ready(function(){
	$('#dialog-add-client').hide();
	$('#dialog-confirm').hide();
	$('.add-btn').click(function(){
		showDialogAdd();
	});
	serviciosPOST();
});