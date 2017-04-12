<?php 
$parent = dirname(__DIR__);
require_once $parent."/DAO/clientesDAO.php";

class clientesBusiness{
	private $dao;
	
	public function __construct(){
		$this->dao = new clientesDAO();
	}
	
	public function get_clientes($data){
		$criteria = '';
		if(isset($data['cliente']) && $data['cliente'] != ''){
			$criteria = sprintf(" AND razon_social LIKE '%%%s%%'", $data['cliente']);
		}
		echo $criteria;

		echo json_encode($this->dao->get_clientes($criteria));
	}
	
	public function countClients($data){
		$criteria = '';
		if(isset($data['cliente']) && $data['cliente'] != ''){
			$criteria = sprintf(" AND razon_social LIKE '%%%s%%'", $data['cliente']);
		}
		
		echo $this->dao->countClients($criteria);
	}
	
	public function paginateClientes($data){
		$maxResults = 15;
		$criteria = array();
		$start = $maxResults * ($data['pageNum'] - 1);
		$criteria['limit'] = sprintf(" LIMIT %s, %s ", $start, $maxResults);
		
		$criteria['razonCriteria'] = '';
		if(isset($data['cliente']) && $data['cliente'] != ''){
			$criteria['razonCriteria'] = sprintf(" AND razon_social LIKE '%%%s%%'", $data['cliente']);
		}
		
		echo json_encode($this->dao->paginateClientes($criteria));
	}
	
	public function insert_cliente($data){
		echo $this->dao->insert_cliente($data);
	}
	
	public function updateCliente($data){
		echo $this->dao->updateCliente($data);
	}
	
	public function deleteCliente($data){
		echo $this->dao->deleteCliente($data);
	}
}

?>