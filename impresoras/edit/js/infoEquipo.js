import api from "../../../helpers/app.js";
import {
  getEmpresas,
  getMarcas,
  getModelos,
} from "../../listado/js/listEquipos.js";

const { DOMAIN, EMPRESAS, IMPRESORAS } = api;
const d = document;
const impresora = sessionStorage.getItem("idEquipoGO");

export default async function infoEquipo() {
  if (
    !location.pathname.includes("impresoras/edit") &&
    !sessionStorage.getItem("idEquipoGO")
  )
    return;

  console.log("entre");
  const formData = new FormData();

  formData.append("id", impresora);
  let options = {
    method: "POST",
    body: formData,
  };

  try {
    let res = await fetch(`${IMPRESORAS}getEquipo.php`, options);
    let json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (!json) throw { status: res.status, statusText: `no existe el equipo` };

    let modelos = await getModelos();
    if (!modelos)
      throw { status: "no hay modelos", statusText: "no hay modelos" };
    modelos = modelos.filter((modelo) => modelo.id == json["id_modelo"]);
    modelos = modelos["0"];

    let marcas = await getMarcas();
    if (!marcas) throw { status: "no hay marcas", statusText: "no hay marcas" };
    marcas = marcas.filter((marca) => marca.id == modelos["id_marca"]);
    marcas = marcas["0"];

    let empresas = await getEmpresas();
    if (!empresas)
      throw { status: "no hay empresas", statusText: "no hay empresas" };

    const $form = d.getElementById("form-edit-equipo");

    $form["id-equipo"].value = json.id;
    $form["marca"].value = marcas.nombre;
    $form["modelo"].value = modelos.nombre;
    $form["serie"].value = json["num_serie"];
    $form["width-head"].value = `${json["width"]} in.`;
    $form["ubicacion"].value = json["ubicacion"];
    $form["num-part"].value = json["num_part"];
    $form["dpi"].options[$form["dpi"].selectedIndex].removeAttribute(
      "selected"
    );

    let option = $form["dpi"].querySelectorAll("option");
    option.forEach((el) => {
      if (el.value === json.dpi) el.setAttribute("selected", "selected");
    });
    const $fragmento = d.createDocumentFragment();
    empresas.forEach((el) => {
      const $opcion = d.createElement("option");
      $opcion.textContent = el.nombre;
      $opcion.value = el.id;
      if (json["id_empresa"] == el.id) {
        $form["equipo-empresa"].options[
          $form["equipo-empresa"].selectedIndex
        ].removeAttribute("selected");
        $opcion.setAttribute("selected", "selected");
      }
      $fragmento.appendChild($opcion);
    });

    $form["equipo-empresa"].appendChild($fragmento);
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error : ${message}`);
  }
}
