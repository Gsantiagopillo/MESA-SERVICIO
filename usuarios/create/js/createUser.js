import api from "../../../helpers/app.js";
import getUsuarios from "../../../helpers/getUsuarios.js";

const d = document;

export default async function CreateUser() {
  if (!location.pathname.includes("usuarios/create")) return;

  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-create-user"),
    nombre = $form.nombre.value,
    apellidoPaterno = $form["apellido-paterno"].value,
    apellidoMaterno = $form["apellido-materno"].value,
    puesto = $form.puesto.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value,
    passw = $form.passw.value,
    tipo = $form.tipo.value;

  const usuarios = await getUsuarios();
  let bandUsuario = false;

  for (let i = 0; i < usuarios.length && bandUsuario === false; i++) {
    if (correo === usuarios[i].correo) bandUsuario = true;
  }

  console.log(usuarios, bandUsuario);

  if (bandUsuario === true) {
    document.querySelector(".load").style.display = "none";
    $form.correo.classList.add("invalid");
    alert("El correo ingresado ya existe ");
    return;
  }

  const { USUARIOS, DOMAIN } = api;

  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("apellidoPaterno", apellidoPaterno);
  formData.append("apellidoMaterno", apellidoMaterno);
  formData.append("puesto", puesto);
  formData.append("telefono", telefono);
  formData.append("correo", correo);
  formData.append("passw", passw);
  formData.append("passw", passw);
  formData.append("tipoUsuario", tipo);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${USUARIOS}createUsuario.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      if (json.err) alert(` ocurrio un error al registrar usuario`);
      else {
        alert(`usuario: ${json.nombre} ${json.apellido} creado correctamente`);
        location.replace(`${DOMAIN}usuarios/create/`);
      }
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al registrar usuario`);
    });
}
