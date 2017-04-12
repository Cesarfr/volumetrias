<?php

$parent = dirname(__DIR__);
require_once $parent."/DAO/usuariosDAO.php";

class ViewMaker{
	public function getNavBarElements($array, $currPage){
		$elements = "";
		
		foreach($array as $element){
			$banner = explode('.', $element[0]);
			$elementURL = $element[0];
			if($element[1] != 0){
				if($element[0] == $currPage)
					$elements .= "<li class='active'><a href='$elementURL'>".ucfirst($banner[0])."</a></li>";
				else
					$elements .= "<li><a href='$elementURL'>".ucfirst($banner[0])."</a></li>";
			}
		}
		
		echo $elements;
	}
	
	public function getPrivilegios(){
		$dao = new usuariosDAO();
		$results = $dao->getPrivilegios();
		$options = '';
		
		foreach($results as $row){
			$id = $row['id'];
			$description = $row['descripcion'];
			
			$options .= '<option class="privilegios-option" value="'.$id.'">'.$description.'</option>';
		}
		
		echo $options;
	}
}

?>