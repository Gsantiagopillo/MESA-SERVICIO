 <?php


  require '../conexion.php';

  $idreporte = $_POST['idReporte'];

  $sqlreport = "select * from reportes where id='$idreporte'";
  $resultreport = $mysqli->query($sqlreport);
  $rowreport = $resultreport->fetch_assoc();

  $idFormato = $rowreport['id_formato'];
  $idUser = $rowreport['id_user'];

  $sqlFormato = "select * from reportes where id='$idFormato'";
  $resulFormato = $mysqli->query($sqlFormato);
  $rowFormato = $resultFormato->fetch_assoc();

  $sqluserpdf = "select * from usuarios where id='$idUser'";
  $resultuserpdf = $mysqli->query($sqluserpdf);
  $rowuserpdf = $resultuserpdf->fetch_assoc();

  $pdfuser = $rowuserpdf['nombre'];
  $pdfuser = $pdfuser . " " . $rowuserpdf['apellido_paterno'];
  $pdfuser = $pdfuser . " " . $rowuserpdf['apellido_materno'];

  $id_empresa = $rowFormato['id_empresa'];

  $sqlempresapdf = "select nombre,direccion,contrato from empresas where id='$id_empresa'";
  $resultempresapdf = $mysqli->query($sqlempresapdf);
  $rowempresapdf = $resultempresapdf->fetch_assoc();

  $pdfempresa = $rowempresapdf['nombre'];
  $pdfcontrato = $rowempresapdf['contrato'] === "" ? "-" : $rowempresapdf['contrato'];
  $pdfdireccion = $rowempresapdf['direccion'];

  $id_cliente = $rowFormato['id_cliente'];

  $sqlclientepdf = "select * from clientes where id='$id_cliente'";
  $resultclientepdf = $mysqli->query($sqlclientepdf);
  $rowclientepdf = $resultclientepdf->fetch_assoc();

  $pdfcliente = $rowclientepdf['nombre'];
  $pdfcliente = $pdfcliente . " " . $rowclientepdf['apellido_paterno'];
  $pdfcliente = $pdfcliente . " " . $rowclientepdf['apellido_materno'];

  $pdftelefono = $rowclientepdf['telefono'];
  $pdfcorreo = $rowclientepdf['correo'];

  $sqlformatopdf = "select diagnostico,preventivo,correctivo,notas,comentarios,periocidad,fecha_sig from formato where id='$id_formato'";
  $resultformatopdf = $mysqli->query($sqlformatopdf);
  $rowformatopdf = $resultformatopdf->fetch_assoc();

  $pdfdiagnostico = $rowformatopdf['diagnostico'];
  $pdfpreventivo = $rowformatopdf['preventivo'];
  $pdfcorrectivo = $rowformatopdf['correctivo'];
  $pdfnotas = $rowformatopdf['notas'];
  $pdfcomentarios = $rowformatopdf['comentarios'];
  $pdfperiocidad = $rowformatopdf['periocidad'];
  $pdffechasig = $rowformatopdf['fecha_sig'];

  $id_equipo = $rowFormato['id_equipo'];

  $sqlequipo = "select num_serie,ubicacion from num_serie_equipo from num_serie_equipo where id='$id_equipo'";
  $resultequipo = $mysqli->query($sqlequipo);
  $rowequipo = $resultequipo->fetch_assoc();

  $pdfequipo = $rowequipopdf['num_serie'];
  $pdfubicacion = $rowequipopdf['ubicacion'];

  $id_modelo = $rowequipo['id_modelo'];

  $sqlmodelopdf = "select nombre from modelo_equipo where id='$id_modelo'";
  $resultmodelopdf = $mysqli->query($sqlmodelopdf);
  $rowmodelopdf = $resultmodelopdf->fetch_assoc();

  $pdfmodelo = $rowmodelopdf['nombre'];

  $sqlmarcapdf = "select nombre from marca_equipo where id='$id_marca'";
  $resultmarcapdf = $mysqli->query($sqlmarcapdf);
  $rowmarcapdf = $resultmarcapdf->fetch_assoc();

  $pdfmarca = $rowmarcapdf['nombre'];






  $sqlactsdiagpdf = "select * from acts_diagnostico where id='$id_actsDiag'";
  $resultactsdiagpdf = $mysqli->query($sqlactsdiagpdf);
  $rowactsdiagpdf = $resultactsdiagpdf->fetch_assoc();

  $dx1pdf = $rowactsdiagpdf['limpieza_equipo'];
  $dx2pdf = $rowactsdiagpdf['limpieza_area'];
  $dx3pdf = $rowactsdiagpdf['presion'];
  $dx4pdf = $rowactsdiagpdf['puntos_quemados'];
  $dx5pdf = $rowactsdiagpdf['rodillo'];
  $dx6pdf = $rowactsdiagpdf['etiquetas_pegadas'];
  $dx7pdf = $rowactsdiagpdf['configuracion'];
  $dx8pdf = $rowactsdiagpdf['banda'];

  $sqlactsprevpdf = "select * from acts_preventivo where id='$id_actsPrev'";
  $resultactsprevpdf = $mysqli->query($sqlactsprevpdf);
  $rowactsprevpdf = $resultactsprevpdf->fetch_assoc();

  $mp1pdf = $rowactsprevpdf['limpieza'];
  $mp2pdf = $rowactsprevpdf['revision'];
  $mp3pdf = $rowactsprevpdf['avance_papel'];
  $mp4pdf = $rowactsprevpdf['avance_ribbon'];
  $mp5pdf = $rowactsprevpdf['mecanismo_rodillo'];
  $mp6pdf = $rowactsprevpdf['revision_sensores'];
  $mp7pdf = $rowactsprevpdf['calibracion_sensores'];
  $mp8pdf = $rowactsprevpdf['configuracion'];

  $sqlactscorrepdf = "select * from acts_correctivo where id='$id_actsCorre'";
  $resultactscorrepdf = $mysqli->query($sqlactscorrepdf);
  $rowactscorrepdf = $resultactscorrepdf->fetch_assoc();

  $cm1pdf = $rowactscorrepdf['cabezal'];
  $cm2pdf = $rowactscorrepdf['rodillo'];
  $cm3pdf = $rowactscorrepdf['banda'];
  $cm4pdf = $rowactscorrepdf['sensor_ribbon'];
  $cm5pdf = $rowactscorrepdf['sensor_papel'];
  $cm6pdf = $rowactscorrepdf['mother'];
  $cm7pdf = $rowactscorrepdf['fuente'];
  $cm8pdf = $rowactscorrepdf['otro'];


  $sqlfirmapdf = "select url from img_firma where id_formato='$id_formato'";
  $resultfirmapdf = $mysqli->query($sqlfirmapdf);
  $rowfirmapdf = $resultfirmapdf->fetch_assoc();

  $firmapdf = $rowfirmapdf['url'];


  ob_start();
  ?>
 <!DOCTYPE html>
 <html lang="en">

 <head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
   <title>formatoReporte</title>
   <style>
     html {
       box-sizing: border-box;
       font-family: "Montserrat", sans-serif;
       font-size: 12pt;
       margin: 0;
       padding: 0;
     }

     *::after,
     *::before {
       box-sizing: inherit;
     }


     body {
       width: 21.59cm;
       min-height: 27.94cm;
       margin: 0;
       padding: 0 1cm;
       font-family: inherit;
       overflow-x: hidden;
     }

     img {
       max-width: 100%;
       height: auto;
     }

     header {
       width: 100%;
       height: 2cm;
     }

     .data {
       display: inline-block;
       margin-left: 1rem;
       margin-top: 1rem;
     }

     .data-w25 {
       width: 22%;
     }

     .data-w30 {
       width: 30%;
     }

     .data-w50 {
       width: 47%;
     }

     .data-w100 {
       width: 95%;
     }

     .data-label,
     .data-span {
       display: block;
       padding-right: .5rem;
       padding-left: .5rem;
       font-size: .8rem;
       font-weight: 500;
     }

     .data-span {
       padding-top: .5rem;
       padding-bottom: .3rem;
       border-bottom: medium solid grey;
     }

     .type-mant {
       display: inline-block;
       width: 27%;
       font-size: .8rem;
       font-weight: 600;
     }

     .type-mant img {
       width: .8rem;
     }

     .actividad {
       font-size: .7rem;
       font-weight: 500;
     }

     .actividad-check {
       width: .8rem;
       height: .8rem;
     }
   </style>
 </head>

 <body>
   <header style="height:5rem;">

     <section style="display:inline-block; width:20%;"> <img src="http://localhost/mesa-servicio/assets/logoe.jfif" alt="logo"></section>
     <section style="display:inline-block; width:62%;">
       <h1 style="text-align: center; font-size:14pt; font-weight:600;margin:0;">REPORTE DE MANTENIMIENTO DE EQUIPO</h1>
     </section>
     <section style="width:15%; font-size:8pt;display:inline-block;"><span style="text-decoration: underline;">VT-MANTT01.P2</span></section>
   </header>
   <article>
     <div class="data data-w30 ">
       <label for="fecha" class="data-label">Fecha</label>
       <span id="fecha" class="data-span"><?php echo $fecha ?></span>
     </div>
     <div class="data data-w30 ">
       <label for="reporte" class="data-label">reporte </label>
       <span id="reporte" class="data-span"><?php echo $id_Reporte ?></span>
     </div>
     <div class="data data-w30 ">
       <label for="contrato" class="data-label">Contrato</label>
       <span id="contrato" class="data-span"><?php echo $pdfcontrato ?></span>
     </div>

   </article>
   <article>
     <div class="data data-w50 ">
       <label for="empresa" class="data-label">Empresa</label>
       <span id="empresa" class="data-span"><?php echo $pdfempresa ?></span>
     </div>
     <div class="data data-w50">
       <label for="contacto" class="data-label">Contacto</label>
       <span id="contacto" class="data-span"><?php echo $pdfcliente ?></span>
     </div>
   </article>
   <article>
     <div class="data data-w100">
       <label for="direccion" class="data-label">Dirección</label>
       <span id="direccion" class="data-span"><?php echo $pdfdireccion ?></span>
     </div>
   </article>
   <article style="display:flex">
     <div class="data data-w50">
       <label for="tel" class="data-label">Telefono</label>
       <span id="tel" class="data-span"><?php echo $pdftelefono ?></span>
     </div>
     <div class="data data-w50">
       <label for="correo" class="data-label">Correo</label>
       <span id="correo" class="data-span"><?php echo $pdfcorreo ?></span>
     </div>
   </article>
   <h5 style="text-align: center; font-size:12pt; font-weight:600;">TIPO DE MANTENIMIENTO</h5>

   <article style="text-align: center;">
     <p class="type-mant">
       DIAGNÓSTiCO

       <?php if ($pdfdiagnostico == 1) { ?>
         <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify">
       <?php } else { ?>
         <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify">
       <?php } ?>
     </p>
     <p class="type-mant">
       PREVENTIVO
       <?php if ($pdfpreventivo == 1) { ?>
         <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify">
       <?php } else { ?>
         <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify">
       <?php } ?>
     </p>
     <p class="type-mant">
       CORRECTIVO <?php if ($pdfcorrectivo == 1) { ?>
         <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify">
       <?php } else { ?>
         <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify">
       <?php } ?>
     </p>
   </article>
   <article style="margin-bottom:1.5rem">
     <div class="data data-w25">
       <label for="marca" class="data-label">Marca</label>
       <span id="marca" class="data-span"><?php echo $pdfmarca ?></span>
     </div>
     <div class="data data-w25">
       <label for="modelo" class="data-label">Modelo</label>
       <span id="modelo" class="data-span"><?php echo $pdfmodelo ?></span>
     </div>
     <div class="data data-w25">
       <label for="serie" class="data-label">Número de serie</label>
       <span id="serie" class="data-span"><?php echo $pdfequipo ?></span>
     </div>
     <div class="data data-w25">
       <label for="ubicación" class="data-label">Ubicación</label>
       <span id="ubicación" class="data-span"><?php echo $pdfubicacion ?></span>
     </div>
   </article>
   <article style="">
     <section style="text-align:end;display:inline-block;width:30%;margin-top:0;">
       <h5 style="font-size: 10pt; text-align:center;margin-top:0">Actividades diagnostico</h5>
       <div class="actividad">
         <label>
           <?php if ($dx1pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Buena limpieza general del equipo
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx2pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Limpieza del área del equipo
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx3pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Falta de presion en el cabezal
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx4pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cabezal con puntos quemados
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx5pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Rodillo dañado
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx6pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Etiquetas pegadas
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx7pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Mala configuración
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($dx8pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Banda dañada
         </label>
       </div>
     </section>
     <section style="text-align:end;display:inline-block;width:30%;margin-top:0;">
       <h5 style="font-size: 10pt; text-align:center">Actividades Preventivas</h5>
       <div class="actividad">
         <label>
           <?php if ($mp1pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Limpieza general
         </label>
       </div>
       <div class="actividad">
         <label>
           <<?php if ($mp2pdf == 1) { ?> <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Revisión general
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($mp3pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Revisión de avance de papel
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($mp4pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Revisión avance de Ribbon
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($mp5pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Mecanismo de rodillo
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($mp6pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Revisión de sensores
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($mp7pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Calibración de sensores
         </label>
       </div>
       <div class="actividad">
         <label>
           <?php if ($mp8pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           configuración optima
         </label>
       </div>
     </section>
     <section style="text-align:end;display:inline-block;width:30%;margin-top:0;">
       <h5 style="font-size: 10pt; text-align:center;">Actividades Correctivas</h5>
       <div class="actividad" style="text-align: end;">
         <label>
           <?php if ($cm1pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de cabezal
         </label>
       </div>
       <div class="actividad" style="text-align: end;">
         <label>
           <?php if ($cm2pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de rodillo motriz
         </label>
       </div>
       <div class="actividad" style="text-align: end;">
         <label>
           <?php if ($cm3pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de banda de tracción
         </label>
       </div>
       <div class="actividad" style="text-align: end;">
         <label>
           <?php if ($cm4pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de sensores de ribbon
         </label>
       </div>
       <div class="actividad" style="text-align: end;">
         <label>
           <?php if ($cm5pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de sensores de papel
         </label>
       </div>
       <div class="actividad" style="text-align: end;">
         <label>
           <?php if ($cm6pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de tarjetas Lógicas
         </label>
       </div>
       <div class="actividad" style="text-align: end;">
         <span>
           <?php if ($cm7pdf == 1) { ?>
             <img src="http://localhost/mesa-servicio/assets/check-true.jpg" alt="verify" class="actividad-check">
           <?php } else { ?>
             <img src="http://localhost/mesa-servicio/assets/check-false.jpg" alt="verify" class="actividad-check">
           <?php } ?>
           Cambio de fuente de poder
         </span>
       </div>

     </section>
   </article>



   <div class="data data-w50" style="margin-bottom: .5rem; margin-top: 0;">
     <label for="otras" class="data-label">Otras Acciones correctivas</label>
     <span id="otras" class="data-span"><?php echo $cm8pdf ?></span>
   </div>
   <article style="margin-bottom: 2rem;">
     <div class="data data-w100" style="margin-bottom: 1rem;">
       <label for="notas" class="data-label">Notas</label>
       <span id="notas" class="data-span"><?php echo $pdfnotas ?></span>
     </div>
     <div class="data data-w100">
       <label for="coment" class="data-label">Comentarios</label>
       <span id="coment" class="data-span"><?php echo $pdfcomentarios ?></span>
     </div>
   </article>
   <article style="padding-top: 1rem;">
     <p style="display:inline-block; font-size:12pt; font-weight: 500; margin-right:.5cm; width:48%;">Sugerencia de periocidad de mantenimiento: <span style="text-decoration: underline; font-weight:600;"><?php echo $pdfperiocidad ?></span> meses. </p>
     <p style="display:inline-block; font-size:12pt; font-weight: 500; width:48%;">Fecha sugerida del próximo mantenimiento: <br><span style="text-decoration: underline; font-weight:600;"><?php echo $pdffechasig ?></span>.</p>
   </article>
   <article>
     <p style="font-size:12pt; font-weight: 500;">Reporte generado por: <span style=" text-decoration: underline;font-weight: 600;"><?php echo $pdfuser ?></span></p>
   </article>
   <article>
     <div style="text-align:center;"><img src="<?php echo $firmapdf ?>" alt="firma" style="width: 3cm;"></div>

     <p style="font-size:12pt; font-weight: 500;">Firma de satisfacción de cliente: <span style=" text-decoration: underline;font-weight: 600;"><?php echo $pdfcliente ?></span></p>
   </article>
   <h5 style="font-size: 12pt; text-align:center;">EVIDENCIA ANTES:</h5>
   <figure style="padding-top:3rem">
     <div style="width: 100%;text-align:center;">
       <?php
        $sqlimg1pdf = "select url from img_limpieza_antes where id_formato='$id_formato'";
        $resultimg1pdf = $mysqli->query($sqlimg1pdf);
        while ($rowimg1pdf = $resultimg1pdf->fetch_assoc()) {
        ?>

         <img src="<?php echo $rowimg1pdf['url'] ?>" alt="evidencia" style="display: inline-block; width:auto; max-height:15rem; margin-right:1rem;margin-bottom:1rem">
       <?php
        }
        ?>
       <?php
        $sqlimg1pdf = "select url from img_etiqueta_antes where id_formato='$id_formato'";
        $resultimg1pdf = $mysqli->query($sqlimg1pdf);
        while ($rowimg1pdf = $resultimg1pdf->fetch_assoc()) {
        ?>
         <img src="<?php echo $rowimg1pdf['url'] ?>" alt="evidencia" style="display: inline-block; width:auto; max-height:15rem; margin-right:1rem;margin-top:1.5rem;margin-bottom:1rem">
       <?php
        }
        ?>
     </div>
   </figure>
   <h5 style="font-size: 12pt; text-align:center;">EVIDENCIA DESPUES:</h5>
   <figure style="padding-top:3rem">
     <div style="width: 100%;text-align:center;">
       <?php
        $sqlimg1pdf = "select url from img_limpieza_despues where id_formato='$id_formato'";
        $resultimg1pdf = $mysqli->query($sqlimg1pdf);
        while ($rowimg1pdf = $resultimg1pdf->fetch_assoc()) {
        ?>
         <img src="<?php echo $rowimg1pdf['url'] ?>" alt="evidencia" style="display: inline-block; width:auto; max-height:15rem; margin-right:1rem;margin-botom:1rem">
       <?php
        }
        ?>
       <?php
        $sqlimg1pdf = "select url from img_etiqueta_despues where id_formato='$id_formato'";
        $resultimg1pdf = $mysqli->query($sqlimg1pdf);
        while ($rowimg1pdf = $resultimg1pdf->fetch_assoc()) {
        ?>
         <img src="<?php echo $rowimg1pdf['url'] ?>" alt="evidencia" style="display: inline-block; width:auto; max-height:15rem; margin-right:1rem;margin-bottom:1rem">
       <?php
        }
        ?>
     </div>

   </figure>

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

  // file_put_contents('../../../documentos/reportes/reporte_' . $id_Reporte . '_Original' . '.pdf', $output);

  $dompdf->stream("./reporte.pdf", array("Attachment" => true));
  $res = array(
    "err" => "false",
    "id" => $id_Reporte
  );

  echo json_encode($res);

  ?>