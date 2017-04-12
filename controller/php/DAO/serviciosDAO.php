<?php
require_once __DIR__."\DAO.php";

class serviciosDAO extends DAO{
	public function __construct(){
		parent::__construct();
	}
	
	public function get_client_services($criteria){
		$query = sprintf(
		"SELECT 
			S.*
		FROM servicios S
		JOIN clientes_servicios CS
			ON CS.id_servicio = S.id
		WHERE 
			CS.id_cliente = %s
			AND S.estatus = 1
			AND CS.estatus = 1", $criteria);

		$result = $this->connector->consultar($query);

		return $result;
	}
	
	public function get_services(){
		$query  = "SELECT * from servicios WHERE estatus = 1";
		
		return $this->connector->consultar($query);
	}
	
	public function add_service($serviceName){
		$query = sprintf("INSERT INTO servicios VALUES(null, '%s', 1)", $serviceName);
		
		return $result = $this->connector->consultar($query, false);
	}
	public function delete_service($id){
		$query = sprintf("UPDATE servicios SET estatus = 0 WHERE id = %s", $id);
		
		return $result = $this->connector->consultar($query, false);
	}
	
	public function modify_service($data){
		$query = sprintf("UPDATE servicios SET descripcion = '%s' WHERE id = %s", $data['newname'], $data['id']);
		
		return $result = $this->connector->consultar($query, false);
	}
}

?>