/*
Autor: Trejo Pérez Yahuitl Tonatiu, Mas Negocio
Fecha de creación: 15/03/2017
Descripción: El presente script permite controlar el despiegue de información de las volumetrías que se obtiene de la base de datos de volumetrias
*/

var servicesCounter = 0;
var consultaTerminada = false;
var totals = [];
var totalColumns = 0;
/*
Esta función realiza una petición ajax para obtener los datos de las volumetrias, luego despliega la información en la vista
*/
function volumetriasPOST(event){
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
			notPrint: true,
			method:'get_volumetrias'
		},
		success: function(data){
			//Despliegue de información en la vista
			
			if(data == "empty"){
				$('#volumetrias-container-'+servicesCounter).hide();
				alert("No se encontraron registros");
				return;
			}
			//try{
				FillTable(data);
				consultaTerminada = true;
			//}catch(err){
			//	alert("Error del servidor, contacte con el administrador. " + err.message);
			//}
			try{
				basePOST(event);
				volumetriasEmpresasPOST(event);
			}catch(err){
				console.log(err.message);
			}
		},
		//En caso de error se informa al usuario
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("Error ocurred saving data");
		}
	});
}

function FillTable(data){
	//Conversión del string a objeto
	var json_obj = jQuery.parseJSON(data);		
	//Conversión del objeto a array de objetos
	var years = Object.values(json_obj);

	var hasExced = years[0][1].hasOwnProperty('exedente');

	if(hasExced)
		CreateTableBodyExced(years);
	else
		CreateTableBodyNoExced(years);
}

function addMonthsToBody(values){
	var TBody = $('#t'+servicesCounter+'-body');
	for(j = 1; j <= (values.length - 3); j++){
		if(values[j].month == 1){
			TBody.append(
			"<tr id='jan-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Enero</th>"+
			"</tr>");
		}
		if(values[j].month == 2){
			TBody.append(
			"<tr id='feb-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Febrero</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 3){
			TBody.append(
			"<tr id='march-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Marzo</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 4){
			TBody.append(
			"<tr id='apr-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Abril</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 5){
			TBody.append(
			"<tr id='may-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Mayo</th>"+
			"</tr>");
		}
		if(values[j].month == 6){
			TBody.append(
			"<tr id='jun-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Junio</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 7){
			TBody.append(
			"<tr id='jul-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Julio</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 8){
			TBody.append(
			"<tr id='augs-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Agosto</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 9){
			TBody.append(
			"<tr id='sept-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Septiembre</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 10){
			TBody.append(
			"<tr id='oct-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Octubre</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 11){
			TBody.append(
			"<tr id='novm-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Noviembre</th>"+
			"</tr>"
			);
		}
		if(values[j].month == 12){
			TBody.append(
			"<tr id='dec-row-"+servicesCounter+"'>"+
				"<th class='blue-strip'>Diciembre</th>"+
			"</tr>"
			);
		}
	}
	
	TBody.append(
	"<tr id='acum-row-"+servicesCounter+"' class='orange-strip'>"+
		"<th>Acumulado</th>"+
	"</tr>"+
	"<tr id='prom-row-"+servicesCounter+"' class='orange-strip'>"+
		"<th>Promedio</th>"+
	"</tr>"+
	"<tr id='tot-row-"+servicesCounter+"' class='total-end'>"+
		"<th>Total</th>"+
	"</tr>"
	);
}

function addAllMonthsToBody(){
	var TBody = $('#t'+servicesCounter+'-body');
	TBody.html(
	"<tr id='jan-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Enero</th>"+
	"</tr>"+
	"<tr id='feb-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Febrero</th>"+
	"</tr>"+
	"<tr id='march-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Marzo</th>"+
	"</tr>"+
	"<tr id='apr-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Abril</th>"+
	"</tr>"+
	"<tr id='may-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Mayo</th>"+
	"</tr>"+
	"<tr id='jun-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Junio</th>"+
	"</tr>"+
	"<tr id='jul-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Julio</th>"+
	"</tr>"+
	"<tr id='augs-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Agosto</th>"+
	"</tr>"+
	"<tr id='sept-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Septiembre</th>"+
	"</tr>"+
	"<tr id='oct-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Octubre</th>"+
	"</tr>"+
	"<tr id='novm-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Noviembre</th>"+
	"</tr>"+
	"<tr id='dec-row-"+servicesCounter+"'>"+
		"<th class='blue-strip'>Diciembre</th>"+
	"</tr>"+
	"<tr id='acum-row-"+servicesCounter+"' class='orange-strip'>"+
		"<th>Acumulado</th>"+
	"</tr>"+
	"<tr id='prom-row-"+servicesCounter+"' class='orange-strip'>"+
		"<th>Promedio</th>"+
	"</tr>"+
	"<tr id='tot-row-"+servicesCounter+"' class='total-end'>"+
		"<th>Total</th>"+
	"</tr>");
}

function FillTableNoExced(values){
	var yearRow = $('#year-row-'+servicesCounter);
	var acumRow = $('#acum-row-'+servicesCounter);
	var promRow = $('#prom-row-'+servicesCounter);
	
	var janRow = $('#jan-row-'+servicesCounter);
	var febRow = $('#feb-row-'+servicesCounter);
	var marchRow = $('#march-row-'+servicesCounter);
	var aprRow = $('#apr-row-'+servicesCounter);
	var mayRow = $('#may-row-'+servicesCounter);
	var junRow = $('#jun-row-'+servicesCounter);
	var julRow = $('#jul-row-'+servicesCounter);
	var augsRow = $('#augs-row-'+servicesCounter);
	var septRow = $('#sept-row-'+servicesCounter);
	var octRow = $('#oct-row-'+servicesCounter);
	var novmRow = $('#novm-row-'+servicesCounter);
	var decRow = $('#dec-row-'+servicesCounter);
	
	var monthCounter = 1;
	//Se agrega el año correspondiente como cabecera
	yearRow.append("<th>" + values[0] + "</th>");
	for(j = 0; j < 12; j++){
		var amount;
		
		if(values[monthCounter].month == (j + 1)){
			var q = values[monthCounter].cantidad;
			amount = "<td class='commas'>" + q + "</td>";
			monthCounter++;
		}else{
			amount = "<td></td>";
		}
		
		switch((j + 1)){
			case 1:
				janRow.append(amount);
			break;
			case 2:
				febRow.append(amount);
			break;
			case 3:
				marchRow.append(amount);
			break;
			case 4:
				aprRow.append(amount);
			break;
			case 5:
				mayRow.append(amount);
			break;
			case 6:
				junRow.append(amount);
			break;
			case 7:
				julRow.append(amount);
			break;
			case 8:
				augsRow.append(amount);
			break;
			case 9:
				septRow.append(amount);
			break;
			case 10:
				octRow.append(amount);
			break;
			case 11:
				novmRow.append(amount);
			break;
			case 12:
				decRow.append(amount);
			break;
		}
	}
	//Se agregan los acumulados y los promedios
	acumRow.append("<td class='commas'>" + values[values.length - 2] + "</td>");
	promRow.append("<td class='commas'>" + values[values.length - 1] + "</td>");
}

function FillTableExced(values){
	var yearRow = $('#year-row-'+servicesCounter);
	var acumRow = $('#acum-row-'+servicesCounter);
	var promRow = $('#prom-row-'+servicesCounter);
	var cantidadExcedenteRow = $('#cantidad-excedente-row-'+servicesCounter);
	
	var janRow = $('#jan-row-'+servicesCounter);
	var febRow = $('#feb-row-'+servicesCounter);
	var marchRow = $('#march-row-'+servicesCounter);
	var aprRow = $('#apr-row-'+servicesCounter);
	var mayRow = $('#may-row-'+servicesCounter);
	var junRow = $('#jun-row-'+servicesCounter);
	var julRow = $('#jul-row-'+servicesCounter);
	var augsRow = $('#augs-row-'+servicesCounter);
	var septRow = $('#sept-row-'+servicesCounter);
	var octRow = $('#oct-row-'+servicesCounter);
	var novmRow = $('#novm-row-'+servicesCounter);
	var decRow = $('#dec-row-'+servicesCounter);
	
	var monthCounter = 1;
	//Se agrega el año correspondiente como cabecera
	yearRow.append("<th colspan='2' style='text-align:center;'>" + values[0] + "</th>");
	cantidadExcedenteRow.append(
	"<th class='blue-strip'>Cantidad</th>"+
	"<th class='orange-strip'>Excedente</th>"
	);
	for(j = 0; j < 12; j++){
		var cantidad;
		var excedente;
		
		if(values[monthCounter].month == (j + 1)){
			cantidad = "<td class='commas'>" + values[monthCounter].cantidad + "</td>";
			
			if(parseInt(values[monthCounter].exedente) > 0)
				excedente = "<td bgColor='#ff6868' class='commas'>" + values[monthCounter].exedente + "</td>";
			else if(parseInt(values[monthCounter].exedente) < 0)
				excedente = "<td bgColor='#bef49f' class='commas'>" + values[monthCounter].exedente + "</td>";
			else
				excedente = "<td>" + values[monthCounter].exedente + "</td>";
			
			monthCounter++;
		}else{
			cantidad = "<td></td>";
			excedente = "<td></td>";
		}
		
		switch((j + 1)){
			case 1:
				janRow.append(cantidad);
				janRow.append(excedente);
			break;
			case 2:
				febRow.append(cantidad);
				febRow.append(excedente);
			break;
			case 3:
				marchRow.append(cantidad);
				marchRow.append(excedente);
			break;
			case 4:
				aprRow.append(cantidad);
				aprRow.append(excedente);
			break;
			case 5:
				mayRow.append(cantidad);
				mayRow.append(excedente);
			break;
			case 6:
				junRow.append(cantidad);
				junRow.append(excedente);
			break;
			case 7:
				julRow.append(cantidad);
				julRow.append(excedente);
			break;
			case 8:
				augsRow.append(cantidad);
				augsRow.append(excedente);
			break;
			case 9:
				septRow.append(cantidad);
				septRow.append(excedente);
			break;
			case 10:
				octRow.append(cantidad);
				octRow.append(excedente);
			break;
			case 11:
				novmRow.append(cantidad);
				novmRow.append(excedente);
			break;
			case 12:
				decRow.append(cantidad);
				decRow.append(excedente);
			break;
		}
	}
	//Se agregan los acumulados y los promedios
	acumRow.append("<td class='commas'>" + values[values.length - 4] + "</td>");
	
	if(values[values.length - 2] > 0)
		acumRow.append("<td bgColor='#fc4949' class='commas'>" + values[values.length - 2] + "</td>");
	else if(values[values.length - 2] < 0)
		acumRow.append("<td bgColor='#abf780' class='commas'>" + values[values.length - 2] + "</td>");
	else
		acumRow.append("<td>" + values[values.length - 2] + "</td>");
	
	promRow.append("<td class='commas'>" + values[values.length - 3] + "</td>");
	
	if(values[values.length - 1] > 0)
		promRow.append("<td bgColor='#fc4949' class='commas'>" + values[values.length - 1] + "</td>");
	else if(values[values.length - 1] < 0)
		promRow.append("<td bgColor='#abf780' class='commas'>" + values[values.length - 1] + "</td>");
	else
		promRow.append("<td>" + values[values.length - 1] + "</td>");
}

function numberWithCommas(){
	    $('.commas').each(function(){
			$(this).html($(this).html().replace(/\B(?=(?:\d{3})+(?!\d))/g, ","));
		});
}

function CreateTableBodyNoExced(years){
	var serviceName = $('#service-hdr-'+servicesCounter);
	var añoHead = $('#año-head-'+servicesCounter);
	var totRow;
	
	var values;
	serviceName.html($('#services-dw option:selected').text());
	//Creación del cuerpo de la tabla
	if((years.length - 1) > 1){
		addAllMonthsToBody();
		for(i = 0; i < (years.length - 1); i++){
			values = Object.values(years[i]);
			FillTableNoExced(values);
		}
	}else if((years.length - 1) == 1){
		values = Object.values(years[0]);
		addMonthsToBody(values);
		FillTableNoExced(values);
	}
	
	totRow = $('#tot-row-'+servicesCounter);
	totalColumns = i + 1;
	serviceName.attr('colspan', ''+(i + 1)+'');
	añoHead.attr('colspan', ''+i+'');
	totRow.append("<td colspan='"+i+"' style='text-align:right'><b class='commas'>" + years[years.length - 1] + "</b></td>");
	numberWithCommas();
}

function CreateTableBodyExced(years){
	var yearRow = $('#year-row-'+servicesCounter);
	var serviceName = $('#service-hdr-'+servicesCounter);
	var añoHead = $('#año-head-'+servicesCounter);
	var mesHead = $('#mes-head-'+servicesCounter);
	var tablehead = $('#table-head-'+servicesCounter);
	
	var cantidadExcedenteRow;
	var values;
	var totRow;
	
	tablehead.append(
	"<tr id='cantidad-excedente-row-"+servicesCounter+"'>"+
	"</tr>");
	mesHead.attr('rowspan', '3');
	
	serviceName.html($('#services-dw option:selected').text());
	//Creación del cuerpo de la tabla
	
	if((years.length - 1) > 1){
		addAllMonthsToBody();
		for(i = 0; i < (years.length - 1); i++){
			values = Object.values(years[i]);
			FillTableExced(values);
		}
	}else if((years.length - 1) == 1){
		values = Object.values(years[0]);
		addMonthsToBody(values);
		FillTableExced(values);
		var i = 1;
	}
	
	totalColumns = ((i * 2) + 1);

	serviceName.attr('colspan', ''+((i*2) + 1)+'');
	añoHead.attr('colspan', ''+(i*2)+'');
	//Agregación del total de los acumulados
	totRow = $('#tot-row-'+servicesCounter);
	totRow.append("<td colspan='"+(i*2)+"' style='text-align:right'><b class='commas'>" + years[years.length - 1] + "</b></td>");
	numberWithCommas();
}

function createTable(){
	var container = $('#volumetrias-container-'+servicesCounter);
	//Se vacía la tabla antes de volverla a llenar. Esto permite el dinamismo en la vista
	container.html("");
	
	if(servicesCounter == 0){
		var button = 
		"<h4>Servicios"+
			"<button id='add-btn' type='button' class='btn btn-default btn-circle' title='Añadir tabla' data-toggle='popover' data-trigger='hover'><i class='glyphicon glyphicon-plus'></i></button>"+
			"<button id='reset-btn' type='button' class='btn btn-default btn-circle' title='Limpiar todo' data-toggle='popover' data-trigger='hover'><i class='glyphicon glyphicon-refresh'></i></button>"+
		"</h4>";
		container.append(button);
		$('#add-btn').click(function(){
			addServiceTable();
		});
		$('#reset-btn').click(function(){
			location.reload();
		});
		$('[data-toggle="popover"]').popover();
	}
	
	container.append(
	"<div class='table-responsive'>"+
		"<table class='table'>"+
			"<thead id='table-head-"+servicesCounter+"'>"+
				"<tr id='empresa-tabla-tittle' class='blue-strip'>"+
					"<th id='service-hdr-"+servicesCounter+"' colspan='4' style='text-align:center'></th>"+
				"</tr>"+
				"<tr id='empresa-tabla-headers'>"+
					"<th id='mes-head-"+servicesCounter+"' rowspan='2' style='text-align:center' class='orange-strip'>Mes</th>"+
					"<th id='año-head-"+servicesCounter+"' colspan='3' style='text-align:center' class='orange-strip'>Año</th>"+
				"</tr>"+
				"<tr id='year-row-"+servicesCounter+"' class='blue-strip'>"+
				"</tr>"+
			"</thead>"+
			"<tbody id='t"+servicesCounter+"-body'>"+
			"</tbody>"+
		"</table>"+
	"</div>"
	);
	
	container.hide();
	return container;
}

function addServiceTable(){
	if($('#group_inp').val() === ''){
		alert('Primero seleccione un cliente');
		return;
	}
	if(!consultaTerminada){
		alert('No se puede generar otra consulta hasta que termine con la actual');
		return;
	}

	var tableBody;
	
	consultaTerminada = false;
	servicesCounter++;
	tableBody = "t"+servicesCounter+"-body";
		
	$('#group_inp').prop("readonly", true);
	$('#group_inp').off("click");
	
	$('#empresas-periodo-container').append(
	"<div class='row'>"+
		"<div id='volumetrias-container-"+servicesCounter+"' class='col-sm-12'>"+
			'<div id="message-div">'+
				'<h4 class="message-table-header">Realice una búsqueda</h4>'+
				'<i class="glyphicon glyphicon-list message-table-image"></i>'+
			'<div>'+
		"</div>"+
	"</div>");
	
	$('#periodoi').val('');
	$('#periodof').val('');
	alert('Se ha agregado una tabla nueva');
}

function addInfoToTable(json_obj){
	var tBody = $('#t'+servicesCounter+'-body');
	var headerSize = totalColumns - 3;
	var cantidad;
	
	cantidad = json_obj.cantidad;
	if(json_obj.cantidad == null)
		cantidad = "Ilimitado";
	else
		cantidad = cantidad.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
	
	tBody.append(
	'<tr class="info-row-content">'+
		'<th class="info-row" colspan="'+headerSize+'">Base</th>'+
		'<td class="info-row">'+cantidad+'</td>'+
		'<td class="info-row">'+json_obj.unidad+'</td>'+
		'<td class="info-row">'+json_obj.vigencia_descr+'</td>'+
	'</tr>'
	);
}

function basePOST(){
	event.preventDefault();
	var cliente = $('#group_inp').val();
	var servicio = $('#services-dw').val();
	
	$.ajax({
		type:'POST',
		url:'../controller/php/controller/basesController.php',
		data:{
			cliente: cliente,
			servicio: servicio,
			method: 'getBases'
		},
		success: function(data){
			try{
				var json_obj = jQuery.parseJSON(data);
				if(!jQuery.isEmptyObject(json_obj[0]))
					addInfoToTable(json_obj[0]);
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

function createEmpresasTable(){
	var empresasContainer = $('#empresas-container');
	empresasContainer.html(
	'<h4>Volumetrías por empresa  <button id="show-empresas-btn" type="button" class="btn btn-primary btn-xs"><i class="glyphicon glyphicon-chevron-down"></i></button></h4>'+
	'<div id="empresas-table-container" class="table-responsive">'+
		'<table class="table">'+
			'<thead>'+
				'<tr id="empresa-tabla-header-years" class="blue-strip">'+
					'<th colspan="2"></th>'+
				'</tr>'+
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
	var anio = Object.values(empresas[0]);

	for(x = 0; x < (anio.length - 2); x++){
		var periodo = Object.values(anio[x]);
		
		$('#empresa-tabla-header-years').append(
		'<th colspan="'+ (periodo.length - 1) +'" style="text-align:center;">' + anio[x].anio + '</th>'
		);
		
		for(y = 0; y < (periodo.length - 1); y++){
			totals.push(0);
			if(periodo[y].mes == 1){
				EmpresasHeader.append(
				'<th>Enero</th>');
			}
			if(periodo[y].mes == 2){
				EmpresasHeader.append(
				'<th>Febrero</th>');
			}
			if(periodo[y].mes == 3){
				EmpresasHeader.append(
				'<th>Marzo</th>');
			}
			if(periodo[y].mes == 4){
				EmpresasHeader.append(
				'<th>Abril</th>');
			}
			if(periodo[y].mes == 5){
				EmpresasHeader.append(
				'<th>Mayo</th>');
			}
			if(periodo[y].mes == 6){
				EmpresasHeader.append(
				'<th>Junio</th>');
			}
			if(periodo[y].mes == 7){
				EmpresasHeader.append(
				'<th>Julio</th>');
			}
			if(periodo[y].mes == 8){
				EmpresasHeader.append(
				'<th>Agosto</th>');
			}
			if(periodo[y].mes == 9){
				EmpresasHeader.append(
				'<th>Septiembre</th>');
			}
			if(periodo[y].mes == 10){
				EmpresasHeader.append(
				'<th>Octubre</th>');
			}
			if(periodo[y].mes == 11){
				EmpresasHeader.append(
				'<th>Noviembre</th>');
			}
			if(periodo[y].mes == 12){
				EmpresasHeader.append(
				'<th>Diciembre</th>');
			}
		}
	}
	
	for(i = 0; i < empresas.length; i++){
		var registros = Object.values(empresas[i]);
		var content = '';
		
		content = 
		'<tr class="content-row orange-strip">' +
			'<td>' + empresas[i].razon_social + '</td>'+
			'<td>' + empresas[i].rfc + '</td>';

		for(j = 0; j < (registros.length - 2); j++){
			var periodo = Object.values(registros[j]);
			for(k = 0; k < (periodo.length -1); k++){
				content += '<td class="value-col commas">'+periodo[k].cantidad+'</td>';
			}
		}
		
		content += '</tr>';
		EmpresastBody.append(content);
	}

	getEmpresasTotals();
	$('#empresas-container').show();
	$('#empresas-table-container').hide();
	$('#show-empresas-btn').click(function(){
		showHide($(this));
	});
}

function showHide(button){
	$('#empresas-table-container').show(800);
	
	button.html(
		'<i class="glyphicon glyphicon-chevron-up"></i>'
	);
	
	button.off("click");
	button.click(function(){
		button.html(
			'<i class="glyphicon glyphicon-chevron-down"></i>'
		);
		$('#empresas-table-container').hide(800);
		button.off("click");
		button.click(function(){
			showHide(button);
		});
	});
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
				//$('#empresas-container').hide();
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

$(document).ready(function(){
	$('#group_inp').click(function(){
		$('#services-dw').html('');
	});
	$('#empresas-container').hide();
	$('form').submit(function(event){
		if($(this).isValid()){
			event.preventDefault();
			var container = createTable();
			//Petición ajax y llenado de la tabla
			volumetriasPOST(event);
			container.show();
			var empresasContainer = $('#empresas-container');
			empresasContainer.html('');
			$('html body').animate({scrollTop:$('#volumetrias-container-'+servicesCounter ).offset().top}, 'slow');
		}		
	});
});