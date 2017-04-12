<?php
$parent = dirname(__DIR__);
require_once $parent."/controller/php/config/constantes.php";
require_once $parent."/config/ViewMaker.php";

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
	<script  type="text/javascript" src="../controller/js/usuariosGUIController.js"></script>
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
		<h1>Usuarios</h1>
		<p>Administre usuarios del aplicativo</p> 
	</div>
	<div class="container">
		<div id="dialog-confirm" title="Modificar elemento">
		</div>
		<div id="dialog-add" title="Añadir usuario">
			<form>
				<fieldset>
					<div class="form-group row">
						<label for="uname">Usuario</label>
						<input type="text" name="uname" id="uname" placeholder="Nombre de usuario" class="text ui-widget-content ui-corner-all"
						data-validation="required alphanumeric"
						data-validation-error-msg-required="El campo es obligatorio"
						data-validation-error-msg="Solo se permiten letras y números">
					</div>
					
					<div class="form-group row" id="passwd-group">
						<label for="passwd">Contraseña</label>
						<input type="password" name="passwd" id="passwd" class="text ui-widget-content ui-corner-all" placeholder="Password" 
									data-validation="required custom"
									data-validation-regexp="^((\.?#?\$?\\?\/?\*?\}?(\w)*)*)$"
									data-validation-error-msg="La contraseña no es válida"
									data-validation-error-msg-required="El campo es obligatorio">
					</div>
					
					<div class="form-group row">
						<label for="fname">Nombre(s)</label>
						<input type="text" name="fname" id="fname" placeholder="Nombre(s)" class="text ui-widget-content ui-corner-all"
						data-validation="custom"
						data-validation-regexp="^([A-Za-z áéíóú])*$"
						data-validation-error-msg="El nombre no es válido">
					</div>
					
					<div class="form-group row">
						<label for="apat">Apellido paterno</label>
						<input type="text" name="apat" id="apat" placeholder="Apellido paterno" class="text ui-widget-content ui-corner-all"
						data-validation="custom"
						data-validation-regexp="^([A-Za-z áéíóú])*$"
						data-validation-error-msg="El apellido paterno no es válido">
					</div>
					
					<div class="form-group row">
						<label for="amat">Apellido materno</label>
						<input type="text" name="amat" id="amat" placeholder="Apellido materno" class="text ui-widget-content ui-corner-all"
						data-validation="custom"
						data-validation-regexp="^([A-Za-z áéíóú])*$"
						data-validation-error-msg="El apellido materno no es válido">
					</div>
					
					<div class="form-group row">
						<label for="email">Email</label>
						<input type="text" name="email" id="email" placeholder="Correo electrónico" class="text ui-widget-content ui-corner-all"
						data-validation="email">
					</div>
					
					<div class="form-group row">
						<label for="privilegios-dw">Privilegios</label>
						<select name="privilegios-dw" class="text ui-widget-content ui-corner-all" id="privilegios-dw" data-validation="required" 
							data-validation-error-msg="Seeccione un elemento de la lista">
							<?php $viewMaker->getPrivilegios(); ?>
						</select>
					</div>

					<!-- Allow form submission with keyboard without duplicating the dialog button -->
					<input id="submit-form" type="submit" tabindex="-1" style="position:absolute; top:-1000px">
					<input id="reset-form" type="reset" value="Reset form" style="display:none;">
				</fieldset>
			</form>
		</div>
		<div class="row">
			<div class="col-sm-12" id="crud-table">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr class="blue-strip">
								<th id="tittle-cell" colspan="8">Administración de Usuarios</th><th>Agregar Usuario <button type="button" class="btn btn-default btn-circle add-btn"><i class="glyphicon glyphicon-plus"></i></button></th>
							</tr>
							<tr class="orange-strip">
								<th>Opciones</th><th>ID</th><th>Usuario</th><th>Nombre</th><th>Apellido paterno</th><th>Apellido materno</th><th>email</th><th>Privilegios</th><th>Activo</th>
							</tr>
						</thead>
						<tbody id="usuarios-tabla-body">
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