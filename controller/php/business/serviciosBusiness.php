<?php
$parent = dirname(__DIR__);
require_once $parent."/DAO/serviciosDAO.php";


class serviciosBusiness{
	private $dao;
	
	public function __construct(){
		$this->dao = new serviciosDAO();
	}
	
	public function get_services(){
		echo json_encode($this->dao->get_services());
	}
	
	public function get_client_services($data){
		$criteria = sprintf("(SELECT id FROM clientes WHERE razon_social = '%s')", $data['cliente']);
		echo json_encode($this->dao->get_client_services($criteria));
	}
	
	public function add_service($data){
		
		echo $this->dao->add_service($data['serviceName']);
	}
	
	public function delete_service($data){
		echo $this->dao->delete_service($data['id']);
	}
	
	public function modify_service($data){
		echo $this->dao->modify_service($data);
	}
	
}
?>