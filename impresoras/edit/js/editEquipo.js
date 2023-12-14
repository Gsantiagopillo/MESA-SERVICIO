import api from "../../../helpers/app.js";
const d = document;
const { EMPRESAS, IMPRESORAS, DOMAIN } = api;

export default async function editEquipo(e) {
  if (!e.target.matches("#form-edit-equipo")) return;

  document.querySelector(".load").style.display = "flex";

  const $form = d.getElementById("form-edit-equipo"),
    id = $form["id-equipo"].value,
    numSerie = $form.serie.value,
    dpi = $form.dpi.value,
    ubicacion = $form.ubicacion.value,
    numPart = $form["num-part"].value,
    empresa = $form["equipo-empresa"].value;

  const formData = new FormData();

  formData.append("id", id);
  formData.append("numSerie", numSerie);
  formData.append("dpi", dpi);
  formData.append("ubicacion", ubicacion);
  formData.append("numPart", numPart);
  formData.append("empresa", empresa);
  console.log(id, numSerie, dpi, ubicacion, numPart, empresa);
  let options = {
    method: "POST",
    body: formData,
  };
  try {
    let res = await fetch(`${IMPRESORAS}editEquipo.php`, options);
    let json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.err) throw { status: json.err, statusText: `error al actualizar` };
    //console.log(json);
    document.querySelector(".load").style.display = "none";
    alert(`Equipo: ${json.numserie}  editado correctamente`);
    location.replace(`${DOMAIN}impresoras/edit/`);
  } catch (err) {
    document.querySelector(".load").style.display = "none";
    console.log(err);
    let message = err.statusText || "ocurrio un error";
    console.log(` error ${err.status} : ${message}`);
    alert(` ocurrio un error : ${message}`);
  }
}
