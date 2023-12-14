import api from "../../../helpers/app.js";
import {
  getClientes,
  getEmpresas,
} from "../../../impresoras/listado/js/listEquipos.js";

const d = document;

const { EMPRESAS, CLIENTES, USUARIOS } = api;

let empresas;
let clientes;
let clientesEmpresa = null;

const $empresa = d.getElementById("reporte-create-empresa");
const $cliente = d.getElementById("reporte-create-cliente");

//let inputFocus = null;

function completeCliente() {
  // console.log($cliente.value,);
  let idCliente = $cliente.getAttribute("data-id");
  let cliente = null;

  clientes.forEach((el) => {
    if (idCliente === el.id) cliente = el;
  });

  let idEmpresa = $empresa.getAttribute("data-id");
  if (!idEmpresa) {
    console.log("entre a set empresa");
    idEmpresa = cliente["id_empresa"];
    let empresa = null;

    empresas.forEach((el) => {
      if (idEmpresa === el.id) empresa = el;
    });

    $empresa.value = empresa.nombre;
    $empresa.setAttribute("data-id", empresa.id);
    d.getElementById("reporte-create-direccion").value = empresa.direccion;
  }

  d.getElementById("reporte-create-tel").value = cliente.telefono;
  d.getElementById("reporte-create-correo").value = cliente.correo;
}

function validar(entrada, valor) {
  if (entrada === "empresa") {
    let array = [];
    for (let i = 0; i < empresas.length; i++) {
      if (
        empresas[i].nombre.includes(valor.toLowerCase()) ||
        empresas[i].nombre.includes(valor.toUpperCase())
      )
        array.push(empresas[i]);
    }
    return array;
  }
  if (entrada === "cliente") {
    let array = [];
    if (clientesEmpresa) {
      for (let i = 0; i < clientesEmpresa.length; i++) {
        if (
          clientesEmpresa[i].nombre.includes(valor.toLowerCase()) ||
          clientesEmpresa[i].nombre.includes(valor.toUpperCase())
        )
          array.push(clientesEmpresa[i]);
      }
      return array;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre.toLowerCase().includes(valor.toLowerCase()))
          array.push(clientes[i]);
      }
      return array;
    }
  }
}

export default async function autocompleteCliente() {
  if (!location.pathname.includes("/reportes/create/")) return;

  empresas = await getEmpresas();
  clientes = await getClientes();

  $empresa.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-empresa").innerHTML = "";
    d.getElementById("aside-autocomplete-empresa").style.display = "none";
    if (e.key === "Backspace" && $empresa.value === "") return;
    let coincidencia = validar("empresa", $empresa.value);
    //console.log(coincidencia);
    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = coincidencia[i].nombre;
      $option.id = "opcion-autocomplete-empresa";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-empresa").appendChild($fragmento);
    d.getElementById("aside-autocomplete-empresa").style.display = "block";
  });

  $empresa.addEventListener("change", (e) => {
    $empresa.removeAttribute("data-id");
    $cliente.value = "";
    $cliente.removeAttribute("data-id");
    clientesEmpresa = null;
    d.getElementById("reporte-create-direccion").value = "";
    d.getElementById("reporte-create-tel").value = "";
    d.getElementById("reporte-create-correo").value = "";

    setTimeout(() => {
      d.getElementById("aside-autocomplete-empresa").innerHTML = "";
      d.getElementById("aside-autocomplete-empresa").style.display = "none";
    }, 200);
  });

  $cliente.addEventListener("keyup", (e) => {
    d.getElementById("aside-autocomplete-cliente").innerHTML = "";
    d.getElementById("aside-autocomplete-cliente").style.display = "none";
    if (e.key === "Backspace" && $cliente.value === "") return;
    let coincidencia = validar("cliente", $cliente.value);
    //console.log(coincidencia);
    const $fragmento = d.createDocumentFragment();
    for (let i = 0; i < coincidencia.length; i++) {
      const $option = d.createElement("p");
      $option.setAttribute("data-id", coincidencia[i].id);
      $option.textContent = `${coincidencia[i].nombre} ${coincidencia[i]["apellido_paterno"]}`;
      $option.id = "opcion-autocomplete-cliente";
      $fragmento.appendChild($option);
    }
    d.getElementById("aside-autocomplete-cliente").appendChild($fragmento);
    d.getElementById("aside-autocomplete-cliente").style.display = "block";
  });

  $cliente.addEventListener("change", (e) => {
    setTimeout(() => {
      d.getElementById("aside-autocomplete-cliente").innerHTML = "";
      d.getElementById("aside-autocomplete-cliente").style.display = "none";
      // console.log($cliente.value);
    }, 200);
  });

  d.addEventListener("click", (e) => {
    if (e.target.matches("#opcion-autocomplete-empresa")) {
      $empresa.value = e.target.textContent;
      $empresa.setAttribute("data-id", e.target.getAttribute("data-id"));
      let direccion = null;
      empresas.forEach((el) => {
        if (e.target.getAttribute("data-id") === el.id) {
          direccion = el.direccion;
        }
      });
      d.getElementById("reporte-create-direccion").value = direccion;
      clientesEmpresa = clientes.filter(
        (el) => el["id_empresa"] === e.target.getAttribute("data-id")
      );
      console.log(clientesEmpresa);
    }
    if (e.target.matches("#opcion-autocomplete-cliente")) {
      $cliente.value = e.target.textContent;
      $cliente.setAttribute("data-id", e.target.getAttribute("data-id"));
      // console.log($cliente);
      completeCliente();
    }
  });
}
