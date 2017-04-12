<?php
$parent = dirname(__DIR__);

require_once $parent."\business\\volumetriasBusiness.php";

$business = new volumetriasBusiness();

switch($_POST['method']){
	case 'get_volumetrias':
		$business->get_volumetrias($_POST);
	break;
	case 'get_volumetrias_empresas':
		$business->get_volumetrias_empresas($_POST);
	break;
}

?>