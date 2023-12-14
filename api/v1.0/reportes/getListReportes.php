<?php
require "../conexion.php";


$sqlReportes = "select id from reportes ";
$resultReportes = $mysqli->query($sqlReportes);
$arrayReportes = [];
while ($rowReportes = $resultReportes->fetch_assoc()) {
  array_push($arrayReportes, $rowReportes);
}


$res = array(
  "err" => "false",
  "listReportes" => $arrayReportes
);
echo json_encode($res);
