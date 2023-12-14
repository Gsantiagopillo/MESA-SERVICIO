<?php
require "../conexion.php";
$id = $_POST['id'];


$sqldoc = "select nombre from docs where id= '$id'";

$resultdoc = $mysqli->query($sqldoc);
$rowdoc = $resultdoc->fetch_assoc();
$nombre = $rowdoc['nombre'];
unlink("../../../docs-files/$nombre");

$delete = mysqli_query($mysqli, "delete from docs where id ='$id'");

$res = array(
  "err" => !$delete,
  "id" => $id,
  "nombre" => $rowdoc
);

echo json_encode($res);
