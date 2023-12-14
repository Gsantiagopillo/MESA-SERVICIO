<?php
require "../conexion.php";



$sqlmarcas = "select * from marca_equipo order by nombre asc";

$resultmarcas = $mysqli->query($sqlmarcas);
$band = 0;
while ($rowmarcas = $resultmarcas->fetch_assoc()) {
  $band = 1;
  $array[] = $rowmarcas;
}


if ($band == 1)
  echo json_encode($array);
else {
  $res = array(
    "err" => "false",
    "tam" => "0"
  );

  echo json_encode($res);
}
