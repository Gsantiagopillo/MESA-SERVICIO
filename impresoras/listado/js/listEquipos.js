import api from "../../../helpers/app.js";

const d = document;

const { IMPRESORAS, DOMAIN, EMPRESAS, CLIENTES } = api;

export async function getMarcas() {
  try {
    let res = await fetch(`${IMPRESORAS}getMarcas.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error al obtener marcas`);
  }
}

export async function getModelos() {
  try {
    let res = await fetch(`${IMPRESORAS}getModelos.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error al obtener modelos`);
  }
}

export async function getEquipos() {
  try {
    let res = await fetch(`${IMPRESORAS}getEquipos.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error al obtener equipos`);
  }
}

export async function getClientes() {
  try {
    let res = await fetch(`${CLIENTES}getClientes.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error al obtener clientes`);
  }
}

export async function getEmpresas() {
  try {
    let res = await fetch(`${EMPRESAS}getEmpresas.php`),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return json;
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error al obtener empresas`);
  }
}

export default async function listEquipos() {
  if (!location.pathname.includes("impresoras/listado/listadoEquipos.html"))
    return;

  sessionStorage.removeItem("idEquipoGO"); //Elimina el id de modelo a ver o editar
  const idModelo = sessionStorage.getItem("idModeloGO");
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  try {
    let res = await fetch(`${IMPRESORAS}getEquipos.php`),
      json = await res.json(),
      marcas,
      modelos,
      empresas;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    if (type_user !== "1")
      d.getElementById("add-equipo").style.display = "none";

    if (json["tam"]) {
      const $h5 = d.createElement("h5");
      $h5.textContent = "NO HAY IMPRESORAS DADAS DE ALTA";
      const $equiposContent = d.getElementById("equipos-content");
      $equiposContent.insertAdjacentElement("afterbegin", $h5);
      d.getElementById("equipo-table").style.display = "none";

      return;
    }
    if (idModelo) json = json.filter((el) => el.id_modelo === idModelo);
    //console.log(json);

    marcas = await getMarcas();
    if (!marcas) throw { status: "no hay marcas", statusText: "no hay marcas" };

    modelos = await getModelos();
    if (!modelos)
      throw { status: "no hay modelos", statusText: "no hay modelos" };

    empresas = await getEmpresas();
    if (!empresas)
      throw { status: "no hay modelos", statusText: "no hay empresas" };

    let arrayModelos = [];
    modelos.forEach((el) => {
      let nomMarca, idMarca;

      for (let i = 0; i < marcas.length; i++) {
        if (el["id_marca"] === marcas[i].id) {
          nomMarca = marcas[i].nombre;
          idMarca = parseInt(marcas[i].id);
        }
      }

      let objModelo = {
        idModelo: `${el.id}`,
        modelo: `${el.nombre}`,
        idMarca,
        marca: `${nomMarca}`,
      };

      arrayModelos = [...arrayModelos, objModelo];
    });

    let arrayEquipos = [];
    let arrayEquipos2 = [];
    json.forEach((el) => {
      for (let i = 0; i < arrayModelos.length; i++) {
        if (el["id_modelo"] === arrayModelos[i].idModelo) {
          let objEquipo = { ...el, ...arrayModelos[i] };
          delete objEquipo.idModelo;
          arrayEquipos = [...arrayEquipos, objEquipo];
        }
      }
    });
    let a = 0;
    arrayEquipos.forEach((el) => {
      //console.log(arrayEquipos, a, el);
      a++;
      for (let i = 0; i < empresas.length; i++) {
        if (el["id_empresa"] === empresas[i].id) {
          let idEmpresa = empresas[i]["id"],
            nomEmpresa = empresas[i].nombre;
          let objEquipo = {
            ...el,
            idEmpresa,
            nomEmpresa,
          };
          arrayEquipos2 = [...arrayEquipos2, objEquipo];
        }
      }
    });
    //console.log(arrayEquipos);
    arrayEquipos = arrayEquipos2;
    arrayEquipos = arrayEquipos.sort((a, b) => b["idMarca"] - a["idMarca"]);
    // console.log(arrayEquipos);

    const $fragmento = d.createDocumentFragment();

    arrayEquipos.forEach((el) => {
      const $tr = d.createElement("tr"),
        $td1 = d.createElement("td"),
        $td2 = d.createElement("td"),
        $td3 = d.createElement("td"),
        $td4 = d.createElement("td"),
        $td5 = d.createElement("td"),
        $td6 = d.createElement("td"),
        $td7 = d.createElement("td"),
        $td8 = d.createElement("td"),
        $td9 = d.createElement("td"),
        $td10 = d.createElement("td"),
        $td11 = d.createElement("td");

      $td1.textContent = el.id;
      $td1.setAttribute("data-id", el.id);
      $td1.id = "td-equipo";
      $td2.textContent = el["num_serie"];
      $td2.setAttribute("data-id", el.id);
      $td2.id = "td-equipo";
      $td3.textContent = el.modelo;
      $td3.setAttribute("data-id", el.id);
      $td3.id = "td-equipo";
      $td4.textContent = el.marca;
      $td4.setAttribute("data-id", el.id);
      $td4.id = "td-equipo";
      $td5.textContent = el.dpi;
      $td5.setAttribute("data-id", el.id);
      $td5.id = "td-equipo";
      $td6.textContent = `${el.width} in.`;
      $td6.setAttribute("data-id", el.id);
      $td6.id = "td-equipo";
      $td7.textContent = `${el.nomEmpresa}`;
      $td7.setAttribute("data-id", el.id);
      $td7.id = "td-equipo";
      $td8.textContent = `${el.ubicacion}`;
      $td8.setAttribute("data-id", el.id);
      $td8.id = "td-equipo";
      $td9.textContent = `${el["num_part"]}`;
      $td9.setAttribute("data-id", el.id);
      $td9.id = "td-equipo";

      $tr.appendChild($td1);
      $tr.appendChild($td2);
      $tr.appendChild($td3);
      $tr.appendChild($td4);
      $tr.appendChild($td5);
      $tr.appendChild($td6);
      $tr.appendChild($td7);
      $tr.appendChild($td8);
      $tr.appendChild($td9);

      if (type_user == 1) {
        $td10.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill" data-id-edit="${el.id}">`;
        $td10.setAttribute("data-id-edit", el.id);
        $td10.id = "equipo-edit";

        $tr.appendChild($td10);
        $td11.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
        $td11.setAttribute("data-id-delete", el.id);
        $td11.id = "equipo-delete";

        $tr.appendChild($td11);
      } else {
        d.getElementById("tr-head-equipos").lastElementChild.style.display =
          "none";
        d.getElementById("tr-head-equipos").children[9].style.display = "none";
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
    alert(` ocurrio un error : ${message}`);
  }
}

export function deleteEquipo(e) {
  if (
    !e.target.matches("#equipo-delete") &&
    !e.target.matches("#equipo-delete *")
  )
    return;

  const id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}deleteEquipo.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (json.err) alert(` ocurrio un error al eliminar equipo`);
      else {
        alert(`equipo: ${json.id} eliminado correctamente`);
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar equipo`);
    });
}

export function equipoToEdit(e) {
  if (!e.target.matches("#equipo-edit") && !e.target.matches("#equipo-edit *"))
    return;

  let id = e.target.getAttribute("data-id-edit");
  sessionStorage.setItem("idEquipoGO", id);
  location.replace(`${DOMAIN}impresoras/edit/index.html`);
}
