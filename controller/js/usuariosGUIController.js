var clientsNum = 0;
var currPage = 1;
var visiblePages = 15;

function usuariosPOST(){

	$.ajax({
		type:'POST',
		url:'../controller/php/controller/usuariosController.php',
		data:{
			method: 'getUsuarios',
		},
		success: function(data){
			console.log(data);
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
	var tBody = $('#usuarios-tabla-body');
	var paginator;
	var rowClass;
	var nombre;
	var appat;
	var apmat;
	var email;
	var status;
	tBody.html('');
	
	for(i = 0; i < jsonObj.length; i++){
		if(i % 2 == 1)
			rowClass = '<tr class="strip-one">';
		else
			rowClass = '<tr class="strip-two">';
		
		nombre = jsonObj[i].nombre;
		if(jsonObj[i].nombre == null)
			nombre = '-';
		
		appat = jsonObj[i].appat;
		if(jsonObj[i].appat == null)
			appat = '-';
		
		apmat = jsonObj[i].apmat;
		if(jsonObj[i].apmat == null)
			apmat = '-';
		
		email = jsonObj[i].email;
		if(jsonObj[i].email == null)
			email = '-';
		
		if(jsonObj[i].estatus == 1)
			status = '<input class="status-check" type="checkbox" value="1" checked>';
		else
			status = '<input class="status-check" type="checkbox" value="0">';
		
		tBody.append(
		rowClass+
			'<td>'+
				'<button type="button" class="btn btn-default btn-circle modifi-btn btn-primary" title="Modificar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-pencil"></i></button>'+
			'</td>'+
			'<td class="id-col">'+jsonObj[i].id+'</td>'+
			'<td class="name-col">'+jsonObj[i].uname+'</td>'+
			'<td class="nombre-col">'+nombre+'</td>'+
			'<td class="appat-col">'+appat+'</td>'+
			'<td class="apmat-col">'+apmat+'</td>'+
			'<td class="email-col">'+email+'</td>'+
			'<td class="descripcion-col">'+jsonObj[i].descripcion+' <input type="hidden" value="'+jsonObj[i].idtipo+'" class="idClass-input"></td>'+
			'<td class="estatus-col">'+status+'</td>'+
		'</tr>'
		);
	}
	
	$('.status-check').click(function(){
		deleteUser($(this));
	});
	
	$('.modifi-btn').click(function(){
		modifiUser($(this));
	});
	
	$('[data-toggle="popover"]').popover();
}

function modifiUser(button){
	var oldparent = button.parent().parent();
	var id = oldparent.find('.id-col').html();
	var uname = oldparent.find('.name-col').html();
	var fname = oldparent.find('.nombre-col').html();
	var appat = oldparent.find('.appat-col').html();
	var apmat = oldparent.find('.apmat-col').html();
	var email = oldparent.find('.email-col').html();
	var privilegios = oldparent.find('.idClass-input').val();
	
	var uname_form = $('#uname');
	var fname_form = $('#fname');
	var apat_form = $('#apat');
	var amat_form = $('#amat');
	var email_form = $('#email');
	var privilegios_form = $('.privilegios-option');
	
	uname_form.val(uname);
	
	if(fname != '-')
		fname_form.val(fname);
	if(appat != '-')
		apat_form.val(appat);
	if(apmat != '-')
		amat_form.val(apmat);
	if(email != '-')
		email_form.val(email);
	
	$('#dialog-add').attr('title', 'Modificar usuario');
	$('#passwd').attr('data-validation', 'custom');
	
	privilegios_form.each(function(){
		if($(this).is(':selected'))
			$(this).prop("selected", false);
		if($(this).val() == privilegios)
			$(this).prop("selected", true);
	});
	
	showDialogConfirmModifi(id);
}

function cancelModifi(){
	var razon_social = $('.modifi-input').attr('placeholder');
	$('.modifi-input').parent().html(razon_social);
}

function showDialogConfirmModifi(id){
	$( "#dialog-add" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Modificar": function() {
				if($('form').isValid()){
					modifiUserPOST(id);
					$( this ).dialog( "close" );
				}
			},
			"Cancelar": function() {
				$('#reset-form').click();
				$( this ).dialog( "close" );
			}
		}
    });
}

function modifiUserPOST(id){
	var uname_form = $('#uname').val();
	var passwd_form = $('#passwd').val();
	var fname_form = $('#fname').val();
	var apat_form = $('#apat').val();
	var amat_form = $('#amat').val();
	var email_form = $('#email').val();
	var privilegios_form = $('#privilegios-dw').val();
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/usuariosController.php',
		data:{
			id: id,
			uname: uname_form,
			passwd: passwd_form,
			fname: fname_form,
			apat: apat_form,
			amat: amat_form,
			email: email_form,
			privilegios: privilegios_form,
			method: 'updateUser'
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

function deleteUserPOST(id, row){
	var statusCheck = row.find('.status-check');
	var estatus = statusCheck.val();
	
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/usuariosController.php',
		data:{
			id: id,
			estatus: estatus,
			method: 'deleteUser'
		},
		success: function(data){
			if(data == '1'){
				statusCheck.prop( "checked", true);
			}
			if(data == '0'){
				statusCheck.prop( "checked", false);
			}
			statusCheck.val(data);
			//alert('El cambio se realizó con éxito');
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert('No se pudieron guardar los cambios');
		}
	});
}

function deleteUser(button){
	var rowParent = button.parent().parent();
	var IDCell = button.parent().parent().find('.id-col');
	var dialog = $('#dialog-confirm');
	
	dialog.html(
	'<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>¿Está seguro de modificar este usuario?</p>'
	);
	dialog.attr('title', "Modificar usuario");
	
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
			"Cambiar": function() {
				deleteUserPOST(id, row);
				$( this ).dialog( "close" );
			},
			"Cancelar": function() {
				$(".status-check").prop('checked', $(".status-check").is(':checked'));
				$( this ).dialog( "close" );
			}
		}
    });
}

function showDialogAdd(){
	$('#dialog-add').attr('title', 'Añadir usuario');
	$('#passwd').attr('data-validation', 'required custom');
	
	$( "#dialog-add" ).dialog({
		resizable: false,
		height: "auto",
		width: 400,
		modal: true,
		buttons: {
			"Agregar": function() {
				if($('form').isValid()){
					addPOST();
					$( this ).dialog( "close" );
				}
			},
			"Cancelar": function() {
				$('#reset-form').click();
				$( this ).dialog( "close" );
			}
		}
    });
}

function addPOST(){
	var uname = $('#uname').val();
	var passwd = $('#passwd').val();
	var fname = $('#fname').val();
	var apat = $('#apat').val();
	var amat = $('#amat').val();
	var email = $('#email').val();
	var privilegios = $('#privilegios-dw').val();
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/usuariosController.php',
		data:{
			uname: uname,
			passwd: passwd,
			fname: fname,
			apat: apat,
			amat: amat,
			email: email,
			privilegios: privilegios,
			method: 'addUser'
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
	$('#dialog-add').hide();
	$('#dialog-confirm').hide();
	$('.add-btn').click(function(){
		showDialogAdd();
	});
	usuariosPOST();
});