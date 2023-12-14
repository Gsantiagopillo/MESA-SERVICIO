import api from "../../../helpers/app.js";

const d = document;

const { DOMAIN, USUARIOS } = api;

export default function deleteUser(e) {
  if (
    !e.target.matches("#td-user-delete") &&
    !e.target.matches("#td-user-delete *")
  )
    return;

  let confirmar = confirm("¿Desea eliminar al usuario?");

  if (!confirmar) return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${USUARIOS}deleteUsuario.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (json.err) alert(` ocurrio un error al eliminar usuario`);
      else {
        alert(`usuario: ${json.id}eliminado correctamente`);
        location.replace(`${DOMAIN}usuarios/listado/`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar usuario`);
    });
}
