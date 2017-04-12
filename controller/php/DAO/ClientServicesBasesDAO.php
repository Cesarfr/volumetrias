<?php
require_once __DIR__."\DAO.php";

class ClientServicesBasesDAO extends DAO{
	public function __construct(){
		parent::__construct();
	}
	
	public function GetClientDetails($criteria){
		$query = sprintf(
		"SELECT 
			CS.id,
			B.id idbase,
			B.cantidad,
			B.unidad,
			B.vigencia_descr,
			S.id idservicio,
			S.descripcion
		FROM clientes_servicios CS
		LEFT JOIN bases B
			ON CS.id_base = B.id 
				AND B.estatus = 1
		LEFT JOIN servicios S
			ON CS.id_servicio = S.id 
				AND S.estatus = 1
		LEFT JOIN clientes C
			ON CS.id_cliente = C.id 
				AND C.estatus = 1
		WHERE
			CS.estatus = 1
			%s", $criteria);
		
		return $this->connector->consultar($query);
	}
	
	public function deleteDetail($criteria){
		$query = sprintf(
		"UPDATE clientes_servicios CS SET CS.estatus = 0 WHERE CS.id = %s", $criteria);
		
		return $this->connector->consultar($query, false);
	}
	
	public function changeService($data){
		$query = sprintf("UPDATE clientes_servicios CS SET CS.id_servicio = %s WHERE CS.id = %s", $data['newservice'], $data['id']);
		
		return $this->connector->consultar($query, false);
	}
	
	public function addClientService($data){
		$query = sprintf("CALL InsertBaseForClient(%s, %s, %s, %s, %s, null, null);", 
		$data['cantidad'], $data['unidad'], $data['vigencia'], $data['cliente'], $data['servicio']);

		return $this->connector->consultar($query, false);
	}
}
?>