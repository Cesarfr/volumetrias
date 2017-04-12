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
	header( "Location: volumetrias.php");

$viewMaker = new ViewMaker();

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Servicios: Administración</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script  type="text/javascript" src="../controller/js/bootpage.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/volumetrias_styles.css">
	<link rel="stylesheet" href="css/servicios_styles.css">
	<script  type="text/javascript" src="../controller/js/bootstrapdatepicker.js"></script>
	<script  type="text/javascript" src="../controller/js/datepicker_controller.js"></script>
	<script  type="text/javascript" src="../controller/js/serviciosGUIController.js"></script>
	<link rel="stylesheet" href="css/bootstrapdatepicker_styles.css">
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery-form-validator/2.3.26/jquery.form-validator.min.js"></script>
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
		<h1>Servicios</h1>
		<p>Administre servicios y su información</p> 
	</div>
	<div class="container">
		<div id="dialog-confirm" title="Modificar elemento">
		</div>
		<div id="dialog-add-client" title="Añadir cliente">
			<form>
				<fieldset>
					<label for="name">Razon Social</label>
					<input type="text" name="name" id="name" placeholder="Razon social" class="text ui-widget-content ui-corner-all">
					<!-- Allow form submission with keyboard without duplicating the dialog button -->
					<input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
				</fieldset>
			</form>
		</div>
		<div class="row">
			<div class="col-sm-12" id="crud-table">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr class="blue-strip">
								<th id="tittle-cell" colspan="2">Administración de servicios</th><th>Agregar Servicio <button type="button" class="btn btn-default btn-circle add-btn"><i class="glyphicon glyphicon-plus"></i></button></th>
							</tr>
							<tr class="orange-strip">
								<th>Opciones</th><th>ID</th><th>Nombre del servicio</th>
							</tr>
						</thead>
						<tbody id="servicio-tabla-body">
						</tbody>
					</table>
					<div id="paginator-container">
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row" id="container-bar">
		<div class="col-sm-12 navbar-text navbar-static-bottom">
		</div>
	</div>
	
	<br>
	<br>
</body>
</html>