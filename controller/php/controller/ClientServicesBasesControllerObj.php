<?php
$parent = dirname(__DIR__);

require_once $parent."\business\ClientServicesBasesBussines.php";

class ClientServicesBasesController{
	private $bussines;
	
	public function __construct(){
		$this->bussines = new ClientServicesBasesBussines();
	}
	
	public function GetClientDetails($data){
		$details = $this->bussines->GetClientDetails($data);
		$rowNum = $this->bussines->CountRows();
		$html = '';
		$rowClass = '';
		$count = 0;
		
		foreach($details as $detailRow){
			if(($count % 2) == 1)
				$rowClass = '<tr class="strip-one">';
			else
				$rowClass = '<tr class="strip-two">';
			
			$cantidad = isset($detailRow['cantidad']) ? $detailRow['cantidad'] : '-';
			$unidad = isset($detailRow['unidad']) ? $detailRow['unidad'] : '-';
			$vigencia_descr = isset($detailRow['vigencia_descr']) ? $detailRow['vigencia_descr'] : '-';
			
			$html .= 
			$rowClass.
				'<td class="id-col">'.$detailRow['id'].'</td>'.
				'<td class="serv-desc-col">'.$detailRow['descripcion'].'</td>'.
				'<td class="bases-info cantidad-col">'.$cantidad.'</td>'.
				'<td class="bases-info unidad-col">'.$unidad.'</td>'.
				'<td class="bases-info vigencia-col">'.$vigencia_descr.'</td>'.
				'<td class="options-col">'.
					'<input class="idservicio" type="hidden" name="idservicio" value="'.$detailRow['idservicio'].'">'.
					'<input class="idbase" type="hidden" name="idbase" value="'.$detailRow['idbase'].'">'.
					'<button type="button" class="btn btn-default btn-circle delete-btn btn-primary" title="Borrar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-minus"></i></button>'.
					'<button type="button" class="btn btn-default btn-circle modifi-btn btn-primary" title="Modificar" data-toggle="popover" data-trigger="hover"><i class="glyphicon glyphicon-pencil"></i></button>'.
				'</td>'.
			'</tr>';
			
			$count ++;
		}
		
		echo $html;
	}
}

?>