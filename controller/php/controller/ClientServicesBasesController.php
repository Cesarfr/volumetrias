<?php
$parent = dirname(__DIR__);

require_once $parent."\business\ClientServicesBasesBussines.php";
require_once $parent."\business\serviciosBusiness.php";

$bussines = new ClientServicesBasesBussines();

switch($_POST['method']){
	case 'deleteDetail':
		$bussines->deleteDetail($_POST);
	break;
	case 'changeService':
		$bussines->changeService($_POST);
	break;
	case 'addClientService':
		$bussines->addClientService($_POST);
	break;
}
?>