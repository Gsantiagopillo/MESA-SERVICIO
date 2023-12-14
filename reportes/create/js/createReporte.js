import api from "../../../helpers/app.js";

const d = document;

const { REPORTES, EMPRESAS, CLIENTES, IMPRESORAS, USUARIOS, DOMAIN } = api;

export default function createReporte(e) {
  if (!e.target.matches("#form-create-reporte")) return;

  const $form = d.getElementById("form-create-reporte"),
    idUser = localStorage.getItem("user") || sessionStorage.getItem("user"), //informacion de la empresa
    fecha = new Date().toLocaleString(),
    $empresa = $form["reporte-create-empresa"],
    idEmpresa = $empresa.getAttribute("data-id"),
    $cliente = $form["reporte-create-cliente"],
    idCliente = $cliente.getAttribute("data-id"),
    direccion = $form["reporte-create-direccion"].value,
    tel = $form["reporte-create-tel"].value,
    correo = $form["reporte-create-correo"].value,
    //informacion del equipo
    $marca = $form["reporte-create-marca"],
    marca = $marca.getAttribute("data-id"),
    $modelo = $form["reporte-create-modelo"],
    modelo = $modelo.getAttribute("data-id"),
    $numSerie = $form["reporte-create-serie"],
    numSerie = $numSerie.getAttribute("data-id"),
    ubicacion = $form["reporte-create-ubicacion"],
    //informacion de mantenimiento
    dx = $form["reporte-create-dx"].checked ? 1 : 0,
    mp = $form["reporte-create-mp"].checked ? 1 : 0,
    cm = $form["reporte-create-cm"].checked ? 1 : 0,
    //actividades diagnostico
    adx1 = $form["reporte-create-adx-1"].checked ? 1 : 0,
    adx2 = $form["reporte-create-adx-2"].checked ? 1 : 0,
    adx3 = $form["reporte-create-adx-3"].checked ? 1 : 0,
    adx4 = $form["reporte-create-adx-4"].checked ? 1 : 0,
    adx5 = $form["reporte-create-adx-5"].checked ? 1 : 0,
    adx6 = $form["reporte-create-adx-6"].checked ? 1 : 0,
    adx7 = $form["reporte-create-adx-7"].checked ? 1 : 0,
    adx8 = $form["reporte-create-adx-8"].checked ? 1 : 0,
    //actividades preventivas
    mp1 = $form["reporte-create-mp-1"].checked ? 1 : 0,
    mp2 = $form["reporte-create-mp-2"].checked ? 1 : 0,
    mp3 = $form["reporte-create-mp-3"].checked ? 1 : 0,
    mp4 = $form["reporte-create-mp-4"].checked ? 1 : 0,
    mp5 = $form["reporte-create-mp-5"].checked ? 1 : 0,
    mp6 = $form["reporte-create-mp-6"].checked ? 1 : 0,
    mp7 = $form["reporte-create-mp-7"].checked ? 1 : 0,
    mp8 = $form["reporte-create-mp-8"].checked ? 1 : 0,
    //actividades correctivas
    cm1 = $form["reporte-create-cm-1"].checked ? 1 : 0,
    cm2 = $form["reporte-create-cm-2"].checked ? 1 : 0,
    cm3 = $form["reporte-create-cm-3"].checked ? 1 : 0,
    cm4 = $form["reporte-create-cm-4"].checked ? 1 : 0,
    cm5 = $form["reporte-create-cm-5"].checked ? 1 : 0,
    cm6 = $form["reporte-create-cm-6"].checked ? 1 : 0,
    cm7 = $form["reporte-create-cm-7"].checked ? 1 : 0,
    cm8 = $form["reporte-create-cm-8"].value,
    //NOATAS Y COMENTARIOS
    notas = $form["reporte-create-nota"].value,
    comentarios = $form["reporte-create-coment"].value,
    //fotos antes
    $fotosEtAntes = $form["reporte-create-antes-eti"],
    $fotosEquiAntes = $form["reporte-create-antes-equipo"],
    //fotos despues
    $fotosEtDespues = $form["reporte-create-despues-eti"],
    $fotosEquiDespues = $form["reporte-create-despues-equipo"],
    //periocidad
    periciodad = $form["reporte-create-periocidad"].value,
    nextDate = $form["reporte-create-next"].value,
    //firma
    $firma = $form["reporte-create-firma"];

  const formData = new FormData();
  formData.append("idUser", idUser);
  formData.append("fecha", fecha);

  idEmpresa
    ? formData.append("idEmpresa", idEmpresa)
    : formData.append("newEmpresa", $empresa.value);

  if (idCliente) formData.append("idCliente", idCliente);
  else {
    formData.append("newCliente", $cliente.value);
    formData.append("direccion", direccion);
    formData.append("telefono", tel);
    formData.append("correo", correo);

    const $puesto = d.getElementById("reporte-create-puesto");
    const $puestoParent = $puesto.parentElement;

    $puestoParent.style.display = "block";

    if ($puesto.value === "") {
      alert("completa este campo: Puesto ");
      $puesto.focus();
      return;
    }
    formData.append("puesto", $puesto.value);
  }

  marca
    ? formData.append("idMarca", marca)
    : formData.append("newMarca", $marca.value);

  modelo
    ? formData.append("idModelo", modelo)
    : formData.append("newModelo", $modelo.value);

  if (numSerie) formData.append("idEquipo", numSerie);
  else {
    formData.append("newEquipo", $numSerie.value);
    const $infosDetalles = d.querySelectorAll(".info-comp-equipo");

    $infosDetalles.forEach((el) => (el.style.display = "block"));

    const $dpi = d.getElementById("reporte-create-dpi"),
      $width = d.getElementById("reporte-create-width"),
      $numPart = d.getElementById("reporte-create-part"),
      $ubicacion = d.getElementById("reporte-create-ubicacion");

    if ($dpi.value === "" || $width.value === "") {
      alert("completa estos cmpos: dpi´s y ancho de cabezal ");
      $dpi.focus();
      return;
    }

    formData.append("dpi", $dpi.value);
    formData.append("width", $width.value);
    formData.append("ubicacion", $ubicacion.value);
    if ($numPart.value !== "") formData.append("numPart", $numPart.value);
  } //end if

  formData.append("dx", dx);
  formData.append("mp", mp);
  formData.append("cm", cm);

  formData.append("dx1", adx1);
  formData.append("dx2", adx2);
  formData.append("dx3", adx3);
  formData.append("dx4", adx4);
  formData.append("dx5", adx5);
  formData.append("dx6", adx6);
  formData.append("dx7", adx7);
  formData.append("dx8", adx8);

  formData.append("mp1", mp1);
  formData.append("mp2", mp2);
  formData.append("mp3", mp3);
  formData.append("mp4", mp4);
  formData.append("mp5", mp5);
  formData.append("mp6", mp6);
  formData.append("mp7", mp7);
  formData.append("mp8", mp8);

  formData.append("cm1", cm1);
  formData.append("cm2", cm2);
  formData.append("cm3", cm3);
  formData.append("cm4", cm4);
  formData.append("cm5", cm5);
  formData.append("cm6", cm6);
  formData.append("cm7", cm7);
  formData.append("cm8", cm8);

  formData.append("notas", notas);
  formData.append("comentarios", comentarios);

  let files;

  files = Array.from($fotosEquiAntes.files);
  files.forEach((el, key) => {
    formData.append(`fotosEquiAntes${key}`, el);
  });
  formData.append("numfotosEquiAntes", files.length);
  //formData.append("fotosEquiAntes", $fotosEquiAntes);

  files = Array.from($fotosEtAntes.files);
  files.forEach((el, key) => {
    formData.append(`fotosEtAntes${key}`, el);
  });
  formData.append("numfotosEtAntes", files.length);
  // formData.append("fotosEtAntes", $fotosEtAntes);

  files = Array.from($fotosEquiDespues.files);
  files.forEach((el, key) => {
    formData.append(`fotosEquiDespues${key}`, el);
  });
  formData.append("numfotosEquiDespues", files.length);
  // formData.append("fotosEquiDespues", $fotosEquiDespues);

  files = Array.from($fotosEtDespues.files);
  files.forEach((el, key) => {
    formData.append(`fotosEtDespues${key}`, el);
  });
  formData.append("numfotosEtDespues", files.length);
  // formData.append("fotosEtDespues", $fotosEtDespues);

  formData.append("periocidad", periciodad);
  formData.append("nextdate", nextDate);

  if ($firma.files.length > 0) formData.append("firma", $firma.files[0]);
  else {
    alert("debes cargar la captura de la firma del cliente");
    return;
  }
  //console.log(formData);
  document.querySelector(".load").style.display = "flex";

  let options = {
    method: "POST",
    headers: {
      "enc-type": "multipart/form-data",
    },
    body: formData,
  };
  fetch(`${REPORTES}createReporte.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      document.querySelector(".load").style.display = "none";
      alert(
        `Se ha generado el reporte # ${json.id} y se ha enviado al cliente`
      );
      location.href = `${DOMAIN}reportes/create`;
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      alert(
        `ha ocurrido un error..  ${err.status} : ${message}, reintente el envio`
      );
      console.log(` error ${err.status} : ${message}`);
    });
}
