import api from "../../../helpers/app.js";

const d = document;
const { CLIENTES, DOMAIN } = api;

export default function editCliente() {
  if (!location.pathname.includes("clientes/edit")) return;

  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-edit-client"),
    idCliente = $form["id-client"].value,
    idEmpresa = $form.empresa.value,
    nombre = $form.nombre.value,
    apellidoPaterno = $form["apellido-paterno"].value,
    apellidoMaterno = $form["apellido-materno"].value,
    puesto = $form.puesto.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value;

  const formData = new FormData();

  formData.append("idCliente", idCliente);
  formData.append("empresa", idEmpresa);
  formData.append("nombre", nombre);
  formData.append("apellidoPaterno", apellidoPaterno);
  formData.append("apellidoMaterno", apellidoMaterno);
  formData.append("puesto", puesto);
  formData.append("telefono", telefono);
  formData.append("correo", correo);

  console.log(
    idCliente,
    idEmpresa,
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    puesto,
    telefono,
    correo
  );

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${CLIENTES}editCliente.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      if (json.err) alert(` ocurrio un error al editar cliente`);
      else {
        alert(`cliente: ${json.nombre} ${json.apellido} editado correctamente`);
        location.replace(`${DOMAIN}clientes/edit/`);
      }
    })
    .catch((err) => {
      console.log(err);
      document.querySelector(".load").style.display = "none";
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al editar cliente`);
    });
}

export function clienteToEdit(e) {
  if (
    !e.target.matches("#td-cliente-edit") &&
    !e.target.matches("#td-cliente-edit *")
  )
    return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idClienteGO", id);
  location.replace(`${DOMAIN}clientes/edit`);
}
