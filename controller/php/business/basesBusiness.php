<?php
$parent = dirname(__DIR__);
require_once $parent."/DAO/basesDAO.php";

class basesBusiness{
	private $dao;
	
	public function __construct(){
		$this->dao = new basesDAO();
	}
	
	public function getBases($data){
		$criteria = array();
		
		$criteria['cliente_criteria'] = "";
		if(isset($data['cliente']) && $data['cliente'] != "")
			$criteria['cliente_criteria'] = sprintf(" AND CS.id_cliente = (SELECT id FROM clientes WHERE razon_social = '%s') ", $data['cliente']);
		
		$criteria['servicio_clriteria'] = "";
		if(isset($data['servicio']) && $data['servicio'] != "")
			$criteria['servicio_clriteria'] = sprintf(" AND CS.id_servicio = %s ", $data['servicio']);
		
		if(isset($data['notPrint']))
			return $this->dao->getBase($criteria);
		
		echo json_encode($this->dao->getBase($criteria));
	}
	
	public function getRowNum(){
		return $this->dao->getRowNum();
	}
	
	public function modifyBase($data){
		$criteria = array();
		$cantidad = $data['newQuantity'] == "" ? 'null': $data['newQuantity'];
		
		
		$criteria['cantidadCriteria'] = sprintf(" SET cantidad = %s, ", $cantidad);
		$criteria['unidadCriteria'] = sprintf(" unidad = '%s', ", $data['newUnidad']);
		$criteria['vigenciaCriteria'] = sprintf(" vigencia_descr = '%s' ", $data['newVige']);
		$criteria['id'] = $data['id'];
		
		echo $this->dao->modifyBase($criteria);
	}
}
?>