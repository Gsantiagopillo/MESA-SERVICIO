<?php
require "../conexion.php";

$id = $_POST['id'];
$numSerie = $_POST['numSerie'];
$dpi = $_POST['dpi'];
$ubicacion = $_POST['ubicacion'];
$numPart = $_POST['numPart'];
$empresa = $_POST['empresa'];


$edit = mysqli_query($mysqli, "update  num_serie_equipo set num_serie='$numSerie', dpi='$dpi', ubicacion='$ubicacion', num_part='$numPart',id_empresa='$empresa' where id=$id");


$res = array(
  "err" => !$edit,
  "numserie" => $numSerie
);

echo json_encode($res);
