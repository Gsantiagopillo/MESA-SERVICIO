const d = document;

export default function header(e) {
  //console.log(e.target);
  if (
    e.target.matches("#button-menu-admin") ||
    e.target.matches("#button-menu-admin *")
  ) {
    d.getElementById("menu-admin").classList.toggle("active");
    d.querySelector("[data-submenu-user]").classList.remove("display-flex");
    d.querySelector("main").classList.toggle("main-cropped");
  }
  if (
    e.target.matches("[data-nav-user]") ||
    e.target.matches("[data-nav-user] *")
  ) {
    d.getElementById("menu-admin").classList.remove("active");
    d.querySelector("[data-submenu-user]").classList.toggle("display-flex");
    d.querySelector("main").classList.remove("main-cropped");
  }
  if (e.target.matches("[data-nav-item]")) {
    const subMenu = e.target.getAttribute("data-nav-item");
    const $subMenu = d.querySelector(`[data-submenu='${subMenu}']`);
    $subMenu.classList.toggle("active");
  }
}
