import api from "../../../helpers/app.js";
import {
  getEmpresas,
  getEquipos,
  getModelos,
} from "../../../impresoras/listado/js/listEquipos.js";

const d = document;

const { REPORTES, DOMAIN } = api;

let empresas, equipos, modelos;

export default async function listReportes() {
  empresas = await getEmpresas();
  equipos = await getEquipos();
  modelos = await getModelos();

  if (!location.pathname.includes("/reportes/listado")) return;

  let reportes = await getReportes();
  reportes = reportes.reportes;

  if (reportes.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY REPORTES DADOS DE ALTA";
    $h5.style.textAlign = "center";
    $h5.id = "h5-reportes-vacio";
    d.getElementById("reportes-list-content").appendChild($h5);
  } else {
    reportes.forEach((el) => {
      const $tr = d.createElement("tr");
      $tr.classList.add("cursor-pointer");

      const $td1 = d.createElement("td");
      $td1.textContent = el.id;
      $td1.id = "reporte-td";
      $td1.setAttribute("data-id", el.id);
      $td1.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td1);

      let nombreEmpresa;
      empresas.forEach((empresa) => {
        if (empresa.id === el["id_empresa"]) nombreEmpresa = empresa.nombre;
      });

      const $td2 = d.createElement("td");
      $td2.textContent = nombreEmpresa;
      $td2.id = "reporte-td";
      $td2.setAttribute("data-id", el.id);
      $td2.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td2);

      let idModelo;
      let nombreModelo;
      let numeroSerie;

      for (let i = 0; i < equipos.length; i++) {
        if (equipos[i].id === el["id_equipo"]) {
          numeroSerie = equipos[i]["num_serie"];
          idModelo = equipos[i]["id_modelo"];
        }
      }
      for (let i = 0; i < modelos.length; i++) {
        if (modelos[i].id === idModelo) {
          nombreModelo = modelos[i].nombre;
        }
      }

      const $td3 = d.createElement("td");
      $td3.textContent = nombreModelo;
      $td3.id = "reporte-td";
      $td3.setAttribute("data-id", el.id);
      $td3.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td3);

      const $td4 = d.createElement("td");
      $td4.textContent = numeroSerie;
      $td4.id = "reporte-td";
      $td4.setAttribute("data-id", el.id);
      $td4.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td4);

      let fecha = el.fecha.split(",");
      const $td5 = d.createElement("td");
      $td5.textContent = fecha[0];
      $td5.id = "reporte-td";
      $td5.setAttribute("data-id", el.id);
      $td5.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td5);

      const $td6 = d.createElement("td");
      $td6.textContent = el.estado;
      $td6.id = "reporte-td";
      $td6.setAttribute("data-id", el.id);
      $td6.setAttribute("data-idformato", el["id_formato"]);
      $td6.style.fontWeight = "600";
      $td6.style.textTransform = "uppercase";
      $tr.appendChild($td6);

      const $td7 = d.createElement("td");
      $td7.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" alt="editar" class="img-auto" data-id="${el.id}">`;
      $td7.id = "reporte-edit";
      $td7.setAttribute("data-id", el.id);
      $td7.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td7);

      d.getElementById("tbody").appendChild($tr);
    });
  }
}

d.addEventListener("click", async (e) => {
  if (!e.target.matches("#filtro-send") && !e.target.matches("#filtro-send *"))
    return;

  d.getElementById("tbody").textContent = "";
  const $h5Vacio = d.getElementById("h5-reportes-vacio");
  if ($h5Vacio) d.getElementById("reportes-list-content").removeChild($h5Vacio);

  let reportes = await getReportes();
  reportes = reportes.reportes;

  if (reportes.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY REPORTES DADOS DE ALTA";
    $h5.style.textAlign = "center";
    $h5.id = "h5-reportes-vacio";
    d.getElementById("reportes-list-content").appendChild($h5);
  } else {
    reportes.forEach((el) => {
      const $tr = d.createElement("tr");
      $tr.classList.add("cursor-pointer");

      const $td1 = d.createElement("td");
      $td1.textContent = el.id;
      $td1.id = "reporte-td";
      $td1.setAttribute("data-id", el.id);
      $td1.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td1);

      let nombreEmpresa;
      empresas.forEach((empresa) => {
        if (empresa.id === el["id_empresa"]) nombreEmpresa = empresa.nombre;
      });

      const $td2 = d.createElement("td");
      $td2.textContent = nombreEmpresa;
      $td2.id = "reporte-td";
      $td2.setAttribute("data-id", el.id);
      $td2.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td2);

      let idModelo;
      let nombreModelo;
      let numeroSerie;

      for (let i = 0; i < equipos.length; i++) {
        if (equipos[i].id === el["id_equipo"]) {
          numeroSerie = equipos[i]["num_serie"];
          idModelo = equipos[i]["id_modelo"];
        }
      }
      for (let i = 0; i < modelos.length; i++) {
        if (modelos[i].id === idModelo) {
          nombreModelo = modelos[i].nombre;
        }
      }

      const $td3 = d.createElement("td");
      $td3.textContent = nombreModelo;
      $td3.id = "reporte-td";
      $td3.setAttribute("data-id", el.id);
      $td3.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td3);

      const $td4 = d.createElement("td");
      $td4.textContent = numeroSerie;
      $td4.id = "reporte-td";
      $td4.setAttribute("data-id", el.id);
      $td4.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td4);

      let fecha = el.fecha.split(",");
      const $td5 = d.createElement("td");
      $td5.textContent = fecha[0];
      $td5.id = "reporte-td";
      $td5.setAttribute("data-id", el.id);
      $td5.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td5);

      const $td6 = d.createElement("td");
      $td6.textContent = el.estado;
      $td6.id = "reporte-td";
      $td6.setAttribute("data-id", el.id);
      $td6.setAttribute("data-idformato", el["id_formato"]);
      $td6.style.fontWeight = "600";
      $td6.style.textTransform = "uppercase";
      $tr.appendChild($td6);

      const $td7 = d.createElement("td");
      $td7.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" alt="editar" class="img-auto" data-id="${el.id}">`;
      $td7.id = "reporte-edit";
      $td7.setAttribute("data-id", el.id);
      $td7.setAttribute("data-idformato", el["id_formato"]);
      $tr.appendChild($td7);

      d.getElementById("tbody").appendChild($tr);
    });
  }
});

async function getReportes() {
  const filtroReporte = d.getElementById("filtro-reporte").value;
  const filtroSerie = d.getElementById("filtro-serie");
  const filtroEmpresa = d.getElementById("filtro-empresa").value;

  // console.log(filtroSerie);
  const formData = new FormData();

  if (filtroReporte !== "") formData.append("idReporte", filtroReporte);
  if (filtroEmpresa !== "") formData.append("idEmpresa", filtroEmpresa);
  if (filtroSerie.value !== "")
    formData.append("idEquipo", filtroSerie.getAttribute("data-id"));
  let options = {
    method: "POST",
    body: formData,
  };

  try {
    let res = await fetch(`${REPORTES}getReportes.php`, options);
    let json = await res.json();

   // console.log(json);

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error: error ${err.status} : ${message} `);
  }
}

export function goToReporte(e) {
  if (!e.target.matches("#reporte-td") && !e.target.matches("#reporte-td *"))
    return;

  let id = e.target.getAttribute("data-id");
  let idFormato = e.target.getAttribute("data-idformato");
  sessionStorage.setItem("idReporteGO", id);
  sessionStorage.setItem("idFormatoReporteGO", idFormato);
  location.replace(`${DOMAIN}reportes/informacion`);
}
