<?php
require "../conexion.php";

$sqlclientes = "select * from clientes";
$resultclientes = $mysqli->query($sqlclientes);
$array = [];
while ($rowclientes = $resultclientes->fetch_assoc())   $array[] = $rowclientes;

echo json_encode($array);
