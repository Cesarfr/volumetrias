<?php
$parent = dirname(__DIR__);
#Headers
require_once $parent."\config\db_conection\\fwk_db.php";


class DAO{
	protected $connector;
	
	public function __construct(){
		$this->connector = conexion::getInstance();
	}
	
	public function getRowsCount(){
		return $this->connector->get_rows();
	}
}

?>