<?php
require "../conexion.php";
$id = $_POST['id'];

$delete = mysqli_query($mysqli, "delete from empresas where id ='$id'");

$res = array(
  "err" => !$delete,
  "id" => $id
);

echo json_encode($res);
