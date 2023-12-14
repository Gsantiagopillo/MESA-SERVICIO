<?php
require "../conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$apellidoPaterno = $_POST['apellidoPaterno'];
$apellidoMaterno = $_POST['apellidoMaterno'];
$puesto = $_POST['puesto'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];
$typeUser = $_POST['tipoUsuario'];

if (isset($_POST['passw'])) {
  $passw = $_POST['passw'];
  $passw = password_hash($passw, PASSWORD_DEFAULT);
  $edit = mysqli_query($mysqli, "update  usuarios set nombre='$nombre', apellido_paterno='$apellidoPaterno', apellido_materno='$apellidoMaterno', puesto='$puesto',telefono='$telefono', correo='$correo', passw='$passw', type_user='$typeUser' where id=$id");
} else {
  $edit = mysqli_query($mysqli, "update  usuarios set nombre='$nombre', apellido_paterno='$apellidoPaterno', apellido_materno='$apellidoMaterno', puesto='$puesto',telefono='$telefono', correo='$correo', type_user='$typeUser' where id=$id");
}

$res = array(
  "err" => !$edit,
  "nombre" => $nombre,
  "apellido" => $apellidoPaterno
);

echo json_encode($res);
