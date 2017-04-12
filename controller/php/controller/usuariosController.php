<?php
$parent = dirname(__DIR__);

require_once $parent."\business\usuariosBusiness.php";

$business = new usuariosBusiness();

switch($_POST['method']){
	case 'getLogin':
		$business->getLogin($_POST);
	break;
	case 'getUsuarios':
		$business->getUsuarios();
	break;
	case 'deleteUser':
		$business->deleteUser($_POST);
	break;
	case 'getPrivilegios':
		$business->getPrivilegios();
	break;
	case  'addUser':
		$business->addUser($_POST);
	break;
	case  'updateUser':
		$business->updateUser($_POST);
	break;
}

?>