<?php
require_once __DIR__."\DAO.php";

class clientesDAO extends DAO{
	public function __construct(){
		parent::__construct();
	}
	
	public function get_clientes($criteria){
		$query = sprintf("SELECT * FROM clientes WHERE estatus = 1 %s ", $criteria);
		
		return $this->connector->consultar($query);
	}
	
	public function insert_cliente($criteria){
		$query = sprintf("INSERT INTO clientes VALUES (null, '%s', 1)", $criteria['razonSocial']);
		
		return $this->connector->consultar($query, false);
	}
	
	public function updateCliente($criteria){
		$query = sprintf(
		"UPDATE clientes SET razon_social = '%s' 
		WHERE id = %s", $criteria['newname'], $criteria['id']
		);
		
		return $this->connector->consultar($query, false);
	}
	
	public function deleteCliente($criteria){
		$query = sprintf(
		"UPDATE clientes SET estatus = 0
			WHERE id = %s", $criteria['id']);
			
		return $this->connector->consultar($query, false);
	}
	
	public function countClients($criteria){
		$query = sprintf("SELECT 1 FROM clientes WHERE estatus = 1 %s", $criteria);
		
		$this->connector->consultar($query, false);
		return $this->getRowsCount() + 1;
	}
	
	public function paginateClientes($criteria){
		$query = sprintf(
		"SELECT * FROM clientes 
		WHERE estatus = 1
		%s
		%s", $criteria['razonCriteria'], $criteria['limit']);
		
		return $this->connector->consultar($query);
	}
}
?>