import api from "../../../helpers/app.js";

const d = document;

const { DOMAIN, EMPRESAS, CLIENTES } = api;

export default function setEmpresa() {
  if (
    location.pathname.includes("clientes/create") ||
    location.pathname.includes("clientes/edit")
  ) {
    fetch(`${EMPRESAS}getEmpresas.php`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        // console.log(json);
        const $form =
          d.getElementById("form-create-client") ||
          d.getElementById("form-edit-client");
        const $select = $form.empresa;
        const $fragmento = document.createDocumentFragment();

        json.forEach((el) => {
          const $opcion = d.createElement("option");
          $opcion.textContent = el.nombre;
          $opcion.value = el.id;
          $fragmento.appendChild($opcion);
        });

        $select.appendChild($fragmento);
        // console.log($select);
        let elems = document.querySelectorAll("select");
        let instances = M.FormSelect.init(elems);
      });
  }

  if (location.pathname.includes("reportes/listado")) {
    fetch(`${EMPRESAS}getEmpresas.php`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        // console.log(json);
        const $select = d.getElementById("filtro-empresa");
        const $fragmento = document.createDocumentFragment();

        json.forEach((el) => {
          const $opcion = d.createElement("option");
          $opcion.textContent = el.nombre;
          $opcion.value = el.id;
          $fragmento.appendChild($opcion);
        });

        $select.appendChild($fragmento);
        // console.log($select);
        let elems = document.querySelectorAll("select");
        let instances = M.FormSelect.init(elems);
      });
  }
}
