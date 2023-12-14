import api from "../../../helpers/app.js";

const d = document;

const { IMPRESORAS, DOMAIN } = api;

export default async function listModelos() {
  if (!location.pathname.includes("impresoras/listado/listadoModelos.html"))
    return;

  sessionStorage.removeItem("idModelosGO"); //Elimina el id de modelo a ver o editar
  const idMarca = sessionStorage.getItem("idMarcaGO");
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  try {
    let res = await fetch(`${IMPRESORAS}getModelos.php`),
      json = await res.json(),
      marcas;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    if (type_user !== "1")
      d.getElementById("add-modelo").style.display = "none";

    if (json["tam"]) {
      const $h5 = d.createElement("h5");
      $h5.textContent = "NO HAY MODELOS DADOS DE ALTA";
      const $modelosContent = d.getElementById("modelos-content");
      $modelosContent.insertAdjacentElement("afterbegin", $h5);
      d.getElementById("modelo-table").style.display = "none";

      return;
    }

    if (idMarca) json = json.filter((el) => el.id_marca === idMarca);
    //console.log(json);
    try {
      let res2 = await fetch(`${IMPRESORAS}getMarcas.php`),
        json2 = await res2.json();

      if (!res2.ok) throw { status: res2.status, statusText: res2.statusText };

      marcas = json2;
    } catch (err) {}
    if (!marcas) throw { status: "no hay marcas", statusText: "no hay marcas" };

    const $fragmento = d.createDocumentFragment();

    json.forEach((el) => {
      const $tr = d.createElement("tr"),
        $td1 = d.createElement("td"),
        $td2 = d.createElement("td"),
        $td3 = d.createElement("td"),
        $td4 = d.createElement("td");

      let nombreMarca = "";

      for (let i = 0; i < marcas.length; i++) {
        if (marcas[i].id == el["id_marca"]) {
          nombreMarca = marcas[i].nombre;
          break;
        }
      }

      $td1.textContent = el.id;
      $td1.setAttribute("data-id", el.id);
      $td1.id = "td-modelo";
      $td2.textContent = el.nombre;
      $td2.setAttribute("data-id", el.id);
      $td2.id = "td-modelo";
      $td3.textContent = nombreMarca;
      $td3.setAttribute("data-id", el.id);
      $td3.id = "td-modelo";

      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);

      if (type_user === "1") {
        $td4.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
        $td4.setAttribute("data-id-delete", el.id);
        $td4.id = "modelo-delete";

        $tr.appendChild($td4);
      } else {
        d.getElementById("tr-head-modelos").lastElementChild.style.display =
          "none";
      }

      $tr.classList.add("cursor-pointer");
      $tr.id = "tr-modelo";
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

export function goToModelo(e) {
  if (!e.target.matches("#td-modelo") && !e.target.matches("#td-modelo *"))
    return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idModeloGO", id);
  location.replace(`${DOMAIN}impresoras/listado/listadoEquipos.html`);
}

export function deleteModelo(e) {
  if (
    !e.target.matches("#modelo-delete") &&
    !e.target.matches("#modelo-delete *")
  )
    return;

  const id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}deleteModelo.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (json.err) alert(` ocurrio un error al eliminar modelo`);
      else {
        alert(`modelo: ${json.id} eliminado correctamente`);
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar modelo`);
    });
}
