<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlEquipo = "select * from num_serie_equipo where id= '$id'";
$resultEquipo = $mysqli->query($sqlEquipo);
$rowEquipo = $resultEquipo->fetch_assoc();

echo json_encode($rowEquipo);
