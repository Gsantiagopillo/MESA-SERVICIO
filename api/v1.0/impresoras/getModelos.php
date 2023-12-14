<?php
require "../conexion.php";

$sqlmodelos = "select * from modelo_equipo  order by id_marca asc";

$resultmodelos = $mysqli->query($sqlmodelos);
$band = 0;
while ($rowmodelos = $resultmodelos->fetch_assoc()) {
  $band = 1;
  $array[] = $rowmodelos;
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
