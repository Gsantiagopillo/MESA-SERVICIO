<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlcliente = "select * from clientes where id= '$id'";
$resultcliente = $mysqli->query($sqlcliente);
$rowcliente = $resultcliente->fetch_assoc();

echo json_encode($rowcliente);
