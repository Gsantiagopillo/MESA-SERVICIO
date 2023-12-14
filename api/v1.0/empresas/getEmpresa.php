<?php
require "../conexion.php";

$id = $_POST['id'];


$sqlempresa = "select * from empresas where id= '$id'";
$resultempresa = $mysqli->query($sqlempresa);
$rowempresa = $resultempresa->fetch_assoc();

echo json_encode($rowempresa);
