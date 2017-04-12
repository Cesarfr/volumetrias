<?php 
$parent = dirname(__DIR__);

require_once $parent."\business\serviciosBusiness.php";

$business = new serviciosBusiness();

switch($_POST['method']){
	case 'get_client_services':
		$business->get_client_services($_POST);
	break;
	case 'get_services':
		$business->get_services();
	break;
	case 'add_service':
		$business->add_service($_POST);
	break;
	case 'delete_service':
		$business->delete_service($_POST);
	break;
	case 'modify_service':
		$business->modify_service($_POST);
	break;
}

?>