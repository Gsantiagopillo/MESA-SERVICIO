<?php
require "../conexion.php";
$marca = $_POST['marca'];


$insert = mysqli_query($mysqli, "insert into marca_equipo(nombre) values ('$marca')");

$res = array(
  "err" => !$insert,
  "marca" => $marca,
);

echo json_encode($res);
