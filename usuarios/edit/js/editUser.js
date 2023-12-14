import api from "../../../helpers/app.js";
const d = document;
const { USUARIOS, DOMAIN } = api;

export default function editUser(e) {
  if (
    !e.target.matches("#form-edit-user") &&
    !e.target.matches("#form-edit-user *")
  )
    return;
  
  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-edit-user"),
    id = $form["id-user"].value,
    nombre = $form.nombre.value,
    apellidoPaterno = $form["apellido-paterno"].value,
    apellidoMaterno = $form["apellido-materno"].value,
    puesto = $form.puesto.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value,
    passw = $form.passw.value,
    tipo = $form.tipo.value;

  const formData = new FormData();

  formData.append("id", id);
  formData.append("nombre", nombre);
  formData.append("apellidoPaterno", apellidoPaterno);
  formData.append("apellidoMaterno", apellidoMaterno);
  formData.append("puesto", puesto);
  formData.append("telefono", telefono);
  formData.append("correo", correo);
  if (passw.length > 0) formData.append("passw", passw);
  formData.append("tipoUsuario", tipo);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${USUARIOS}editUsuario.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {

      document.querySelector(".load").style.display = "none";
      if (json.err) alert(` ocurrio un error al editar usuario`);
      else {
        alert(`usuario: ${json.nombre} ${json.apellido} editado correctamente`);
        location.replace(`${DOMAIN}usuarios/edit/`);
      }
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(`error ${err.status} : ${message}`);
      alert(` ocurrio un error al editar usuario`);
    });
}

export function userToEdit(e) {
  if (
    !e.target.matches("#td-user-edit") &&
    !e.target.matches("#td-user-edit *")
  )
    return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idUserGO", id);
  location.replace(`${DOMAIN}usuarios/edit`);
}
