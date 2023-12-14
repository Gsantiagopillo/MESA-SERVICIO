<?php
require "../conexion.php";

$sqlusuarios = "select id, nombre, apellido_paterno, apellido_materno, puesto, telefono, correo, type_user from usuarios";
$resultusuarios = $mysqli->query($sqlusuarios);
while ($rowusuarios = $resultusuarios->fetch_assoc())   $array[] = $rowusuarios;

echo json_encode($array);
