import api from "../../../helpers/app.js";

const d = document;

export default function CreateCliente() {
  if (!location.pathname.includes("clientes/create")) return;

  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-create-client"),
    idEmpresa = $form.empresa.value,
    nombre = $form.nombre.value,
    apellidoPaterno = $form["apellido-paterno"].value,
    apellidoMaterno = $form["apellido-materno"].value,
    puesto = $form.puesto.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value;

  const { CLIENTES, DOMAIN } = api;

  const formData = new FormData();

  formData.append("empresa", idEmpresa);
  formData.append("nombre", nombre);
  formData.append("apellidoPaterno", apellidoPaterno);
  formData.append("apellidoMaterno", apellidoMaterno);
  formData.append("puesto", puesto);
  formData.append("telefono", telefono);
  formData.append("correo", correo);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${CLIENTES}createCliente.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      if (json.err) alert(` ocurrio un error al registrar cliente`);
      else {
        alert(`cliente: ${json.nombre} ${json.apellido} creado correctamente`);
        location.replace(`${DOMAIN}clientes/create/`);
      }
    })
    .catch((err) => {
      console.log(err);
      document.querySelector(".load").style.display = "none";
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al registrar cliente`);
    });
}
