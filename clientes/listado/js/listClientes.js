import api from "../../../helpers/app.js";

const d = document;

const { CLIENTES, DOMAIN, EMPRESAS } = api;

export default async function listClientes() {
  if (!location.pathname.includes("/clientes/listado/")) return;

  sessionStorage.removeItem("idClienteGO"); //Elimina el id de cliente a ver o editar
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  try {
    let res = await fetch(`${CLIENTES}getClientes.php`),
      json = await res.json(),
      empresas;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    try {
      let res2 = await fetch(`${EMPRESAS}getEmpresas.php`),
        json2 = await res2.json();

      if (!res2.ok) throw { status: res2.status, statusText: res2.statusText };

      empresas = json2;
    } catch (err) {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error `);
    }
    if (!empresas)
      throw { status: "no hay empresas", statusText: "no hay empresas" };

    const $fragmento = d.createDocumentFragment();

    if (json.length === 0) {
      const $h5 = d.createElement("h5");
      $h5.textContent = "NO HAY CLIENTES QUE MOSTRAR";
      $h5.style.textAlign = "center";
      d.querySelector("table").insertAdjacentElement("afterend", $h5);
    }

    json.forEach((el) => {
      const $tr = d.createElement("tr"),
        $td1 = d.createElement("td"),
        $td2 = d.createElement("td"),
        $td3 = d.createElement("td"),
        $td4 = d.createElement("td"),
        $td5 = d.createElement("td"),
        $td6 = d.createElement("td");

      let nombreEmpresa = "";

      for (let i = 0; i < empresas.length; i++) {
        if (empresas[i].id == el["id_empresa"]) {
          nombreEmpresa = empresas[i].nombre;
          break;
        }
      }

      $td1.textContent = el.id;
      $td1.setAttribute("data-id", el.id);
      $td1.id = "td-cliente";
      $td2.textContent = nombreEmpresa;
      $td2.setAttribute("data-id", el.id);
      $td2.id = "td-cliente";
      $td3.textContent = el.nombre;
      $td3.setAttribute("data-id", el.id);
      $td3.id = "td-cliente";
      $td4.textContent = el["apellido_paterno"];
      $td4.setAttribute("data-id", el.id);
      $td4.id = "td-cliente";
      $td5.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="edit-svg" data-id="${el.id}">`;
      $td5.setAttribute("data-id", el.id);
      $td5.id = "td-cliente-edit";
      $td6.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
      $td6.setAttribute("data-id-delete", el.id);
      $td6.id = "td-cliente-delete";

      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);
      $tr.appendChild($td4);

      if (type_user === "1") {
        $tr.appendChild($td5);
        $tr.appendChild($td6);
      } else {
        d.getElementById("clientes-edit").style.display = "none";
        d.getElementById("clientes-delete").style.display = "none";
      }

      $tr.classList.add("cursor-pointer");
      $tr.id = "tr-user";
      $tr.setAttribute("data-id", el.id);

      $fragmento.appendChild($tr);
    });

    d.getElementById("tbody").appendChild($fragmento);
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error `);
  }
}

export function goToClient(e) {
  if (!e.target.matches("#td-cliente") && !e.target.matches("#td-cliente *"))
    return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idClienteGO", id);
  location.replace(`${DOMAIN}clientes/informacion`);
}
