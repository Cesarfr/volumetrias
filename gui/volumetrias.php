<?php
$parent = dirname(__DIR__);
require_once $parent."/controller/php/config/constantes.php";
require_once $parent."/config/ViewMaker.php";

$index = INDEX;
session_start();
if(!isset($_SESSION['active']) || !$_SESSION['active'])
	header( "Location: ../");

$url = basename($_SERVER['PHP_SELF']);

if(!isset($_SESSION['access']["$url"]))
	header( "Location: ../");

$viewMaker = new ViewMaker();

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Volumetrias: Visualización</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/volumetrias_styles.css">
	<script type="text/javascript" src="../controller/js/clientesController.js"></script>
	<script type="text/javascript" src="../controller/js/bootstrapdatepicker.js"></script>
	<script type="text/javascript" src="../controller/js/datepicker_controller.js"></script>
	<link rel="stylesheet" href="css/bootstrapdatepicker_styles.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-form-validator/2.3.26/jquery.form-validator.min.js"></script>
	<script type="text/javascript" src="../controller/js/volumetriasController.js"></script>
</head>
<body>
	<nav class="navbar navbar-inverse">
	  <div class="container-fluid">
		<div class="navbar-header">
		  <a class="navbar-brand" href="#">
			<div>
				<img alt="Brand" src="./img/masnegocio_.png" width="130" height="70" style="padding-bottom:23px;">
			</div>
		  </a>
		</div>
		<ul class="nav navbar-nav">
		  <?php
			$viewMaker->getNavBarElements($_SESSION['pages'], basename($_SERVER['PHP_SELF']));
		  ?>
		</ul>
		<ul class="nav navbar-nav navbar-right">
			<li><a href="logout.php" id="logout"><i class="glyphicon glyphicon-log-out"></i> Cerrar sesión</a></li>
		</ul>
	  </div>
	</nav>
	<div class="jumbotron text-center">
		<div id="form_container">
			<div class="row">
				<div class="col-2">
					<img src="./img/panal.png" width="204" height="145" style="float:right; margin-right:40px;">
				</div>
				<div class="col-10">
					<h1>Volumetrias</h1>
					<p>Obtenga el cálculo de sus volumetrias de forma rápida y sencilla</p> 
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row">
			<!--Formulario para filtrar volúmenes-->
			<div class="col-sm-2">
				<div id="form_container">
					<form>
						<div id="form_container" class="form-group row">
							<label for="group_inp">Cliente</label>
							<input type="text" id="group_inp" class="form-control" placeholder="Buscar una empresa" 
							data-validation="required custom"
							data-validation-regexp="^([A-Za-z \+áéíóú])*$"
							data-validation-error-msg="El valor ingresado no es válido"
							data-validation-error-msg-required="El campo es obligatorio">
							
							<input type="hidden" id="clientid-input"
							data-validation="required alphanumeric"
							data-validation-error-msg="Solo se permiten letras y números">
						</div>
						<div id="form_container" class="form-group row">
							<label for="sel1">Servicios:</label>
							<select class="form-control" id="services-dw" data-validation="required" 
							data-validation-error-msg="Seeccione un elemento de la lista">
							</select>
						</div>
						<div class="form-group row">
							<label for="periodoi" class="col-2 col-form-label">Periodo</label>
							<div class="col-10">
								<div class="form-group">
									<input type="text" id="periodoi" class="form-control form-control-2 input-sm to" placeholder="desde">
								</div>
							</div>
							<label for="periodof" class="col-2 col-form-label">a</label>
							<div class="col-10">
								<div class="form-group">
									<input type="text" id="periodof" class="form-control form-control-2 input-sm to" placeholder="hasta">
								</div>
							</div>
						</div>
						<div class="form-group row">
							<button id="filtra-sbt" type="submit" class="btn btn-default">Filtrar</button>
						</div>
					</form>
				</div>
			</div>
			<div id="empresas-periodo-container" class="col-sm-10">
				<!--Empieza tabla de empresas y cálculos individuales-->
				<div class="row">
					<div id="empresas-container" class="col-sm-11">
					</div>
				</div>
				<!--Empieza tabla de volumetrías por periodos. Esta tabla se llena por medio de javascript-->
				<div class="row">
					<div id="volumetrias-container-0" class='col-sm-12'>
						<div id="message-div">
							<h4 class="message-table-header">Realice una búsqueda</h4>
							<i class='glyphicon glyphicon-list message-table-image'></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="row" id="container-bar">
		<div class="col-sm-12 navbar-text navbar-static-bottom">
		</div>
	</div>
</body>
</html>