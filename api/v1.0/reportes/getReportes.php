 <?php
  require "../conexion.php";


  $arrayReportes = array();
  $arrayFormatos = array();

  $condicion1 = "";
  $condicion2 = "";
  $arrayRes = [];

  if (isset($_POST['idReporte'])) {
    $reporte = $_POST['idReporte'];
    $condicion1 = "where id=$reporte";
  }

  if (isset($_POST['idEmpresa'])) {
    $empresa = $_POST['idEmpresa'];
    $condicion2 = "where id_empresa='$empresa'";
    if (isset($_POST['idEquipo'])) {
      $equipo = $_POST['idEquipo'];
      $condicion2 = $condicion2 . " and id_equipo='$equipo' ";
    }
  } else {
    if (isset($_POST['idEquipo'])) {
      $equipo = $_POST['idEquipo'];
      $condicion2 = "where id_equipo='$equipo' ";
    }
  }



  $sqlReportes = "select * from reportes order by id desc";
  $sqlReportes = $sqlReportes . $condicion1;
  $resultReportes = $mysqli->query($sqlReportes);
  $arrayReportes = [];
  while ($rowReportes = $resultReportes->fetch_assoc()) {
    $arrayReportes[] = $rowReportes;
  }

  if (count($arrayReportes) > 0) {

    foreach ($arrayReportes as $el) {
      $condicion3 = "";

      if ($condicion2 === "") {
        $condicion3 = "where id=" . $el['id_formato'];
      } else {
        $condicion3 = $condicion2 . " and id=" . $el['id_formato'];
      }

      $sqlFormato = "select id as id_formato, id_empresa,id_equipo,fecha from formato ";
      $sqlFormato = $sqlFormato . $condicion3;
      $resultFormato = $mysqli->query($sqlFormato);
      $rowFormato = $resultFormato->fetch_assoc();
      if ($rowFormato != null) {

        $arrayAux = array_merge($el, $rowFormato);
        array_push($arrayRes, $arrayAux);
      }
    }


    $res = array(
      "err" => "false",
      "condicion2" => $condicion2,
      "reportes" => $arrayRes
    );
    echo json_encode($res);
  } else {
    $res = array(
      "err" => "false",
      "reportes" => $arrayReportes
    );
    echo json_encode($res);
  }


  ?>