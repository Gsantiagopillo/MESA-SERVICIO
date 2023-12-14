import api from "../../../helpers/app.js";

const d = document;

export default function infoUser() {
  if (
    !location.pathname.includes("usuarios/edit") &&
    !location.pathname.includes("usuarios/informacion")
  )
    return;
  if (!sessionStorage.getItem("idUserGO")) return;

  const user = sessionStorage.getItem("idUserGO");

  const { DOMAIN, USUARIOS } = api;

  const formData = new FormData();
  formData.append("id", user);
  if (location.pathname.includes("usuarios/edit"))
    formData.append("allInfo", true);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${USUARIOS}getUsuario.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      //console.log(json);
      json = json["0"];
      // console.log(json);

      const $form =
        d.getElementById("form-create-user") ||
        d.getElementById("form-edit-user");

      if ($form["id-user"]) $form["id-user"].value = json["id"];

      $form.nombre.value = json.nombre;
      $form["apellido-paterno"].value = json["apellido_paterno"];
      $form["apellido-materno"].value = json["apellido_materno"];
      $form["puesto"].value = json["puesto"];
      $form["telefono"].value = json["telefono"];
      $form["correo"].value = json["correo"];

      if (location.pathname.includes("usuarios/edit")) {
        $form["tipo"].value = json["type_user"] === "1" ? "1" : "2";

        var elems = document.querySelectorAll("select");
        var instances = M.FormSelect.init(elems, options);
      } else {
        $form["tipo"].value =
          json["type_user"] === "1" ? "Administrador" : "Usuario General";
      }

      $form.nombre.style.color = "black";
      $form["apellido-paterno"].style.color = "black";
      $form["apellido-materno"].style.color = "black";
      $form["puesto"].style.color = "black";
      $form["telefono"].style.color = "black";
      $form["correo"].style.color = "black";
      $form["tipo"].style.color = "black";

      if ($form["passw"]) {
        //$form.passw.value = json["passw"];
        $form["passw"].style.color = "black";
      }
    });
}
