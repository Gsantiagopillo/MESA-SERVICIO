import api from "../../../helpers/app.js";

const d = document;

export default async function infoCliente() {
  if (
    !location.pathname.includes("clientes/edit") &&
    !location.pathname.includes("clientes/informacion")
  )
    return;
  if (!sessionStorage.getItem("idClienteGO")) return;

  const cliente = sessionStorage.getItem("idClienteGO");

  const { DOMAIN, CLIENTES, EMPRESAS } = api;

  const formData = new FormData();
  formData.append("id", cliente);

  let options = {
    method: "POST",
    body: formData,
  };

  try {
    let res = await fetch(`${CLIENTES}getCliente.php`, options),
      json = await res.json(),
      empresas;

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    const $form =
      d.getElementById("form-create-client") ||
      d.getElementById("form-edit-client");

    if ($form["id-client"]) $form["id-client"].value = json["id"];

    if (location.pathname.includes("clientes/informacion")) {
      try {
        let res2 = await fetch(`${EMPRESAS}getEmpresas.php`),
          json2 = await res2.json();

        if (!res2.ok)
          throw { status: res2.status, statusText: res2.statusText };

        empresas = json2;
      } catch (err) {
        console.log(err);
        let message = err.statusText || "ocurrio un error";
        console.log(` error ${err.status} : ${message}`);
        alert(` ocurrio un error `);
      }
      if (!empresas)
        throw { status: "no hay empresas", statusText: "no hay empresas" };

      let nombreEmpresa = "";

      for (let i = 0; i < empresas.length; i++) {
        if (empresas[i].id == json["id_empresa"]) {
          nombreEmpresa = empresas[i].nombre;
          break;
        }
      }
      $form.empresa.value = nombreEmpresa;
    } else {
      $form.empresa.value = json["id_empresa"];
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, options);
    }
    console.log(json);

    $form.nombre.value = json.nombre;
    $form["apellido-paterno"].value = json["apellido_paterno"];
    $form["apellido-materno"].value = json["apellido_materno"];
    $form["puesto"].value = json["puesto"];
    $form["telefono"].value = json["telefono"];
    $form["correo"].value = json["correo"];

    $form.nombre.style.color = "black";
    $form["apellido-paterno"].style.color = "black";
    $form["apellido-materno"].style.color = "black";
    $form["puesto"].style.color = "black";
    $form["telefono"].style.color = "black";
    $form["correo"].style.color = "black";
    $form["empresa"].style.color = "black";
  } catch (err) {
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error `);
  }
}
