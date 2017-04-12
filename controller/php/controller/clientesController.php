<?php
$parent = dirname(__DIR__);

require_once $parent."\business\clientesBusiness.php";

$business = new clientesBusiness();

switch($_POST['method']){
	case 'insert_cliente':
		$business->insert_cliente($_POST);
	break;
	case 'get_clientes':
		$business->get_clientes($_POST);
	break;
	case 'updateCliente':
		$business->updateCliente($_POST);
	break;
	case 'deleteCliente':
		$business->deleteCliente($_POST);
	break;
	case 'paginateClients':
		$business->paginateClientes($_POST);
	break;
	case 'countClients':
		$business->countClients($_POST);
	break;
}
?>