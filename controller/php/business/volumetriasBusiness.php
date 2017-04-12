<?php
$parent = dirname(__DIR__);
require_once $parent."/DAO/volumetriasDAO.php";
require_once __DIR__."/basesBusiness.php";

class volumetriasBusiness{
	private $dao;
	private $baseBsns;
	
	public function __construct(){
		$this->dao = new volumetriasDAO();
		$this->baseBsns = new basesBusiness();
	}
	
	private function volumetriasToTable($results, $rowsNum, $data){
		$years = array();
		$year = 0;
		$total = 0;
		$acumulado = 0;
		$counter = 0;
		$acumuladoExced = 0;
		$counterExced = 0;
		$base_max = null;

		$base_max = $this->baseBsns->getBases($data);

		if($this->baseBsns->getRowNum() > 0)
			if($base_max[0]['cantidad'] != null or $base_max[0]['cantidad'] != "" or $base_max[0]['cantidad'] != 'ilimitado')
				$base_max = intval($base_max[0]['cantidad']);

		#Iteración por cada resultado de volumetrias
		foreach($results as $result){
			if($result['year'] != $year){
				$tag = sprintf("%s",$result['year']);
				$years[$tag] = array();
				$year = $result['year'];
				
				$acumulado = 0;
				$counter = 0;
				$acumuladoExced = 0;
				$counterExced = 0;
				array_push($years[$tag], $result['year']);
			}
			
			$tuple = array();
			$tuple['cantidad'] = $result['cantidad'];
			$tuple['month'] = $result['mes'];
			if($base_max != null){
				$tuple['exedente'] = intval($result['cantidad']) - $base_max;
				$acumuladoExced += $tuple['exedente'];
				$counterExced++;
			}
				
			array_push($years[$tag], $tuple);
			$acumulado += $result['cantidad'];
			$counter++;
			
			if($year != 0 ){
				$years[$tag]['acumulado'] = $acumulado;
				$years[$tag]['promedio'] = round($acumulado/$counter);
				
				if($base_max != null){
					$years[$tag]['acumuladoExced'] = $acumuladoExced;
					$years[$tag]['promedioExced'] = round($acumuladoExced/$counterExced);
				}
			}
		}
		
		foreach($years as $yeart){
			$total += $yeart['acumulado'];
		}
		
		$years['total'] = $total;
		#error_log(count($years), 3, __DIR__."/count_log.txt");
		return json_encode($years);
	}
	
	public function get_volumetrias($data){
		$criteria['cliente_criteria'] = sprintf(" AND v.id_cliente = (SELECT id FROM clientes WHERE razon_social = '%s') ", $data['cliente']);
		$criteria['servicio_clriteria'] = sprintf(" AND v.id_servicio = %s ", $data['servicio']);
		#Se busca información sin restricción de fechas
		$criteria['periodo_criteria'] = "";
		#Se busca información entre dos fechas
		if((isset($data['periodoi']) && isset($data['periodof'])) && ($data['periodoi'] != "" && $data['periodof'] != ""))
			$criteria['periodo_criteria'] = sprintf(" AND v.periodo BETWEEN %s AND %s ", $data['periodoi'], $data['periodof']);
		#se busca información que esté por encima de periodoi
		elseif((isset($data['periodoi']) && isset($data['periodof'])) && ($data['periodoi'] != "" && $data['periodof'] == ""))
			$criteria['periodo_criteria'] = sprintf(" AND v.periodo >= %s ", $data['periodoi']);
		#se busca información que esté por debajo de periodof
		elseif((isset($data['periodoi']) && isset($data['periodof'])) && ($data['periodoi'] == "" && $data['periodof'] != ""))
			$criteria['periodo_criteria'] = sprintf(" AND v.periodo <= %s ", $data['periodof']);
		#Obtención de resultados desde la base de datos
		$results = $this->dao->get_volumetrias($criteria);
		#En caso de no obtener nada se termina el proceso
		$rowsNum = $this->dao->getRowsCount();
		if($rowsNum <= 0){
			echo "empty";
			return;
		}
		//Crea un json que representa una tabla  que contiene los datos para desplegar en la GUI
		$years = $this->volumetriasToTable($results, $rowsNum, $data);
		
		echo $years;
	}
	
	private function volumetriasEmpresasToTable($results, $rowsNum){
		$empresas = array();
		$totals = array();
		$lastID = $results[0]['id'];
		$lastYear = $results[0]['anio'];
		$total = 0;
		$lastMonth = 0;
		
		$empresas["$lastID"] = array();
		$empresas["$lastID"]['razon_social'] = $results[0]['razon_social'];
		$empresas["$lastID"]['rfc'] = $results[0]['rfc'];
		$empresas["$lastID"]["$lastYear"] = array();
		$empresas["$lastID"]["$lastYear"]['anio'] = $lastYear;
		
		foreach($results as $row){
			if($row['id'] != $lastID){
				$lastID = $row['id'];
				$empresas["$lastID"] = array();
				$empresas["$lastID"]['razon_social'] = $row['razon_social'];
				$empresas["$lastID"]['rfc'] = $row['rfc'];
				$lastYear = $row['anio'];
				$empresas["$lastID"]["$lastYear"] = array();
				$empresas["$lastID"]["$lastYear"]['anio'] = $lastYear;
			}
			
			if($row['anio'] != $lastYear){
				$lastYear = $row['anio'];
				$empresas["$lastID"]["$lastYear"] = array();
				$empresas["$lastID"]["$lastYear"]['anio'] = $lastYear;
			}
			
			$tuple = array();
			$tuple['cantidad'] = $row['cantidad'];
			$tuple['mes'] = $row['mes'];
			array_push($empresas["$lastID"]["$lastYear"], $tuple);
		}
		
		return json_encode($empresas);
	}
	
	public function get_volumetrias_empresas($data){
		$idvolumetria = 0;
		$año = 0;
		$total = 0;
		
		$criteria['cliente_criteria'] = sprintf(" (SELECT id FROM clientes WHERE razon_social = '%s') ", $data['cliente']);
		$criteria['servicio_clriteria'] = $data['servicio'];
		
		$results = $this->dao->get_volumetrias_empresas($criteria);
		$rowsNum = $this->dao->getRowsCount();
		
		if($rowsNum <= 0){
			echo "empty";
			return;
		}
		
		echo $this->volumetriasEmpresasToTable($results, $rowsNum);
	}
}
?>