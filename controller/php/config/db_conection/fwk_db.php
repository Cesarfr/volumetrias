<?php
#error_reporting(E_ALL);
#ini_set('display_errors', '1');
//require 'HandlerError.php';

/**
 * @internal la clase conexion busca centralizar y proteger la conexion a la base de datos
 * @internal este archivo no debe ser reubicado, ni duplicado
 * @internal para hacer uso de queries favor de utilizar el archivo controllerFace.php
 * @since face 5.5 (12 de Junio del 2013)
 */

//ini_set('memory_limit', '-1'); 
class conexion {
    protected $hostname_fwk_db;
    protected $database_fwk_db;
    protected $username_fwk_db;
    protected $password_fwk_db;
    protected $fwk_db;
    protected $rst_e;
	protected $rst_c;
    protected $rows;
    protected $columns;
    protected $estado;
	protected $handler;
	private static $instance;
    /**
	 * @method __construct constructor de la clase conexion
	 * @param hostname
	 * @param database
	 * @param username
	 * @param password
	 * @return Object mysqli retorna una nueva conexion a base de datos con la api mysqli
	 */
    function __construct() {

		$this->hostname = "localhost";
		$this->database = "volumetrias";
		$this->username = "root";
		$this->password = "root";
		error_log($this->hostname);
			
		
		$this->rows    = 0;
        $this->estado  = 0;
        $this->columns = 0;
        $this->rst_c   = 0;
        $this->fwk_db  = new mysqli($this->hostname,
        							$this->username,
        							$this->password,
        							$this->database);
		$this->fwk_db->set_charset("utf8");
		if(mysqli_connect_errno()) {
            die("Error en la conexion : ".$this->fwk_db->connect_errno.
                                      "-".$this->fwk_db->connect_error);
		}
	}
	
	//Función para generar un singleton
	public static function getInstance(){
		if(!(self::$instance instanceof self))
			self::$instance = new self();
		//echo "Conexion establecida ".$this->database;
		return self::$instance;
	}
	
	public function escapeString($string)
	{
		return mysqli_real_escape_string($string);
	}

	/**
	 * @method consultar
	 * @param $query es un string que contiene la consulta a la base de datos
	 * @return array $result retorna un arreglo asociativo con la respuesta en caso de exito
	 * 		   String $msg un mensaje de error en caso de que el query no tenga exito
	 */
    function consultar($query, $banderaResult = true) {
    	$result="";
		try {
    		$this->rows = 0;
			$this->columns = 0;
			mysqli_set_charset($this->fwk_db, "utf8");
			$this->rst_c = mysqli_query($this->fwk_db,$query);
			if($this->fwk_db->errno != 0) {
				throw new Exception($this->fwk_db->error);
			}
			//error_log(print_r($this->fwk_db,TRUE));
			if($banderaResult){
				$result=$this->get_data_array();	
			}else{
				$result ="exito";
			}
			
		} catch (Exception $e) {
    		$msg= sprintf("Error: %s \n %s",$e -> getMessage(),$query);
			
			throw new Exception($msg);
			//$result =$msg;
		}
		return($result);
	}
	
	/*
	 * chs 20130624
	 * 	i	la variable correspondiente es de tipo entero
		d	la variable correspondiente es de tipo double
		s	la variable correspondiente es de tipo string
		b	la variable correspondiente es un blob y se envía en paquetes
	 * 
	 */	
	 
	 
	function insertar($query,$bindParam,$transaction=true,$transactionFin=FALSE, $isUpdate = FALSE){
		 
		$respuesta='';
		$tipoParam =array('integer'	=>	'i'
						,'string'	=>	's'
						,'double'	=>	'd'
						,'blob'		=>	'b');
						//////////////////////////////////////////////////////////////////////////
		$parametrosBind =null;
		$parametro = array();
		 $binParamCadena="";
		$queryParams=array();
		$data=$bindParam;
		try{
			//$mysqli = $this->fwk_db;
			if(!$transaction){
				$mysqli = $this->fwk_db;
				$mysqli->query("START TRANSACTION");
			}else{
				$mysqli = $this->fwk_db;
			}
				
			
			$stmt = $mysqli->prepare($query);
			if(	$mysqli->errno != 0){
				throw new Exception($mysqli->error);
			}
			
			foreach ($bindParam as $valor) {
				$binParamCadena.= $tipoParam[gettype(trim($valor))];
			};
			$queryParams[]= $binParamCadena;
			 
			foreach ($bindParam as $key => $value) {
				$queryParams[]= &$data[$key];	
			};
			call_user_func_array(array($stmt,'bind_param'),$queryParams);
			if(!$stmt->execute()){
				throw new Exception("Ejecucion corrupta, ".$stmt -> error);
			}
			$respuesta =$stmt->insert_id;
			if($isUpdate)//CHS 20131114 SI ES UPDATE OBTIENE EL NUMERO DE FILAS MODIFICADAS, EN CASO DE ESTAR ACTIVA
				$respuesta =$stmt->affected_rows;
			$stmt->close();
			if($transactionFin){
				$mysqli->commit();
				$mysqli->autocommit(TRUE);
			}
			
		}catch (Exception $e){
			$mysqli->rollback();
			$mysqli->autocommit(TRUE);
			//$this-> atomlog->error("Param bind",APPID_,$e->getMessage(),basename(__FILE__));
			throw new Exception($e->getMessage());
		}
		
		return $respuesta;
	}

    function get_rows() {
        return($this->rst_c->num_rows);
	}

    function get_columns() {
        return($this-> fwk_db-> field_count);
	}

    function getConnection() {
        return($this->fwk_db); 
	}

	/**
	 * @method get_data_array transforma un #resource resultado de un query a un arreglo asociativo 
	 * @return array $vt_aux arreglo asociativo con la respuesta del query
	 * @internal este metodo se emplea unicamente en el metodo consultar($query), no esta diseñado para usarse fuera de esta clase
	 */
	protected function get_data_array() {
        $vt_aux = array();
		while ($fila = mysqli_fetch_assoc($this->rst_c)) {
            array_push($vt_aux, $fila);
		}

        return $vt_aux;
	}
	
	public function close(){
		$this->fwk_db->close();	
	}
}

?>
