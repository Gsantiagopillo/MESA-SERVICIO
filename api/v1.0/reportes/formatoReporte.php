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
      padding: 0 2cm;
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
      margin-top: 1.5rem;
    }

    .data-w25 {
      width: 22.6%;
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
      font-size: 1rem;
      font-weight: 500;
    }

    .data-span {
      padding-top: 1rem;
      padding-bottom: .5rem;
      border-bottom: medium solid grey;
    }

    .type-mant {
      display: inline-block;
      width: 27%;
      font-size: 1.4rem;
      font-weight: 600;
    }

    .type-mant input[type=checkbox] {
      width: 1.4rem;
      height: 1.4rem;
    }

    .actividad {
      font-size: 1.3rem;
      font-weight: 500;
    }

    .actividad-check {
      width: 1.15rem;
      height: 1.15rem;
    }
  </style>
</head>

<body>
  <header style="height:5rem;">
    <section style="display:inline-block; width:20%;"> <img src="http://localhost/mesa-servicio/assets/logoe.jfif" alt="logo"></section>
    <section style="display:inline-block; width:62%;">
      <h1 style="text-align: center; font-size:16pt; font-weight:600;margin:0;">REPORTE DE MANTENIMIENTO DE EQUIPO</h1>
    </section>
    <section style="width:15%; font-size:8pt; height:inherit;display:inline-block;"><span style="text-decoration: underline;">VT-MANTT01.P2</span></section>
  </header>
  <article>
    <div class="data data-w30 ">
      <label for="fecha" class="data-label">Fecha</label>
      <span id="fecha" class="data-span">Fecha</span>
    </div>
    <div class="data data-w30 ">
      <label for="reporte" class="data-label">reporte</label>
      <span id="reporte" class="data-span">reporte</span>
    </div>
    <div class="data data-w30 ">
      <label for="contrato" class="data-label">Contrato</label>
      <span id="contrato" class="data-span">Contrato</span>
    </div>

  </article>
  <article>
    <div class="data data-w50 ">
      <label for="empresa" class="data-label">Empresa</label>
      <span id="empresa" class="data-span">Empresa</span>
    </div>
    <div class="data data-w50">
      <label for="contacto" class="data-label">Contacto</label>
      <span id="contacto" class="data-span">Contacto</span>
    </div>
  </article>
  <article>
    <div class="data data-w100">
      <label for="direccion" class="data-label">Dirección</label>
      <span id="direccion" class="data-span">Dirección</span>
    </div>
  </article>
  <article style="display:flex">
    <div class="data data-w50">
      <label for="tel" class="data-label">Telefono</label>
      <span id="tel" class="data-span">Telefono</span>
    </div>
    <div class="data data-w50">
      <label for="correo" class="data-label">Correo</label>
      <span id="correo" class="data-span">Correo</span>
    </div>
  </article>
  <h5 style="text-align: center; font-size:14pt; font-weight:600;">TIPO DE MANTENIMIENTO</h5>
  <article style="text-align: center;">
    <p class="type-mant">
      <label>
        <input type="checkbox" class="filled-in" />
        <span>DIAGNÓSTiCO</span>
      </label>
    </p>
    <p class="type-mant">
      <label>
        <input type="checkbox" class="filled-in" checked="checked" />
        <span>PREVENTIVO</span>
      </label>
    </p>
    <p class="type-mant">
      <label>
        <input type="checkbox" class="filled-in" />
        <span>CORRECTIVO</span>
      </label>
    </p>
  </article>
  <article style="margin-bottom:1.5rem">
    <div class="data data-w25">
      <label for="marca" class="data-label">Marca</label>
      <span id="marca" class="data-span">Marca</span>
    </div>
    <div class="data data-w25">
      <label for="modelo" class="data-label">Modelo</label>
      <span id="modelo" class="data-span">Modelo</span>
    </div>
    <div class="data data-w25">
      <label for="serie" class="data-label">Número de serie</label>
      <span id="serie" class="data-span">Número de serie</span>
    </div>
    <div class="data data-w25">
      <label for="ubicación" class="data-label">Ubicación</label>
      <span id="ubicación" class="data-span">Ubicación</span>
    </div>
  </article>
  <article>
    <section style="text-align:end;display:inline-block;width:49%;">
      <h5 style="font-size: 14pt; text-align:center;margin-top:0">Actividades diagnostico</h5>
      <div class="actividad">
        <label>
          Buena limpieza general del equipo
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Limpieza del área del equipo
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Falta de presion en el cabezal
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Cabezal con puntos quemados
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Rodillo dañado
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Etiquetas pegadas
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Mala configuración
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Banda dañada
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
    </section>
    <section style="text-align:end;display:inline-block;width:49%;">
      <h5 style="font-size: 14pt; text-align:center;margin-top:0;">Actividades Preventivas</h5>
      <div class="actividad">
        <label>
          Limpieza general
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Revisión general
          <input type="checkbox" class="actividad-check" checked=>
          <span class="lever"></span>
        </label>
      </div>
      <div class="actividad">
        <label>
          Revisión de avance de papel
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Revisión avance de Ribbon
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Mecanismo de rodillo
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Revisión de sensores
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          Calibración de sensores
          <input type="checkbox" class="actividad-check" checked=>
        </label>
      </div>
      <div class="actividad">
        <label>
          configuración optima
          <input type="checkbox" class="actividad-check" checked=>
          <span class="lever"></span>
        </label>
      </div>
    </section>
  </article>
  <h5 style="font-size: 14pt; text-align:center;">Actividades Correctivas</h5>
  <article style="display:grid;grid-template-columns: repeat(2,1fr);">
    <div class="actividad" style="text-align: end;">
      <label>
        Cambio de cabezal
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
    <div class="actividad" style="text-align: end;">
      <label>
        Cambio de rodillo motriz
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
    <div class="actividad" style="text-align: end;" checked=>
      <label>
        Cambio de banda de tracción
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
    <div class="actividad" style="text-align: end;">
      <label>
        Cambio de sensores de ribbon
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
    <div class="actividad" style="text-align: end;">
      <label>
        Cambio de sensores de papel
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
    <div class="actividad" style="text-align: end;">
      <label>
        Cambio de tarjetas Lógicas
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
    <div class="actividad" style="text-align: end;">
      <label>
        Cambio de fuente de poder
        <input type="checkbox" class="actividad-check" checked=>
      </label>
    </div>
  </article>
  <div class="data data-w50" style="margin-bottom: 2rem;">
    <label for="otras" class="data-label">Otras</label>
    <span id="otras" class="data-span">Otras</span>
  </div>
  <article style="margin-bottom: 2rem;">
    <div class="data data-w100" style="margin-bottom: 1rem;">
      <label for="notas" class="data-label">Notas</label>
      <span id="notas" class="data-span">Notas</span>
    </div>
    <div class="data data-w100">
      <label for="coment" class="data-label">Comentarios</label>
      <span id="coment" class="data-span">Comentarios</span>
    </div>
  </article>
  <article>
    <p style="display:inline-block; font-size:12pt; font-weight: 500; margin-right:.5cm; width:48%;">Sugerencia de periocidad de mantenimiento: <span style="text-decoration: underline; font-weight:600;">02</span> meses. </p>
    <p style="display:inline-block; font-size:12pt; font-weight: 500; width:48%;">Fecha sugerida del próximo mantenimiento: <br><span style="text-decoration: underline; font-weight:600;">02-mayo-2023</span>.</p>
  </article>
  <article>
    <p style="font-size:12pt; font-weight: 500;">Reporte generado por: <span style=" text-decoration: underline;font-weight: 600;">FRANCISCO GONZALO SANTIAGO OJEDA</span></p>
  </article>
  <article>
    <div style="text-align:center;"><img src="http://localhost/mesa-servicio/imgs/firmaexample.png" alt="firma" style="width: 3cm;"></div>

    <p style="font-size:12pt; font-weight: 500;">Firma de satisfacción de cliente: <span style=" text-decoration: underline;font-weight: 600;">Mariana Gutierrez Gutierrez</span></p>
  </article>

  <h5 style="font-size: 12pt; text-align:center;">EVIDENCIAS:</h5>
  <figure>
    <img src="http://localhost/mesa-servicio/imgs/REPORTE13-7.jpg" alt="" style="display: inline-block; width:45%; margin-right:1rem;">
    <img src="http://localhost/mesa-servicio/imgs/REPORTE13-3.jpg" alt="" style="display: inline-block; width:45%; margin-right:1rem;">
  </figure>

</body>

</html>