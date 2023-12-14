import api from "../../../helpers/app.js";

const d = document;

const { EMPRESAS, DOMAIN } = api;

export default function listEmpresas() {
  if (!location.pathname.includes("/empresas/listado/")) return;

  sessionStorage.removeItem("idEmpresaGO"); //Elimina el id de usuario a ver o editar

  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  fetch(`${EMPRESAS}getEmpresas.php`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      //console.log(json);
      const $h5 = d.createElement("h5");
      $h5.textContent = "NO HAY EMPRESAS DADAS DE ALTA";
      $h5.style.textAlign = "center";

      if (json.length === 0) {
        d.querySelector(".table").insertAdjacentElement("afterend", $h5);
      }

      const $fragmento = d.createDocumentFragment();

      json.forEach((el) => {
        const $tr = d.createElement("tr"),
          $td1 = d.createElement("td"),
          $td2 = d.createElement("td"),
          $td3 = d.createElement("td"),
          $td4 = d.createElement("td"),
          $td5 = d.createElement("td");

        $td1.textContent = el.id;
        $td1.setAttribute("data-id", el.id);
        $td1.id = "td-empresa";
        $td2.textContent = el.nombre;
        $td2.setAttribute("data-id", el.id);
        $td2.id = "td-empresa";
        $td3.textContent = el["razon_social"];
        $td3.setAttribute("data-id", el.id);
        $td3.id = "td-empresa";
        $td4.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill"  data-id="${el.id}">`;
        $td4.setAttribute("data-id", el.id);
        $td4.id = "td-empresa-edit";
        $td5.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
        $td5.setAttribute("data-id-delete", el.id);
        $td5.id = "td-empresa-delete";

        $tr.appendChild($td1);
        $tr.appendChild($td2);
        $tr.appendChild($td3);

        if (type_user === "1") {
          $tr.appendChild($td4);
          $tr.appendChild($td5);
        } else {
          d.getElementById("empresas-edit").style.display = "none";
          d.getElementById("empresas-delete").style.display = "none";
        }

        $tr.classList.add("cursor-pointer");
        $tr.id = "tr-empresa";
        $tr.setAttribute("data-id", el.id);

        $fragmento.appendChild($tr);
      });

      d.getElementById("tbody").appendChild($fragmento);
    });
}

export function goToEmpresa(e) {
  if (!e.target.matches("#td-empresa") && !e.target.matches("#td-empresa *"))
    return;

  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idEmpresaGO", id);
  location.replace(`${DOMAIN}empresas/informacion`);
}
