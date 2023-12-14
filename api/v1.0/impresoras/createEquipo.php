<?php
require "../conexion.php";
$modelo = $_POST['modelo'];
$numSerie = $_POST['numSerie'];
$dpi = $_POST['dpi'];
$width = $_POST['width'];
$empresa = $_POST['idEmpresa'];



$insert = mysqli_query($mysqli, "insert into num_serie_equipo(id_modelo, num_serie, dpi, width,id_empresa,ibicacion,num_part) values ('$modelo','$numSerie','$dpi','$width','$empresa','','')");

$res = array(
  "err" => !$insert,
  "equipo" => $numSerie,
);

echo json_encode($res);
