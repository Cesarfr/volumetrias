<?php
$parent = dirname(__DIR__);
require_once $parent."/DAO/usuariosDAO.php";

session_start();

class usuariosBusiness{
	private $dao;
	
	public function __construct(){
		$this->dao = new usuariosDAO();
	}

	public function getLogin($data){
		$data['passwd'] = hash('sha256', $data['passwd']);
		
		$result = $this->dao->getLogin($data);
		$rows = count($result);
		
		if($rows > 0){
			$_SESSION['uname'] = $result[0]['uname'];
			$_SESSION['active'] = true;
			$_SESSION['pages'] = array();
			$_SESSION['access'] = array();
			
			foreach($result as $row){
				array_push($_SESSION['pages'], array($row['vista_url'], $row['acceso']));
				$url = $row['vista_url'];
				$_SESSION['access']["$url"] = $url;
			}
			
			echo "succes";
		}
		else
			echo "failure";
	}
	
	public function getUsuarios(){
		echo json_encode($this->dao->getUsuarios());
	}
	
	public function deleteUser($data){
		$data['estatus'] = $data['estatus'] ^ 1;
		error_log(print_r($data, true), 3, __DIR__."/estatus_log.txt");
		if($this->dao->deleteUser($data) == "exito")
			echo $data['estatus'];
	}
	
	public function getPrivilegios(){
		return $this->dao->getPrivilegios();
	}
	
	public function addUser($data){
		$criteria = $this->getInsertCriteria($data);
		
		echo $this->dao->addUser($criteria);
	}
	
	public function updateUser($data){
		$criteria = $this->getInsertCriteria($data);
		
		echo $this->dao->updateUser($criteria);
	}
	
	private function getInsertCriteria($data){
		if(!isset($data['uname']) || $data['uname'] == '')
			$data['uname'] = 'null';
		else
			$data['uname'] = sprintf("'%s'", $data['uname']);
		
		if(!isset($data['fname']) || $data['fname'] == '' || $data['fname'] == '-')
			$data['fname'] = 'null';
		else
			$data['fname'] = sprintf("'%s'", $data['fname']);
		
		if(!isset($data['apat']) || $data['apat'] == '' || $data['apat'] == '-')
			$data['apat'] = 'null';
		else
			$data['apat'] = sprintf("'%s'", $data['apat']);
		
		if(!isset($data['amat']) || $data['amat'] == '' || $data['amat'] == '-')
			$data['amat'] = 'null';
		else
			$data['amat'] = sprintf("'%s'", $data['amat']);
		
		if(!isset($data['email']) || $data['email'] == '' || $data['email'] == '-')
			$data['email'] = 'null';
		else
			$data['email'] = sprintf("'%s'", $data['email']);
		
		if(!isset($data['passwd']) || $data['passwd'] == '')
			$data['passwd'] = false;
		else
			$data['passwd'] =sprintf("'%s'", hash('sha256', $data['passwd']));
		
		return $data;
	}
}
?>
