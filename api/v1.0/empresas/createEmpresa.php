<?php
require "../conexion.php";
$nombre = $_POST['nombre'];
$razonSocial = $_POST['razonSocial'];
$rfc = $_POST['rfc'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$correo = $_POST['correo'];


$insert = mysqli_query($mysqli, "insert into empresas(nombre, razon_social, rfc, direccion,telefono, correo) values ('$nombre','$razonSocial','$rfc','$direccion','$telefono','$correo')");

$res = array(
  "err" => !$insert,
  "nombre" => $nombre,
  "razonSocial" => $razonSocial
);

echo json_encode($res);
