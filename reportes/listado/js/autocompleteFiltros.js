import api from "../../../helpers/app.js";
import {
  getClientes,
  getEmpresas,
  getEquipos,
} from "../../../impresoras/listado/js/listEquipos.js";

const d = document;

const { REPORTES, IMPRESORAS } = api;

let empresas;
let reportes;
let equipos;

const $filtroReporte = d.getElementById("filtro-reporte");
const $filtroSerie = d.getElementById("filtro-serie");

function validar(entrada, valor) {
  if (entrada === "reporte") {
    let array = [];
    for (let i = 0; i < reportes.length; i++) {
      let regex = new RegExp(`^${valor}`);
      if (regex.test(reportes[i].id)) array.push(reportes[i]);
    }
    return array;
  }
  if (entrada === "equipos") {
    console.log(equipos);
    let array = [];
    let regexLowerCase = new RegExp(`^${valor.toLowerCase()}`);
    let regexUpperCase = new RegExp(`^${valor.toUpperCase()}`);
    if (equipos.tam !== "0") {
      for (let i = 0; i < equipos.length; i++) {
        if (
          regexLowerCase.test(equipos[i].num_serie) ||
          regexUpperCase.test(equipos[i].num_serie)
        )
          array.push(equipos[i]);
      }
    }

    return array;
  }
}

export default async function autocompleteFiltroReporte() {
  if (!location.pathname.includes("/reportes/listado")) return;
  // empresas = await getEmpresas();
  reportes = await getReportes();
  equipos = await getEquipos();

  $filtroReporte.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-filtroreporte").innerHTML = "";
    d.getElementById("aside-autocomplete-filtroreporte").style.display = "none";
    if (e.key === "Backspace" && $filtroReporte.value === "") return;

    let coincidencia = validar("reporte", $filtroReporte.value);
    // console.log(coincidencia);

    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = coincidencia[i].id;
      $option.id = "opcion-autocomplete-filtroreporte";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-filtroreporte").appendChild(
      $fragmento
    );
    d.getElementById("aside-autocomplete-filtroreporte").style.display =
      "block";
  });

  $filtroSerie.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-filtroserie").innerHTML = "";
    d.getElementById("aside-autocomplete-filtroserie").style.display = "none";
    if (e.key === "Backspace" && $filtroSerie.value === "") return;

    let coincidencia = validar("equipos", $filtroSerie.value);
    // console.log(coincidencia);

    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = coincidencia[i].num_serie;
      $option.id = "opcion-autocomplete-filtroserie";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-filtroserie").appendChild($fragmento);
    d.getElementById("aside-autocomplete-filtroserie").style.display = "block";
  });

  $filtroReporte.addEventListener("change", (e) => {
    $filtroReporte.removeAttribute("data-id");
    $filtroReporte.value = "";
    $filtroReporte.removeAttribute("data-id");

    setTimeout(() => {
      d.getElementById("aside-autocomplete-filtroreporte").innerHTML = "";
      d.getElementById("aside-autocomplete-filtroreporte").style.display =
        "none";
    }, 200);
  });

  $filtroSerie.addEventListener("change", (e) => {
    $filtroSerie.removeAttribute("data-id");
    $filtroSerie.value = "";
    $filtroSerie.removeAttribute("data-id");

    setTimeout(() => {
      d.getElementById("aside-autocomplete-filtroserie").innerHTML = "";
      d.getElementById("aside-autocomplete-filtroserie").style.display = "none";
    }, 200);
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches("#opcion-autocomplete-filtroreporte")) {
      $filtroReporte.value = e.target.textContent;
      $filtroReporte.setAttribute("data-id", e.target.getAttribute("data-id"));
    }
    if (e.target.matches("#opcion-autocomplete-filtroserie")) {
      $filtroSerie.value = e.target.textContent;
      $filtroSerie.setAttribute("data-id", e.target.getAttribute("data-id"));
    }
  });
}

async function getReportes() {
  try {
    let res = await fetch(`${REPORTES}getListReportes.php`);
    let json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    // console.log(json);

    return json.listReportes;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error al obtener reportes`);
  }
}
