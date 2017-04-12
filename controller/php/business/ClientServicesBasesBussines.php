<?php
$parent = dirname(__DIR__);
require_once $parent."/DAO/ClientServicesBasesDAO.php";


class ClientServicesBasesBussines{
	private $dao;
	
	public function __construct(){
		$this->dao = new ClientServicesBasesDAO();
	}
	
	
	public function GetClientDetails($data){
		$criteria = sprintf(" AND CS.id_cliente = %s ", $data['idCliente']);
		
		return $this->dao->GetClientDetails($criteria);
	}
	
	public function CountRows(){
		return $this->dao->getRowsCount();
	}
	
	public function deleteDetail($data){
		echo $this->dao->deleteDetail($data['id']);
	}
	
	public function changeService($data){
		echo $this->dao->changeService($data);
	}
	
	public function addClientService($data){
		if(!isset($data['cantidad']) || $data['cantidad'] == '')
			$data['cantidad'] = 'null';
		if(!isset($data['unidad']) || $data['unidad'] == '')
			$data['unidad'] = 'null';
		else
			$data['unidad'] = sprintf("'%s'", $data['unidad']);
		if(!isset($data['vigencia']) || $data['vigencia'] == '')
			$data['vigencia'] = 'null';
		else
			$data['vigencia'] = sprintf("'%s'", $data['vigencia']);

		echo $this->dao->addClientService($data);
	}
}
?>