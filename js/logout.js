import api from "../helpers/app.js";

const d = document;

const { DOMAIN } = api;

export default function logout(e) {
  if (!e.target.matches("#logout") && !e.target.matches("#logout *")) return;

  sessionStorage.clear();
  localStorage.clear();
  location.replace(`${DOMAIN}login.html`);
}
