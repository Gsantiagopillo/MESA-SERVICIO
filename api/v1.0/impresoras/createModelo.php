<?php
require "../conexion.php";
$modelo = $_POST['modelo'];
$marca = $_POST['idMarca'];


$insert = mysqli_query($mysqli, "insert into modelo_equipo(id_marca, nombre) values ('$marca','$modelo')");

$res = array(
  "err" => !$insert,
  "modelo" => $modelo,
);

echo json_encode($res);
