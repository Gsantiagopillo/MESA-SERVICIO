<?php
require "../conexion.php";
$nombre = $_POST['nombre'];
$idEmpresa = $_POST['empresa'];
$apellidoPaterno = $_POST['apellidoPaterno'];
$apellidoMaterno = $_POST['apellidoMaterno'];
$puesto = $_POST['puesto'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];


$insert = mysqli_query($mysqli, "insert into clientes(id_empresa, nombre, apellido_paterno, apellido_materno, puesto,telefono, correo) values ('$idEmpresa','$nombre','$apellidoPaterno','$apellidoMaterno','$puesto','$telefono','$correo')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre,
  "apellido" => $apellidoPaterno
);

echo json_encode($res);
