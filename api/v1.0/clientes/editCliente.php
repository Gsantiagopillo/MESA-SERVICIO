<?php
require "../conexion.php";

$idCliente = $_POST['idCliente'];
$nombre = $_POST['nombre'];
$idEmpresa = $_POST['empresa'];
$apellidoPaterno = $_POST['apellidoPaterno'];
$apellidoMaterno = $_POST['apellidoMaterno'];
$puesto = $_POST['puesto'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];

$edit = mysqli_query($mysqli, "update  clientes set id_empresa='$idEmpresa', nombre='$nombre', apellido_paterno='$apellidoPaterno', apellido_materno='$apellidoMaterno', puesto='$puesto',telefono='$telefono', correo='$correo' where id=$idCliente ");

$edit = array(
  "err" => !$edit,
  "nombre" => $nombre,
  "apellido" => $apellidoPaterno
);

echo json_encode($edit);
