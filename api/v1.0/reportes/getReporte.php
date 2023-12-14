<?php
require "../conexion.php";

$idReporte = $_POST['idReporte'];
$idFormato = $_POST['idFormato'];
$idUsuario;

$arrayRes = [];

$sqlReporte = "select * from reportes where id=$idReporte and id_formato=$idFormato";
$resultReporte = $mysqli->query($sqlReporte);
$rowReporte = $resultReporte->fetch_assoc();

$arrayRes = array_merge($arrayRes, $rowReporte);

$sqlFormato = "select * from formato where id=$idFormato";
$resultFormato = $mysqli->query($sqlFormato);
$rowFormato = $resultFormato->fetch_assoc();

array_shift($rowFormato);

$idUsuario = $rowFormato['id_user'];

$arrayRes = array_merge($arrayRes, $rowFormato);

$idDiagnostico = $rowFormato['id_diagnostico'];
$sqlDiag = "select * from acts_diagnostico where id=$idDiagnostico";
$resultDiag = $mysqli->query($sqlDiag);
$rowDiag = $resultDiag->fetch_assoc();

array_shift($rowDiag);

$arrayRes = array_merge($arrayRes, $rowDiag);

$idPrev = $rowFormato['id_preventivas'];
$sqlPrev = "select limpieza,revision,avance_papel,avance_ribbon,mecanismo_rodillo,revision_sensores, configuracion as configuracion_optima from acts_preventivo where id=$idPrev";
$resultPrev = $mysqli->query($sqlPrev);
$rowPrev = $resultPrev->fetch_assoc();

$arrayRes = array_merge($arrayRes, $rowPrev);

$idCorrect = $rowFormato['id_correctivas'];
$sqlCorrect = "select cabezal as cm_cabezal,rodillo as cm_rodillo,banda as cm_banda,sensor_ribbon,sensor_papel,mother as cm_mother,fuente as cm_fuente,otro as cm_otro from acts_correctivo where id=$idCorrect";
$resultCorrect = $mysqli->query($sqlCorrect);
$rowCorrect = $resultCorrect->fetch_assoc();

$arrayRes = array_merge($arrayRes, $rowCorrect);

$sqlEtiAntes = "select url from img_etiqueta_antes where id_formato=$idFormato";
$resultEtiAntes = $mysqli->query($sqlEtiAntes);
$arrayEtiAntes = [];
while ($rowEtiAntes = $resultEtiAntes->fetch_assoc()) {
  $arrayEtiAntes[] = $rowEtiAntes;
}
$sqlEtiDespues = "select url from img_etiqueta_despues where id_formato=$idFormato";
$resultEtiDespues = $mysqli->query($sqlEtiDespues);
$arrayEtiDespues = [];
while ($rowEtiDespues = $resultEtiDespues->fetch_assoc()) {
  $arrayEtiDespues[] = $rowEtiDespues;
}
$sqlEquipoAntes = "select url from img_limpieza_antes where id_formato=$idFormato";
$resultEquipoAntes = $mysqli->query($sqlEquipoAntes);
$arrayEquipoAntes = [];
while ($rowEquipoAntes = $resultEquipoAntes->fetch_assoc()) {
  $arrayEquipoAntes[] = $rowEquipoAntes;
}
$sqlEquipoDespues = "select url from img_limpieza_despues where id_formato=$idFormato";
$resultEquipoDespues = $mysqli->query($sqlEquipoDespues);
$arrayEquipoDespues = [];
while ($rowEquipoDespues = $resultEquipoDespues->fetch_assoc()) {
  $arrayEquipoDespues[] = $rowEquipoDespues;
}
$sqlFirma = "select url from img_firma where id_formato=$idFormato";
$resultFirma = $mysqli->query($sqlFirma);
$rowFirma = $resultFirma->fetch_assoc();

$sqlUsuario = "select nombre, apellido_paterno,apellido_materno from usuarios where id=$idUsuario";
$resultUsuario = $mysqli->query($sqlUsuario);
$rowUsuario = $resultUsuario->fetch_assoc();


$res = array(
  "err" => "false",
  "listReportes" => $arrayRes,
  "EtiAntes" => $arrayEtiAntes,
  "EtiDespues" => $arrayEtiDespues,
  "EquipoAntes" => $arrayEquipoAntes,
  "EquipoDespues" => $arrayEquipoDespues,
  "firma" => $rowFirma['url'],
  "usuario" => $rowUsuario
);
echo json_encode($res);
