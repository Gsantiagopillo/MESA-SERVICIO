<?php
require "../conexion.php";

$id = $_POST['id'];
if (isset($_POST['allInfo']))
  $sqlusuario = "select * from usuarios where id= '$id'";
else
  $sqlusuario = "select id, nombre, apellido_paterno, apellido_materno, puesto, telefono, correo, type_user from usuarios where id= '$id'";

$resultusuario = $mysqli->query($sqlusuario);
$rowusuario = $resultusuario->fetch_assoc();
$array[] = $rowusuario;

echo json_encode($array);
