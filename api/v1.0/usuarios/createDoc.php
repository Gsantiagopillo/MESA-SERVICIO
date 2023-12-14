<?php
require "../conexion.php";
if (isset($_FILES["file"])) {
  $name = $_FILES["file"]["name"];
  $file = $_FILES["file"]["tmp_name"];
  $error = $_FILES["file"]["error"];
  $destination = "../../../docs-files/$name";
  $upload = move_uploaded_file($file, $destination);

  $idUser = $_POST['idUser'];

  $destino = "docs-files/$name";
  $insert = mysqli_query($mysqli, "insert into docs(id_user, nombre, url) values ('$idUser','$name','$destino')");

  if ($upload && $insert) {
    $res = array(
      "err" => false,
      "status" => http_response_code(200),
      "statusText" => "Archivo $name subido con éxito",
      "files" => $_FILES["file"] //esto no es necesario
    );
  } else {
    $res = array(
      "err" => true,
      "status" => http_response_code(400),
      "statusText" => "Error al subir el archivo $name",
      "files" => $_FILES["file"],
      "insert" => $insert
    );
  }

  echo json_encode($res);
}
