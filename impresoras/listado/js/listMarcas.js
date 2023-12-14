import api from "../../../helpers/app.js";
const d = document;
const { IMPRESORAS, DOMAIN } = api;

export default function listMarcas() {
  if (!location.pathname.includes("impresoras/listado/listMarca.html")) return;
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  const formData = new FormData();

  let id = sessionStorage.getItem("userToDocs");
  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}getMarcas.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      //  console.log(json);
      if (json["tam"]) {
        const $h5 = d.createElement("h5");
        $h5.textContent = "NO HAY MARCAS DADAS DE ALTA";
        const $marcasContent = d.getElementById("marcas-content");
        $marcasContent.insertAdjacentElement("afterbegin", $h5);
        d.getElementById("marca-table").style.display = "none";

        if (type_user !== "1")
          d.getElementById("add-marca").style.display = "none";
      } else {
        const $template = d.getElementById("marcas-template").content,
          $fragmento = document.createDocumentFragment();

        json.forEach((el) => {
          // console.log(el);
          let nombre = el.nombre;
          $template.getElementById("marca-name").textContent = nombre;
          $template.getElementById("marca-name").setAttribute("data-id", el.id);
          let $clone;
          if (type_user === "1") {
            $template
              .getElementById("marca-delete")
              .setAttribute("data-id", el.id);
            $clone = d.importNode($template, true);
          } else {
            $clone = d.importNode($template, true);
            const $trMarcas = $clone.getElementById("tr-marcas");
            $trMarcas.removeChild($trMarcas.lastElementChild);
            const $trHead = d.getElementById("tr-head-marcas");
            $trHead.removeChild($trHead.lastChild);
            d.getElementById("add-marca").style.display = "none";
          }
          $fragmento.appendChild($clone);
        });

        const $tbodyDocs = d.getElementById("tbody-marcas");
        $tbodyDocs.appendChild($fragmento);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al obtener docs`);
    });
}

export function goToMarca(e) {
  if (!e.target.matches("#marca-name") && !e.target.matches("#marca-name *"))
    return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idMarcaGO", id);
  location.replace(`${DOMAIN}impresoras/listado/listadoModelos.html`);
}

export function deleteMarca(e) {
  if (!e.target.matches("#marca-delete")) return;

  const id = e.target.getAttribute("data-id");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}deleteMarca.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (json.err) alert(` ocurrio un error al eliminar marca`);
      else {
        alert(`marca: ${json.id} eliminado correctamente`);
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar marca`);
    });
}
