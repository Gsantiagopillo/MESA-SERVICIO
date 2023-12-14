import api from "../../../helpers/app.js";
import {
  getClientes,
  getEmpresas,
  getEquipos,
  getMarcas,
  getModelos,
} from "../../../impresoras/listado/js/listEquipos.js";

const d = document;

const { REPORTES, DOMAIN } = api;

let empresas;
let clientes;
let marcas;
let modelos;
let equipos;

export default async function infoReporte() {
  if (
    !location.pathname.includes("/reportes/edit") &&
    !location.pathname.includes("/reportes/informacion")
  )
    return;

  if (!sessionStorage.getItem("idReporteGO")) return;

  empresas = await getEmpresas();
  clientes = await getClientes();
  marcas = await getMarcas();
  modelos = await getModelos();
  equipos = await getEquipos();

  let idReporte = sessionStorage.getItem("idReporteGO");
  let idFormato = sessionStorage.getItem("idFormatoReporteGO");

  const formData = new FormData();
  formData.append("idReporte", idReporte);
  formData.append("idFormato", idFormato);

  let options = {
    method: "POST",
    body: formData,
  };

  try {
    let res = await fetch(`${REPORTES}getReporte.php`, options),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    console.log(json);
    let reporte = json.listReportes;
    const $form =
      d.getElementById("form-info-reporte") ||
      d.getElementById("form-edit-reporte");

    $form["reporte-id"].value = reporte["id"];

    let reporteEstado = reporte["estado"] === "nuevo" ? "Original" : "Editado";
    d.getElementById(
      "reporte-pdf"
    ).href = `${DOMAIN}documentos/reportes/reporte_${reporte["id"]}_${reporteEstado}.pdf`;
    $form["reporte-fecha"].value = reporte["fecha"];

    let empresa = getInfoEmpresa(reporte["id_empresa"]);
    $form["reporte-empresa"].value = empresa["nombre"];
    $form["reporte-direccion"].value = empresa["direccion"];

    let cliente = getInfoCliente(reporte["id_cliente"]);
    $form[
      "reporte-cliente"
    ].value = `${cliente.nombre} ${cliente["apellido_paterno"]} ${cliente["apellido_materno"]}`;
    $form["reporte-tel"].value = cliente.telefono;
    $form["reporte-correo"].value = cliente.correo;

    let equipo = getInfoEquipo(reporte["id_equipo"]);
    $form["reporte-serie"].value = equipo["num_serie"];
    $form["reporte-ubicacion"].value = equipo["ubicacion"];

    let modelo = getInfoModelo(equipo["id_modelo"]);
    $form["reporte-modelo"].value = modelo["nombre"];

    let marca = getNameMarca(modelo["id_marca"]);
    $form["reporte-marca"].value = marca;

    if (reporte.dianostico === "1")
      $form["reporte-dx"].setAttribute("checked", "checked");
    if (reporte.preventivo === "1")
      $form["reporte-mp"].setAttribute("checked", "checked");
    if (reporte.correctivo === "1")
      $form["reporte-cm"].setAttribute("checked", "checked");

    if (reporte["limpieza_equipo"] === "1")
      $form["reporte-adx-1"].setAttribute("checked", "checked");
    if (reporte["limpieza_area"] === "1")
      $form["reporte-adx-2"].setAttribute("checked", "checked");
    if (reporte["presion"] === "1")
      $form["reporte-adx-3"].setAttribute("checked", "checked");
    if (reporte["puntos_quemados"] === "1")
      $form["reporte-adx-4"].setAttribute("checked", "checked");
    if (reporte["rodillo"] === "1")
      $form["reporte-adx-5"].setAttribute("checked", "checked");
    if (reporte["etiquetas_pegadas"] === "1")
      $form["reporte-adx-6"].setAttribute("checked", "checked");
    if (reporte["configuracion"] === "1")
      $form["reporte-adx-7"].setAttribute("checked", "checked");
    if (reporte["banda"] === "1")
      $form["reporte-adx-8"].setAttribute("checked", "checked");

    if (reporte["limpieza"] === "1")
      $form["reporte-mp-1"].setAttribute("checked", "checked");
    if (reporte["revision"] === "1")
      $form["reporte-mp-2"].setAttribute("checked", "checked");
    if (reporte["avance_papel"] === "1")
      $form["reporte-mp-3"].setAttribute("checked", "checked");
    if (reporte["avance_ribbon"] === "1")
      $form["reporte-mp-4"].setAttribute("checked", "checked");
    if (reporte["mecanismo_rodillo"] === "1")
      $form["reporte-mp-5"].setAttribute("checked", "checked");
    if (reporte["revision_sensores"] === "1")
      $form["reporte-mp-6"].setAttribute("checked", "checked");
    if (reporte["revision_sensores"] === "1")
      $form["reporte-mp-7"].setAttribute("checked", "checked");
    if (reporte["configuracion_optima"] === "1")
      $form["reporte-mp-8"].setAttribute("checked", "checked");

    if (reporte["cm_cabezal"] === "1")
      $form["reporte-cm-1"].setAttribute("checked", "checked");
    if (reporte["cm_rodillo"] === "1")
      $form["reporte-cm-2"].setAttribute("checked", "checked");
    if (reporte["cm_banda"] === "1")
      $form["reporte-cm-3"].setAttribute("checked", "checked");
    if (reporte["sensor_ribbon"] === "1")
      $form["reporte-cm-4"].setAttribute("checked", "checked");
    if (reporte["sensor_papel"] === "1")
      $form["reporte-cm-5"].setAttribute("checked", "checked");
    if (reporte["cm_mother"] === "1")
      $form["reporte-cm-6"].setAttribute("checked", "checked");
    if (reporte["cm_fuente"] === "1")
      $form["reporte-cm-7"].setAttribute("checked", "checked");
    $form["reporte-cm-8"].value = reporte["cm_otro"];

    d.getElementById("reporte-nota").textContent = reporte["notas"];
    d.getElementById("reporte-nota").style.borderBottom = "thin solid black";
    d.getElementById("reporte-nota").style.paddingBottom = "1rem";

    d.getElementById("reporte-coment").textContent = reporte["comentarios"];
    d.getElementById("reporte-coment").style.borderBottom = "thin solid black";
    d.getElementById("reporte-coment").style.paddingBottom = "1rem";

    $form["reporte-periocidad"].value = reporte["periocidad"];
    $form["reporte-next"].value = reporte["fecha_sig"];

    let $fragment = d.createDocumentFragment();
    json.EtiAntes.forEach((el) => {
      const $img = d.createElement("img");
      $img.src = `${el.url}`;
      $fragment.appendChild($img);
    });
    d.getElementById("reporte-antes-eti").appendChild($fragment);

    $fragment = d.createDocumentFragment();
    json.EquipoAntes.forEach((el) => {
      const $img = d.createElement("img");
      $img.src = `${el.url}`;
      $fragment.appendChild($img);
    });
    d.getElementById("reporte-antes-equipo").appendChild($fragment);

    $fragment = d.createDocumentFragment();
    json.EquipoDespues.forEach((el) => {
      const $img = d.createElement("img");
      $img.src = `${el.url}`;
      $fragment.appendChild($img);
    });
    d.getElementById("reporte-despues-equipo").appendChild($fragment);

    $fragment = d.createDocumentFragment();
    json.EtiDespues.forEach((el) => {
      const $img = d.createElement("img");
      $img.src = `${el.url}`;
      $fragment.appendChild($img);
    });
    d.getElementById("reporte-despues-eti").appendChild($fragment);

    const $imgFirma = d.createElement("img");
    $imgFirma.src = `${json.firma}`;
    $imgFirma.alt = "firmaCliente";
    d.getElementById("reporte-firma").appendChild($imgFirma);
    const $spanFirma = d.createElement("span");
    $spanFirma.innerHTML = `Firma del cliente: <b>${cliente.nombre} ${cliente["apellido_paterno"]} ${cliente["apellido_materno"]}</b>`;
    d.getElementById("reporte-firma").appendChild($spanFirma);

    d.getElementById("reporte-usuario").textContent = `${json.usuario.nombre} 
      ${json.usuario["apellido_paterno"]} ${json.usuario["apellido_materno"]}`;
    //
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error: error ${err.status} : ${message} `);
  }

  d.addEventListener("click", (e) => {
    if (e.target.matches("input[type='checkbox']")) e.preventDefault();
  });
}

function getInfoEmpresa(id) {
  let empresa;
  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].id == id) {
      empresa = empresas[i];
      break;
    }
  }

  return empresa;
}

function getInfoCliente(id) {
  let cliente;
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].id == id) {
      cliente = clientes[i];
      break;
    }
  }
  return cliente;
}
function getInfoEquipo(id) {
  let equipo;
  for (let i = 0; i < equipos.length; i++) {
    if (equipos[i].id == id) {
      equipo = equipos[i];
      break;
    }
  }
  return equipo;
}
function getInfoModelo(id) {
  let modelo;
  for (let i = 0; i < modelos.length; i++) {
    if (modelos[i].id == id) {
      modelo = modelos[i];
      break;
    }
  }
  return modelo;
}
function getNameMarca(id) {
  let marca;
  for (let i = 0; i < marcas.length; i++) {
    if (marcas[i].id == id) {
      marca = marcas[i]["nombre"];
      break;
    }
  }
  return marca;
}
