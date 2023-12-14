import api from "../../../helpers/app.js";

const d = document;
const { EMPRESAS, DOMAIN } = api;

export default function createEmpresa(e) {
  //console.log(e);
  if (!e.target.matches("#form-create-empresa")) return;

  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-create-empresa"),
    nombre = $form.nombre.value,
    razonSocial = $form["razon-social"].value,
    rfc = $form.rfc.value,
    direccion = $form.direccion.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value;

  const formData = new FormData();

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

  fetch(`${EMPRESAS}createEmpresa.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      if (json.err) alert(` ocurrio un error al registrar la empresa`);
      else {
        alert(`empresa: ${json.nombre}  creada correctamente`);
        location.replace(`${DOMAIN}empresas/create/`);
      }
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al registrar la empresa`);
    });
}
