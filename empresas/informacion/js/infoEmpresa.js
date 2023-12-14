import api from "../../../helpers/app.js";

const d = document;

export default function infoEmpresa() {
  if (
    !location.pathname.includes("empresas/edit") &&
    !location.pathname.includes("empresas/informacion")
  )
    return;
  if (!sessionStorage.getItem("idEmpresaGO")) return;

  const empresa = sessionStorage.getItem("idEmpresaGO");

  const { DOMAIN, EMPRESAS } = api;

  const formData = new FormData();
  formData.append("id", empresa);
  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${EMPRESAS}getEmpresa.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);

      const $form =
        d.getElementById("form-create-empresa") ||
        d.getElementById("form-edit-empresa");
      if ($form["id-empresa"]) $form["id-empresa"].value = json["id"];

      $form.nombre.value = json.nombre;
      $form["razon-social"].value = json["razon_social"];
      $form["rfc"].value = json["rfc"];
      $form["direccion"].value = json["direccion"];
      $form["telefono"].value = json["telefono"];
      $form["correo"].value = json["correo"];

      $form.nombre.style.color = "black";
      $form["razon-social"].style.color = "black";
      $form["rfc"].style.color = "black";
      $form["direccion"].style.color = "black";
      $form["telefono"].style.color = "black";
      $form["correo"].style.color = "black";
    });
}
