import api from "../../../helpers/app.js";

const d = document;

const { DOMAIN, EMPRESAS } = api;

export default function deleteEmpresa(e) {
  if (
    !e.target.matches("#td-empresa-delete") &&
    !e.target.matches("#td-empresa-delete *")
  )
    return;

  let confirmar = confirm("¿Desea eliminar la empresa?");

  if (!confirmar) return;

  let id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${EMPRESAS}deleteEmpresa.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (json.err) alert(` ocurrio un error al eliminar empresa`);
      else {
        alert(`empresa: ${json.id} eliminada correctamente`);
        location.replace(`${DOMAIN}empresas/listado/`);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar empresa`);
    });
}
