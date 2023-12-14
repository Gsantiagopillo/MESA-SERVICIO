import api from "../helpers/app.js";

const d = document;

export default function login(e) {
  d.querySelector(".login-incorrect").style.display = "none";
  //console.log(e.target);
  const correo = d.getElementById("email").value,
    passw = d.getElementById("passw").value,
    sessionActive = d.getElementById("session").checked;

  const { LOGIN, KEY_SESSION } = api;
  // console.log(`${LOGIN}login.php`);

  const formData = new FormData();

  formData.append("email", correo);
  formData.append("passw", passw);
  formData.append("sessionActive", sessionActive);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${LOGIN}login.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      if (!json.err) {
        if (json.sessionActive === "true") {
          localStorage.setItem("user", json.id);
          localStorage.setItem("type_user", json.tipoUsuario);
          localStorage.setItem("session", json.idSession);
          localStorage.setItem("k_session", KEY_SESSION);
        } else {
          sessionStorage.setItem("user", json.id);
          sessionStorage.setItem("type_user", json.tipoUsuario);
          sessionStorage.setItem("session", json.idSession);
          sessionStorage.setItem("k_session", KEY_SESSION);
        }
        location.replace(api.DOMAIN);
      } else {
        if (json.causa === "1" || json.causa === "2")
          d.querySelector(".login-incorrect").textContent = "datos incorrectos";
        d.querySelector(".login-incorrect").style.display = "block";

        setTimeout(() => {
          d.querySelector(".login-incorrect").style.display = "none";
        }, 2500);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      d.querySelector(
        ".login-incorrect"
      ).textContent = ` ocurrio un error de conexión`;
      d.querySelector(".login-incorrect").style.display = "block";
    });
}
