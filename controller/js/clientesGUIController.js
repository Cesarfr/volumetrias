var clientsNum = 0;
var currPage = 1;
var maxVisiblePages = 15;
var visiblePages = 0;

function clientesPOST(){
	var clientName = $('#group_inp').val();
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/clientesController.php',
		data:{
			cliente: clientName,
			method: 'paginateClients',
			pageNum: currPage
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

function toDetails(button){
	var IDCell = button.parent().parent().find('.id-col');
	var razonCell = button.parent().parent().find('.name-col');
	var id, razonSocial;
	
	id = IDCell.html();
	razonSocial = razonCell.html();
	
	window.location = "clientes_detalles.php?idCliente="+id+"&Cliente="+razonSocial;
}

function addTableElements(jsonObj){
	var tBody = $('#empresa-tabla-body');
	var paginator;
	var rowClass;
	tBody.html('');
	$('#paginator-container').html('');
	
	for(i = 0; i < jsonObj.length; i++){
		if(i % 2 == 1)
			rowClass = '<tr class="strip-one">';
		else
			rowClass = '<tr class="strip-two">';
		
		tBody.append(
		rowClass+
			'<td>'+
				'<button type="button" class="btn btn-default btn-circle delete-btn btn-primary" title="Eliminar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-minus"></i></button>'+
				'<button type="button" class="btn btn-default btn-circle modifi-btn btn-primary" title="Modificar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-pencil"></i></button>'+
				'<button type="button" class="btn btn-default btn-circle details-btn btn-primary" title="Detalles" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-eye-open"></i></button>'+
			'</td>'+
			'<td class="id-col">'+jsonObj[i].id+'</td>'+
			'<td class="name-col">'+jsonObj[i].razon_social+'</td>'+
		'</tr>'
		);
	}
	
	$('.delete-btn').click(function(){
		deleteClient($(this));
	});

	$('.modifi-btn').click(function(){
		modifiCliente($(this));
	});
	
	$('.details-btn').click(function(){
		toDetails($(this));
	});
	
	$('[data-toggle="popover"]').popover();
	
	paginator = $('#paginator-container').bootpag({
		total: visiblePages,
		page: currPage,
		maxVisible: 15
	});
	
	paginator.unbind();
	paginator.on('page', function(event, num){
		currPage = num;
		clientesPOST();
	});
}

function modifiClientePOST(newName, id){
	var modifiInput = $('.modifi-input');
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/clientesController.php',
		data:{
			id: id,
			newname: newName,
			method: 'updateCliente'
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

function modifiCliente(button){
	var razonCell = button.parent().parent().find('.name-col');
	var IDCell = button.parent().parent().find('.id-col');
	var modifiInput = $('.modifi-input');
	var razon_social;
	var prev_razon_social;
	var id;
	
	$('.modifi-input').each(function(){
		razon_social = $(this).attr('placeholder');
		$(this).parent().html(razon_social);
	});
	
	razon_social = razonCell.html();

	razonCell.html(
	'<input class="modifi-input" type="text" value="'+razon_social+'" placeholder="'+razon_social+'">'
	);
	
	prev_razon_social = $('.modifi-input').attr('placeholder');
	id = IDCell.html();
	
	$('.modifi-input').change(function(){
		razon_social = $('.modifi-input').val();
		$('#dialog-confirm').html(
		'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>¿Está seguro de modificar este elemento?</p>'
		);
		$('#dialog-confirm').attr('title', "Modificar elemento");
		showDialogConfirmModifi(razon_social, id);
	});
	$('.modifi-input').keyup(function(key){
		if(key.keyCode == 27){
			razon_social = $(this).attr('placeholder');
			$(this).parent().html(razon_social);
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
				modifiClientePOST(newName, id);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				cancelModifi();
				$( this ).dialog( "close" );
			}
		}
    });
}

function deleteClientePOST(id, row){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/clientesController.php',
		data:{
			id: id,
			method: 'deleteCliente'
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

function deleteClient(button){
	var rowParent = button.parent().parent();
	var IDCell = button.parent().parent().find('.id-col');
	var dialog = $('#dialog-confirm');
	
	console.log(rowParent);
	
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
				deleteClientePOST(id, row);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				$( this ).dialog( "close" );
			}
		}
    });
}

function countPOST(){
	var clientName = $('#group_inp').val();
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/clientesController.php',
		data:{
			cliente: clientName,
			method: 'countClients'
		},
		success: function(data){
			clientsNum = parseInt(data);
			visiblePages = Math.round(clientsNum / maxVisiblePages);

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
	var razon_social = $('#name').val();
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/clientesController.php',
		data:{
			razonSocial: razon_social,
			method: 'insert_cliente'
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

function clientesAutoConpletePOST(){
	
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

