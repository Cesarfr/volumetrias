<?php 
require_once __DIR__."\DAO.php";

class usuariosDAO extends DAO{
	private $rows;
	
	public function __construct(){
		$this->rows = 0;
		parent::__construct();
	}
	
	public function getLogin($criteria){
		$query = sprintf(
		"SELECT
			U.uname,
			P.id permisoid,
			P.vista_url,
			P.acceso
		FROM usuarios U
		JOIN tipo_usuario TU
			ON U.id_tipo = TU.id
		JOIN usuarios_permisos UP
			ON TU.id = UP.id_tipo_usuario
		JOIN permisos P
			ON P.id = UP.id_permiso
		WHERE
			BINARY U.uname = '%s'
			AND U.passwd = '%s'
			AND U.estatus = 1",
			$criteria['usuario'], $criteria['passwd']
		);
		
		return $this->connector->consultar($query);
	}
	
	public function getUsuarios(){
		$query = sprintf(
		"SELECT
			U.id,
			U.uname,
			U.nombre, 
			U.appat, 
			U.apmat,
			U.email,
			TU.id idtipo,
			TU.descripcion,
			U.estatus
		FROM usuarios U
		JOIN tipo_usuario TU
			ON U.id_tipo = TU.id
		"
		);
		
		return $this->connector->consultar($query);
	}
	
	public function deleteUser($data){
		$query = sprintf(
		"UPDATE usuarios SET estatus = %s WHERE id = %s", $data['estatus'], $data['id']
		);
		
		return $this->connector->consultar($query, false);
	}
	
	public function getPrivilegios(){
		$query = "SELECT * FROM tipo_usuario where estatus = 1";
		
		return $this->connector->consultar($query);
	}
	
	public function addUser($criteria){
		$query = sprintf(
		"INSERT INTO usuarios VALUES
		(null, %s, %s, %s, %s, %s, %s, %s, 1)",
		$criteria['uname'], $criteria['email'], $criteria['passwd'], $criteria['fname'], 
		$criteria['apat'], $criteria['amat'], $criteria['privilegios']);

		return $this->connector->consultar($query, false);
	}
	
	
	public function updateUser($criteria){
		if(!$criteria['passwd'])
			$query = sprintf(
			"UPDATE usuarios SET
			uname = %s,
			email = %s,
			nombre = %s,
			appat = %s,
			apmat = %s,
			id_tipo = %s
			WHERE id = %s
			", $criteria['uname'], $criteria['email'], $criteria['fname'], 
			$criteria['apat'], $criteria['amat'], $criteria['privilegios'], $criteria['id']);
		else
			$query = sprintf(
			"UPDATE usuarios SET
			uname = %s,
			passwd = %s,
			email = %s,
			nombre = %s,
			appat = %s,
			apmat = %s,
			id_tipo = %s
			WHERE id = %s
			", $criteria['uname'], $criteria['passwd'], $criteria['email'], $criteria['fname'], 
			$criteria['apat'], $criteria['amat'], $criteria['privilegios'], $criteria['id']);
		
		return $this->connector->consultar($query, false);
	}
}

?>