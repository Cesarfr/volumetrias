function deleteDetails(button){
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
				deleteDetailsPOST(id, row);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				$( this ).dialog( "close" );
			}
		}
    });
}

function deleteDetailsPOST(id, row){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/ClientServicesBasesController.php',
		data:{
			id: id,
			method: 'deleteDetail'
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

function servicesPOST(value, selector){
	selector.html('');
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/serviciosController.php',
		data: {
			method: 'get_services'
		},
		success: function(data){
			var jsonObj = jQuery.parseJSON(data);
			var services = Object.values(jsonObj);
			var optionHTML = '';
			
			for(i = 0; i < services.length; i++){
				if(value == services[i].descripcion)
					optionHTML = '<option value="'+services[i].id+'" selected="selected">'+services[i].descripcion+'</option>';
				else
					optionHTML = '<option value="'+services[i].id+'">'+services[i].descripcion+'</option>';
				selector.append(optionHTML);
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error ocurred saving data");
		}
	});
}

function resetDefaultValues(inputObj){
	var defValue;
	
	inputObj.each(function(){
		defValue = $(this).attr('placeholder');
		$(this).parent().html(defValue);
	});
}

function changeValue(object, inType, objClass){
	var value = object.html();
	var selector;
	
	if(inType == 'select'){
		object.html(
		'<select class="form-control modifi-input '+objClass+'-modifi-input" id="service-selector" placeholder="'+value+'">'+
		'</select>');
		
		selector = $('#service-selector');
		servicesPOST(value, selector);
		
		return;
	}
	
	object.html(
	'<input class="'+objClass+'-modifi-input modifi-input" type="'+inType+'" value="'+value+'" placeholder="'+value+'">'
	);	
}

function aplyChanges(object, idServicio, idBase){
	var values = [];
	var newValues;
	var options = object.parent().parent().find('.options-col');
	
	options.append('<button type="button" class="btn btn-default btn-circle save-btn btn-primary" title="Guardar cambios" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-save"></i></button>');
	
	$('.save-btn').click(function(){
		$('.modifi-input').each(function(){
			console.log($(this).val());
			values.push($(this).val());
		});
		newValues = 
		{servicio:values[0], 
			base:{
				cantidad: values[1], 
				unidad: values[2], 
				vigencia: values[3]
			}
		};
		
		$('#dialog-confirm').html(
		'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>¿Está seguro de guardar los cambios?</p>'
		);
		$('#dialog-confirm').attr('title', "Guardar cambios");
		showDialogConfirmModifi(newValues, idServicio, idBase);
	});
	
	$('[data-toggle="popover"]').popover();
}

function cancelChanges(object){
	var value;
	
	object.keyup(function(key){
		if(key.keyCode == 27){
			cancelModifi();
		}
	});
}

function modifiServices(button){
	var servicio, cantidad, unidad, vigencia, id;
	var servicioCell = button.parent().parent().find('.serv-desc-col');
	var cantidadCell = button.parent().parent().find('.cantidad-col');
	var unidadCell = button.parent().parent().find('.unidad-col');
	var vigenciaCell = button.parent().parent().find('.vigencia-col');
	var IDCell = button.parent().parent().find('.id-col');
	var idServicio = button.parent().parent().find('.idservicio');
	var idBase = button.parent().parent().find('.idbase');
	var objects = [];
	var types = ['servicio', 'cantidad', 'unidad', 'vigencia'];
	var inputs = ['select', 'number', 'text', 'text'];
	var objLabels = ['.servicio-modifi-input', '.cantidad-modifi-input', '.unidad-modifi-input', '.vigencia-modifi-input'];
	var servicesLabels = [servicioCell, cantidadCell, unidadCell, vigenciaCell];
	
	for(i = 0; i < objLabels.length; i++){
		objects.push($(objLabels[i]));
		resetDefaultValues(objects[i]);
		changeValue(servicesLabels[i], inputs[i], types[i]);
		objects[i] = $(objLabels[i]);
		cancelChanges(objects[i]);
	}
	
	aplyChanges(objects[0], IDCell.html(), idBase.val());
	
	objects[0].focus();
}

function showDialogConfirmModifi(newData, idServicio, idBase){
	$( "#dialog-confirm" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Modificar": function() {
				modifyServicePOST(newData, idServicio);
				modifyBasePOST(newData, idBase);
				$( this ).dialog( "close" );
				location.reload();
			},
			"Cancelar": function() {
				cancelModifi();
				$( this ).dialog( "close" );
			}
		}
    });
}

function modifyServicePOST(newData, id){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/ClientServicesBasesController.php',
		data:{
			id: id,
			newservice: newData.servicio,
			method: 'changeService'
		},
		success: function(data){
			if(data == 'exito'){
				alert('El cambio se realizó con éxito');
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function modifyBasePOST(newData, id){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/basesController.php',
		data:{
			id: id,
			newQuantity: newData.base.cantidad,
			newUnidad: newData.base.unidad,
			newVige: newData.base.vigencia,
			method: 'modifyBase'
		},
		success: function(data){
			if(data == 'exito'){
				alert('El cambio se realizó con éxito');
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function modifyClientePOST(newName, id){
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

function cancelModifi(){
	var value;
	
	$('.modifi-input').each(function(){
		value = $(this).attr('placeholder');
		$(this).parent().html(value);
	});
	
	$('.save-btn').remove();
}

function addPOST(serviceData){
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/ClientServicesBasesController.php',
		data:{
			cantidad: serviceData[2],
			unidad: serviceData[3],
			vigencia: serviceData[4],
			cliente: serviceData[1],
			servicio: serviceData[0],
			method: 'addClientService'
		},
		success: function(data){
			console.log(data);
			if(data == 'exito'){
				alert('El cambio se realizó con éxito');
				location.reload();
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function showDialogAdd(){
	var data = [];
	var selector = $('#service-form-selector');
	servicesPOST('', selector);
	
	$( "#dialog-add" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Agregar": function() {
				$('.service-client-form-input').each(function(){
					data.push($(this).val());
				});
				
				addPOST(data);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				$( this ).dialog( "close" );
			}
		}
    });
}

$(document).ready(function(){
		$('#dialog-add').hide();
		$('#dialog-confirm').hide();
		$('.add-btn').click(function(){
			showDialogAdd();
		});
		$('.delete-btn').click(function(){
			deleteDetails($(this));
		});
		$('.modifi-btn').click(function(){
			modifiServices($(this));
		});
		$('[data-toggle="popover"]').popover();
});

