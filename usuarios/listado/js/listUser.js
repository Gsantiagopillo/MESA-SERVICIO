import api from "../../../helpers/app.js";

const d = document;

const { USUARIOS, DOMAIN } = api;

export default function listUser() {
  if (!location.pathname.includes("/usuarios/listado/")) return;

  sessionStorage.removeItem("idUserGO"); //Elimina el id de usuario a ver o editar

  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  fetch(`${USUARIOS}getUsuarios.php`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      //console.log(json);
      const $fragmento = d.createDocumentFragment();

      json.forEach((el) => {
        const $tr = d.createElement("tr"),
          $td1 = d.createElement("td"),
          $td2 = d.createElement("td"),
          $td3 = d.createElement("td"),
          $td4 = d.createElement("td"),
          $td5 = d.createElement("td"),
          $td6 = d.createElement("td"),
          $td7 = d.createElement("td");

        $td1.textContent = el.id;
        $td1.setAttribute("data-id", el.id);
        $td1.id = "td-user";
        $td2.textContent = el.nombre;
        $td2.setAttribute("data-id", el.id);
        $td2.id = "td-user";
        $td3.textContent = el["apellido_paterno"];
        $td3.setAttribute("data-id", el.id);
        $td3.id = "td-user";
        $td4.textContent = el["apellido_materno"];
        $td4.setAttribute("data-id", el.id);
        $td4.id = "td-user";
        $td5.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="edit-svg" data-id="${el.id}">`;
        $td5.setAttribute("data-id", el.id);
        $td5.id = "td-user-edit";
        $td6.innerHTML = `<img src="${DOMAIN}assets/docs.svg" class="img-auto" alt="archive-fill" data-id-docs="${el.id}">`;
        $td6.setAttribute("data-id-docs", el.id);
        $td6.id = "td-user-docs";
        $td7.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
        $td7.setAttribute("data-id-delete", el.id);
        $td7.id = "td-user-delete";

        $tr.appendChild($td1);
        $tr.appendChild($td2);
        $tr.appendChild($td3);
        $tr.appendChild($td4);
        $tr.appendChild($td6);

        if (type_user === "1") {
          $tr.appendChild($td5);
          $tr.appendChild($td7);
        } else {
          d.getElementById("usuarios-delete").style.display = "none";
          d.getElementById("usuarios-edit").style.display = "none";
        }

        $tr.classList.add("cursor-pointer");
        $tr.id = "tr-user";
        $tr.setAttribute("data-id", el.id);

        $fragmento.appendChild($tr);
      });

      d.getElementById("tbody").appendChild($fragmento);
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error`);
    });
}

export function goToUser(e) {
  if (!e.target.matches("#td-user") && !e.target.matches("#td-user *")) return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idUserGO", id);
  location.replace(`${DOMAIN}usuarios/informacion`);
}
