<?php
require "../conexion.php";

$id = $_POST['id'];
$nombre = $_POST['nombre'];
$razonSocial = $_POST['razonSocial'];
$rfc = $_POST['rfc'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];


$edit = mysqli_query($mysqli, "update  empresas set nombre='$nombre', razon_social='$razonSocial', rfc='$rfc', direccion='$direccion',telefono='$telefono', correo='$correo' where id=$id");


$res = array(
  "err" => !$edit,
  "nombre" => $nombre
);

echo json_encode($res);
