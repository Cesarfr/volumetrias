var totals = [];

function volumetriasEmpresasPOST(){
	event.preventDefault();
	var cliente = $('#group_inp').val();
	var servicio = $('#services-dw').val();
	var periodoi = $('#periodoi').val().replace("/", "");
	var periodof = $('#periodof').val().replace("/", "");
	//Petición ajax enviando loas datos necesarios
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/volumetriasController.php',
		data:{
			cliente:cliente,
			servicio:servicio,
			periodoi:periodoi,
			periodof:periodof,
			method:'get_volumetrias_empresas'
		},
		success: function(data){
			//Despliegue de información en la vista
			//console.log(data);
			if(data == "empty"){
				$('#empresas-container').hide();
				return;
			}
			try{
				createEmpresasTable();
				fillEmpresaTable(data);
			}catch(err){
				console.log("Error del servidor, contacte con el administrador. " + err.message);
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error ocurred saving data");
		}
	});
}

function createEmpresasTable(){
	var empresasContainer = $('#empresas-container');
	empresasContainer.html(
	'<h4>Volumetrías por empresa</h4>'+
	'<div class="table-responsive">'+
		'<table class="table">'+
			'<thead>'+
				'<tr id="empresa-tabla-header" class="blue-strip">'+
					'<th>Razón social</th>'+
					'<th>RFC</th>'+
				'</tr>'+
			'</thead>'+
			'<tbody id="empresa-tabla-body">'+
			'</tbody>'+
		'</table>'+
	'</div>'
	);
}

function fillEmpresaTable(data){
	var EmpresastBody = $('#empresa-tabla-body');
	var EmpresasHeader = $('#empresa-tabla-header');
	//Conversión del string a objeto
	var json_obj = jQuery.parseJSON(data);		
	//Conversión del objeto a array de objetos
	var empresas = Object.values(json_obj);
	totals = [];
	
	for(i = 0; i < empresas.length; i++){
		var registros = Object.values(empresas[i]);
		
		if(i == 0){
			for(j = 0; j < registros[0].length; j++){
				totals.push(0);
				if(registros[0][j][0] == 1){
					EmpresasHeader.append(
					'<th>Enero</th>');
				}
				if(registros[0][j][0] == 2){
					EmpresasHeader.append(
					'<th>Febrero</th>');
				}
				if(registros[0][j][0] == 3){
					EmpresasHeader.append(
					'<th>Marzo</th>');
				}
				if(registros[0][j][0] == 4){
					EmpresasHeader.append(
					'<th>Abril</th>');
				}
				if(registros[0][j][0] == 5){
					EmpresasHeader.append(
					'<th>Mayo</th>');
				}
				if(registros[0][j][0] == 6){
					EmpresasHeader.append(
					'<th>Junio</th>');
				}
				if(registros[0][j][0] == 7){
					EmpresasHeader.append(
					'<th>Julio</th>');
				}
				if(registros[0][j][0] == 8){
					EmpresasHeader.append(
					'<th>Agosto</th>');
				}
				if(registros[0][j][0] == 9){
					EmpresasHeader.append(
					'<th>Septiembre</th>');
				}
				if(registros[0][j][0] == 10){
					EmpresasHeader.append(
					'<th>Octubre</th>');
				}
				if(registros[0][j][0] == 11){
					EmpresasHeader.append(
					'<th>Noviembre</th>');
				}
				if(registros[0][j][0] == 12){
					EmpresasHeader.append(
					'<th>Diciembre</th>');
				}
			}
		}
		
		var content = '';
		
		for(j = 0; j < registros[0].length; j++){
			content += '<td class="value-col commas">'+registros[0][j][1]+'</td>';
		}
		
		EmpresastBody.append(
		"<tr class='content-row orange-strip'>"+
			'<td>'+registros[2]+'</td>'+
			'<td>'+registros[3]+'</td>'+
			content+
		"</tr>"
		);
	}
	
	getEmpresasTotals();
	$('#empresas-container').show();
}

function getEmpresasTotals(){
	var rows = $('.content-row');
	var EmpresastBody = $('#empresa-tabla-body');
	var rowTotals = '';
	
	rows.each(function(){
		$(this).find('.value-col').each(function(i){
			totals[i] += parseInt($(this).html());
		});
	});
	
	for(i = 0; i < totals.length; i++){
		rowTotals += '<td class="content-row total-end commas">'+totals[i]+'</td>';
	}
	
	EmpresastBody.append(
	'<tr>'+
		'<td colspan="2" class="total-end"><b>Totales</b></td>'+
		rowTotals+
	'</tr>'
	);
	numberWithCommas();
}