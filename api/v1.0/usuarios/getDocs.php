<?php
require "../conexion.php";

$id = $_POST['id'];

$sqlusuario = "select * from docs where id_user= '$id'";

$resultusuario = $mysqli->query($sqlusuario);
$band = 0;
while ($rowusuario = $resultusuario->fetch_assoc()) {
  $band = 1;
  $array[] = $rowusuario;
}


if ($band == 1)
  echo json_encode($array);
else {
  $res = array(
    "err" => "false",
    "tam" => "0"
  );

  echo json_encode($res);
}
