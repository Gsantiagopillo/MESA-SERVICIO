import api from "../../../helpers/app.js";
const d = document;

const { IMPRESORAS } = api;

export default async function createModelo(e) {
  if (!e.target.matches("#add-modelo") && !e.target.matches("#add-modelo *"))
    return;
  const $btnAdd = d.getElementById("add-modelo"),
    $btnCreate = d.getElementById("create-modelo"),
    $sectionCreate = d.querySelector(".section-add-modelos");

  $btnAdd.classList.toggle("d-none");
  $btnCreate.classList.toggle("d-none");

  const idMarca = sessionStorage.getItem("idMarcaGO") || null;

  try {
    let res = await fetch(`${IMPRESORAS}getMarcas.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.tam)
      throw { status: "vacio", statusText: "no hay marcas dadas de alta" };

    const $template = d.getElementById("template-form-modelo").content;
    const $select = $template.getElementById("marca");
    const $fragmento = d.createDocumentFragment();
    const $formCreate = d.querySelector(".form-create-marca");

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
      $select.appendChild($opcion);
    });

    //console.log($select);
    let $clone = d.importNode($template, true);
    $fragmento.appendChild($clone);
    $formCreate.appendChild($fragmento);

    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);

    $sectionCreate.classList.add("flex-column");
    $sectionCreate.classList.remove("justify-content-end");
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error `);
  }
}

export function UploadModelo(e) {
  if (
    !e.target.matches("#create-modelo") &&
    !e.target.matches("#create-modelo *")
  )
    return;

  const $nombreModelo = d.getElementById("modelo"),
    $selectMarca = d.getElementById("marca");
  let idMarca = $selectMarca.value;

  //console.log(idMarca, typeof idMarca);

  if (idMarca === "" || $nombreModelo.value === "") {
    alert("debes llenar todos los campos");
    return;
  }

  document.querySelector(".load").style.display = "flex";

  const formData = new FormData();
  formData.append("idMarca", idMarca);
  formData.append("modelo", $nombreModelo.value);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}createModelo.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      alert(`Modelo creado: ${json.modelo}`);
      location.reload();
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al registrar modelo`);
    });
}
