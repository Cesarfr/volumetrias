<?php
$parent = dirname(__DIR__);

require_once $parent."\business\basesBusiness.php";

$basesbsn = new basesBusiness();

switch($_POST['method']){
	case 'modifyBase':
		$basesbsn->modifyBase($_POST);
	break;
	case 'getBases':
		$basesbsn->getBases($_POST);
	break;
}

?>