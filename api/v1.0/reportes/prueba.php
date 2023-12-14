<?php
ob_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>HOLA MUNDO</h1>
</body>

</html>

<?php
$html = ob_get_clean();

require_once './libreria/dompdf/autoload.inc.php';

use Dompdf\Dompdf;

$dompdf = new Dompdf();

$options = $dompdf->getOptions();
$options->set(array('isRemoteEnabled' => true));
$dompdf->setOptions($options);

$dompdf->loadHtml($html);

$dompdf->setPaper('letter');

$dompdf->render();

$output = $dompdf->output();

file_put_contents('../../../documentos/reportes/reporte_' . 'pruebaa_Original' . '.pdf', $output);

//$dompdf->stream("./reporte.pdf", array("Attachment" => true));


?>