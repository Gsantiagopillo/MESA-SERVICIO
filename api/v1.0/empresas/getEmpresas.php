<?php
require "../conexion.php";

$sqlempresas = "select * from empresas order by nombre asc";
$resultempresas = $mysqli->query($sqlempresas);
$array = [];
while ($rowempresas = $resultempresas->fetch_assoc())   $array[] = $rowempresas;

echo json_encode($array);
