import api from "../../../helpers/app.js";
const d = document;

const { IMPRESORAS, EMPRESAS } = api;

let arrayMarcas = null,
  arrayModelos = null;

let idMarca = null;

async function optionsModelos(idModelo) {
  try {
    const $template = d.getElementById("template-form-equipo").content;
    const $select = $template.getElementById("modelo");
    const $fragmento = d.createDocumentFragment();
    const $formCreate = d.querySelector(".form-create-marca");

    let res = await fetch(`${IMPRESORAS}getModelos.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.tam)
      throw { status: "vacio", statusText: "no hay modelos dados de alta" };

    json.forEach((el) => {
      const $opcion = d.createElement("option");
      $opcion.textContent = el.nombre;
      $opcion.value = el.id;
      if (idModelo && idModelo == el.id) {
        $select.options[$select.selectedIndex].removeAttribute("selected");
        // $opcion.selected = "selected";
        $opcion.setAttribute("selected", "selected");
        $select.disabled = true;
        idMarca = el["id_marca"];
      }
      $select.appendChild($opcion);
    });

    let $clone = d.importNode($template, true);
    $fragmento.appendChild($clone);
    $formCreate.appendChild($fragmento);

    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error: ${message} `);
  }
}
async function optionsMarcas() {
  try {
    let res = await fetch(`${IMPRESORAS}getMarcas.php`),
      json = await res.json();
    arrayMarcas = json;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.tam)
      throw {
        status: "vacio",
        statusText: "no hay marcas dados de alta",
      };

    const $select = d.getElementById("marca");
    const $fragmento = d.createDocumentFragment();

    json.forEach((el) => {
      const $opcion = d.createElement("option");
      $opcion.textContent = el.nombre;
      $opcion.value = el.id;
      if (idMarca && idMarca == el.id) {
        $select.options[$select.selectedIndex].removeAttribute("selected");
        // $opcion.selected = "selected";
        $opcion.setAttribute("selected", "selected");
        $select.disabled = true;
      }
      $fragmento.appendChild($opcion);
    });

    $select.append($fragmento);
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error `);
  }
}

async function optionsEmpresas(marcaSelected = "") {
  try {
    let res = await fetch(`${EMPRESAS}getEmpresas.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.tam)
      throw {
        status: "vacio",
        statusText: "no hay empresas dadas de alta",
      };

    const $select = d.getElementById("equipo-empresa");
    const $fragmento = d.createDocumentFragment();

    json.forEach((el) => {
      const $opcion = d.createElement("option");
      $opcion.textContent = el.nombre;
      $opcion.value = el.id;

      $fragmento.appendChild($opcion);
    });

    $select.append($fragmento);
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error:message `);
  }
}

function changeModelos(id) {
  let newArray = arrayModelos.filter((model) => model["id_marca"] == id);
  //console.log(newArray);
  const $select = d.getElementById("modelo"),
    $fragmento = d.createDocumentFragment();
  $select.innerHTML = "";

  newArray.forEach((el) => {
    const $opcion = d.createElement("option");
    $opcion.textContent = el.nombre;
    $opcion.value = el.id;
    $fragmento.appendChild($opcion);
  });
  $select.appendChild($fragmento);
  let elems = document.querySelectorAll("select");
  let instances = M.FormSelect.init(elems);
}
function changeMarcas(id) {
  let idMarca = arrayModelos.filter((model) => model["id"] == id);
  idMarca = idMarca["0"]["id_marca"];
  let newArray = arrayMarcas.filter((marca) => marca["id"] == idMarca);
  //console.log(newArray);
  const $select = d.getElementById("marca"),
    $fragmento = d.createDocumentFragment();
  $select.innerHTML = "";

  newArray.forEach((el) => {
    const $opcion = d.createElement("option");
    $opcion.textContent = el.nombre;
    $opcion.value = el.id;
    $fragmento.appendChild($opcion);
  });
  $select.appendChild($fragmento);
  let elems = document.querySelectorAll("select");
  let instances = M.FormSelect.init(elems);
}

export default async function createEquipo(e) {
  if (!e.target.matches("#add-equipo") && !e.target.matches("#add-equipo *"))
    return;

  const $btnAdd = d.getElementById("add-equipo"),
    $btnCreate = d.getElementById("create-equipo"),
    $sectionCreate = d.querySelector(".section-add-equipos");

  $btnAdd.classList.toggle("d-none");
  $btnCreate.classList.toggle("d-none");

  const idModelo = sessionStorage.getItem("idModeloGO") || null;

  arrayModelos = await optionsModelos(idModelo);
  if (!arrayModelos) return;

  $sectionCreate.classList.add("flex-column");
  $sectionCreate.classList.remove("justify-content-end");

  optionsMarcas();

  let empresas = await optionsEmpresas();
  if (!empresas) return;
}

export function UploadEquipo(e) {
  if (
    !e.target.matches("#create-equipo") &&
    !e.target.matches("#create-equipo *")
  )
    return;

  const idModelo = d.getElementById("modelo").value,
    numSerie = d.getElementById("serie").value,
    dpi = d.getElementById("dpi").value,
    width = d.getElementById("width-head").value,
    empresa = d.getElementById("equipo-empresa").value;

  if (
    idModelo === "" ||
    numSerie === "" ||
    dpi === "" ||
    width === "" ||
    empresa === ""
  ) {
    alert("llena todos los campos");
    return;
  }

  document.querySelector(".load").style.display = "flex";

  const formData = new FormData();
  formData.append("modelo", idModelo);
  formData.append("numSerie", numSerie);
  formData.append("dpi", dpi);
  formData.append("width", width);
  formData.append("idEmpresa", empresa);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}createEquipo.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      alert(`Equipo creado: ${json.equipo}`);
      location.reload();
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al registrar equipo`);
    });
}

d.addEventListener("change", (e) => {
  if (location.pathname.includes("/listadoEquipos.html")) {
    if (e.target.matches("#marca")) changeModelos(e.target.value);
    if (e.target.matches("#modelo")) changeMarcas(e.target.value);
  }
});
