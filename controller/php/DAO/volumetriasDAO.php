<?php
require_once __DIR__."\DAO.php";

class volumetriasDAO extends DAO{
	public function __construct(){
		parent::__construct();
	}
	
	public function get_volumetrias($criteria){	
		$query = sprintf("
		SELECT
			v.cantidad, 
			v.mes, 
			v.anio year
		FROM
			volumetrias v
		WHERE
			1
			%s
			%s
			%s
			AND v.id_empresa is null
			AND v.estado = 1
		ORDER BY anio, mes", $criteria['cliente_criteria'], $criteria['servicio_clriteria'], $criteria['periodo_criteria']);
		
		return $this->connector->consultar($query);
	}
	
	public function get_volumetrias_empresas($criteria){
		$query = sprintf(
		"SELECT
			E.id,
			E.rfc,
			E.razon_social,
			V.cantidad,
			V.anio, 
			V.mes
		FROM volumetrias V
			JOIN empresas E
		ON V.id_empresa = E.id
		WHERE V.id_cliente = %s
			AND V.id_servicio = %s
			AND V.id_empresa is not null
		ORDER BY V.id_empresa, V.anio, V.mes", 
		$criteria['cliente_criteria'], 
		$criteria['servicio_clriteria']
		);
		
		error_log($query."\n", 3, __DIR__."/query_log.txt");
		
		return $this->connector->consultar($query);
	}
}
?>