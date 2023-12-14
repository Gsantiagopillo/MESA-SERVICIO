import api from "../../../helpers/app.js";
const d = document;
const { EMPRESAS, DOMAIN } = api;

export default function editEmpresa(e) {
  if (!e.target.matches("#form-edit-empresa")) return;

  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-edit-empresa"),
    id = $form["id-empresa"].value,
    nombre = $form.nombre.value,
    razonSocial = $form["razon-social"].value,
    rfc = $form.rfc.value,
    direccion = $form.direccion.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value;

  const formData = new FormData();

  formData.append("id", id);
  formData.append("nombre", nombre);
  formData.append("razonSocial", razonSocial);
  formData.append("rfc", rfc);
  formData.append("direccion", direccion);
  formData.append("telefono", telefono);
  formData.append("correo", correo);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${EMPRESAS}editEmpresa.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      if (json.err) alert(` ocurrio un error al editar empresa`);
      else {
        alert(`Empresa: ${json.nombre}  editada correctamente`);
        location.replace(`${DOMAIN}empresas/edit/`);
      }
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al editar empresa`);
    });
}

export function empresaToEdit(e) {
  if (
    !e.target.matches("#td-empresa-edit") &&
    !e.target.matches("#td-empresa-edit *")
  )
    return;

  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idEmpresaGO", id);
  location.replace(`${DOMAIN}empresas/edit`);
}
