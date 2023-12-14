<?php
require "../conexion.php";
$nombre = $_POST['nombre'];
$apellidoPaterno = $_POST['apellidoPaterno'];
$apellidoMaterno = $_POST['apellidoMaterno'];
$puesto = $_POST['puesto'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$passw = $_POST['passw'];
$typeUser = $_POST['tipoUsuario'];

$passw = password_hash($passw, PASSWORD_DEFAULT);

$insert = mysqli_query($mysqli, "insert into usuarios(nombre, apellido_paterno, apellido_materno, puesto,telefono, correo, passw, type_user) values ('$nombre','$apellidoPaterno','$apellidoMaterno','$puesto','$telefono','$correo','$passw','$typeUser')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre,
  "apellido" => $apellidoPaterno
);

echo json_encode($res);
