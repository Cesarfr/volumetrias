<?php
require_once __DIR__."\DAO.php";

class basesDAO extends DAO{
	private $rows;
	
	public function __construct(){
		$this->rows = 0;
		parent::__construct();
	}
	
	public function getBase($criteria){
		$query = sprintf(
		"SELECT 
			B.cantidad, 
			B.unidad, 
			B.vigencia_descr
		FROM bases B
		JOIN clientes_servicios CS
			ON CS.id_base = B.id
		WHERE
			1
			%s
			%s", $criteria['cliente_criteria'], $criteria['servicio_clriteria']);
		
		$responce = $this->connector->consultar($query);
		$this->rows = $this->connector->get_rows();
		
		return $responce;
	}
	
	public function getRowNum(){
		return $this->rows;
	}
	
	public function modifyBase($criteria){
		$query = sprintf(
		"UPDATE bases %s %s %s WHERE id=%s ", $criteria['cantidadCriteria'], $criteria['unidadCriteria'], $criteria['vigenciaCriteria'], $criteria['id']);
		
		return $this->connector->consultar($query, false);
	}
}

?>