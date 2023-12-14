import api from "../../../helpers/app.js";

const d = document;

const { DOMAIN, CLIENTES } = api;

export default function deleteCliente(e) {
  if (
    !e.target.matches("#td-cliente-delete") &&
    !e.target.matches("#td-cliente-delete *")
  )
    return;

  let confirmar = confirm("¿Desea eliminar al contacto?");

  if (!confirmar) return;

  //console.log(e.target);
  let id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${CLIENTES}deleteCliente.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (json.err) alert(` ocurrio un error al eliminar cliente`);
      else {
        alert(`cliente: ${json.id} eliminado correctamente`);
        location.replace(`${DOMAIN}clientes/listado/`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar cliente`);
    });
}
