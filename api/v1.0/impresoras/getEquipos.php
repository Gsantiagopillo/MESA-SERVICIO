<?php
require "../conexion.php";

$sqlequipos = "select * from num_serie_equipo ";

$resultequipos = $mysqli->query($sqlequipos);
$band = 0;
while ($rowequipos = $resultequipos->fetch_assoc()) {
  $band = 1;
  $array[] = $rowequipos;
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
