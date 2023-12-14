import api from "../helpers/app.js";

export default function validateSession() {
  const KeySession =
    localStorage.getItem("k_session") || sessionStorage.getItem("k_session");

  const { KEY_SESSION } = api;

  return KeySession === KEY_SESSION ? true : false;
}
