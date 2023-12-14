import api from "../../../helpers/app.js";
import {
  getEmpresas,
  getEquipos,
  getMarcas,
  getModelos,
} from "../../../impresoras/listado/js/listEquipos.js";

const d = document;

const { EMPRESAS, IMPRESORAS, USUARIOS } = api;

let empresas;

let marcas;
let modelos;
let modelosMarca = null;
let equipos;
let equiposModelo = null;

const $marca = d.getElementById("reporte-create-marca");
const $modelo = d.getElementById("reporte-create-modelo");
const $numSerie = d.getElementById("reporte-create-serie");
const $ubicacion = d.getElementById("reporte-create-ubicacion");

function completeModelo() {
  let idModelo = $modelo.getAttribute("data-id");
  let modelo = null;

  modelos.forEach((el) => {
    if (idModelo === el.id) modelo = el;
  });

  let idMarca = $marca.getAttribute("data-id");
  let marca = null;

  idMarca = modelo["id_marca"];

  marcas.forEach((el) => {
    if (idMarca === el.id) marca = el;
  });

  $marca.value = marca.nombre;
  $marca.setAttribute("data-id", marca.id);
}

function completeEquipo() {
  //  seccion para completar la información del modelo, y la ubicacion del equipo
  let idEquipo = $numSerie.getAttribute("data-id");
  let equipo = null;

  equipos.forEach((el) => {
    if (idEquipo === el.id) equipo = el;
  });

  let idmodelo = $modelo.getAttribute("data-id");
  let modelo = null;

  idmodelo = equipo["id_modelo"];

  modelos.forEach((el) => {
    if (idmodelo === el.id) modelo = el;
  });

  $modelo.value = modelo.nombre;
  $modelo.setAttribute("data-id", modelo.id);

  d.getElementById("reporte-create-ubicacion").value = equipo.ubicacion;

  //seccion para completar la información de la marca

  let idMarca = $marca.getAttribute("data-id");
  idMarca = modelo["id_marca"];
  let marca = null;

  marcas.forEach((el) => {
    if (idMarca === el.id) marca = el;
  });

  $marca.value = marca.nombre;
  $marca.setAttribute("data-id", marca.id);

  $ubicacion.value = equipo.ubicacion;
}

function validar(entrada, valor) {
  let array = [];
  if (entrada === "marca") {
    for (let i = 0; i < marcas.length; i++) {
      if (
        marcas[i].nombre.includes(valor.toLowerCase()) ||
        marcas[i].nombre.includes(valor.toUpperCase())
      )
        array.push(marcas[i]);
    }
  }
  if (entrada === "modelo") {
    if (modelosMarca) {
      for (let i = 0; i < modelosMarca.length; i++) {
        if (
          modelosMarca[i].nombre.includes(valor.toLowerCase()) ||
          modelosMarca[i].nombre.includes(valor.toUpperCase())
        )
          array.push(modelosMarca[i]);
      }
    } else {
      for (let i = 0; i < modelos.length; i++) {
        if (
          modelos[i].nombre.includes(valor.toLowerCase()) ||
          modelos[i].nombre.includes(valor.toUpperCase())
        )
          array.push(modelos[i]);
      }
    }
  }
  if (entrada === "serie") {
    let idEmpresa = d
      .getElementById("reporte-create-empresa")
      .getAttribute("data-id");
    if (equiposModelo) {
      for (let i = 0; i < equiposModelo.length; i++) {
        if (
          equiposModelo[i]["num_serie"].includes(valor.toLowerCase()) ||
          equiposModelo[i]["num_serie"].includes(valor.toUpperCase())
        ) {
          if (idEmpresa) {
            if (equiposModelo[i]["id_empresa"] === idEmpresa)
              array.push(equipos[i]);
          } else array.push(equipos[i]);
        }
      }
    } else {
      for (let i = 0; i < equipos.length; i++) {
        if (
          equipos[i]["num_serie"].includes(valor.toLowerCase()) ||
          equipos[i]["num_serie"].includes(valor.toUpperCase())
        ) {
          if (idEmpresa) {
            if (equipos[i]["id_empresa"] === idEmpresa) array.push(equipos[i]);
          } else array.push(equipos[i]);
        }
      }
    }
  }
  return array;
}

export default async function autocompleteEquipo() {
  if (!location.pathname.includes("/reportes/create/")) return;

  empresas = await getEmpresas();
  marcas = await getMarcas();
  modelos = await getModelos();
  equipos = await getEquipos();

  $marca.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-marca").innerHTML = "";
    d.getElementById("aside-autocomplete-marca").style.display = "none";
    if (e.key === "Backspace" && $marca.value === "") return;
    let coincidencia = validar("marca", $marca.value);
    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = coincidencia[i].nombre;
      $option.id = "opcion-autocomplete-marca";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-marca").appendChild($fragmento);
    d.getElementById("aside-autocomplete-marca").style.display = "block";
  });

  $marca.addEventListener("change", (e) => {
    $marca.removeAttribute("data-id");
    $modelo.value = "";
    $modelo.removeAttribute("data-id");
    $numSerie.value = "";
    $numSerie.removeAttribute("data-id");
    $ubicacion.value = "";
    modelosMarca = null;
    equiposModelo = null;

    setTimeout(() => {
      d.getElementById("aside-autocomplete-marca").innerHTML = "";
      d.getElementById("aside-autocomplete-marca").style.display = "none";
    }, 200);
  });

  $modelo.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-modelo").innerHTML = "";
    d.getElementById("aside-autocomplete-modelo").style.display = "none";
    if (e.key === "Backspace" && $modelo.value === "") return;
    let coincidencia = validar("modelo", $modelo.value);
    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = `${coincidencia[i].nombre}`;
      $option.id = "opcion-autocomplete-modelo";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-modelo").appendChild($fragmento);
    d.getElementById("aside-autocomplete-modelo").style.display = "block";
  });

  $modelo.addEventListener("change", (e) => {
    $numSerie.value = "";
    $numSerie.removeAttribute("data-id");
    $ubicacion.value = "";
    equiposModelo = null;
    setTimeout(() => {
      d.getElementById("aside-autocomplete-modelo").innerHTML = "";
      d.getElementById("aside-autocomplete-modelo").style.display = "none";
    }, 200);
  });

  $numSerie.addEventListener("change", (e) => {
    $ubicacion.value = "";
    $numSerie.removeAttribute("data-id");
    setTimeout(() => {
      d.getElementById("aside-autocomplete-serie").innerHTML = "";
      d.getElementById("aside-autocomplete-serie").style.display = "none";
    }, 200);
  });

  $numSerie.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-serie").innerHTML = "";
    d.getElementById("aside-autocomplete-serie").style.display = "none";
    if (e.key === "Backspace" && $numSerie.value === "") return;
    let coincidencia = validar("serie", $numSerie.value);
    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = `${coincidencia[i]["num_serie"]}`;
      $option.id = "opcion-autocomplete-serie";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-serie").appendChild($fragmento);
    d.getElementById("aside-autocomplete-serie").style.display = "block";
  });
  d.addEventListener("click", (e) => {
    setTimeout(() => {
      handleClick(e);
    }, 100);
  });

  function handleClick(e) {
    if (e.target.matches("#opcion-autocomplete-marca")) {
      $marca.value = e.target.textContent;
      $marca.setAttribute("data-id", e.target.getAttribute("data-id"));

      modelosMarca = modelos.filter(
        (el) => el["id_marca"] === e.target.getAttribute("data-id")
      );
    }
    if (e.target.matches("#opcion-autocomplete-modelo")) {
      $modelo.value = e.target.textContent;
      $modelo.setAttribute("data-id", e.target.getAttribute("data-id"));
      equiposModelo = equipos.filter(
        (el) => el["id_modelo"] === e.target.getAttribute("data-id")
      );
      completeModelo();
    }
    if (e.target.matches("#opcion-autocomplete-serie")) {
      $numSerie.value = e.target.textContent;
      $numSerie.setAttribute("data-id", e.target.getAttribute("data-id"));
      completeEquipo();
    }
  }
}
