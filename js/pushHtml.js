const d = document;
export async function pushHtml() {
  const includes = d.querySelectorAll("[data-include]");

  for (let i = 0; i < includes.length; i++) {
    await includeHTML(includes[i], includes[i].getAttribute("data-include"));
  }

  const typeuser =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  if (typeuser === "1") return;

  let menuAdds = [];

  menuAdds = d.querySelectorAll(".menu-add");

  menuAdds.forEach((el) => {
    el.style.pointerEvents = "none";
    el.style.opacity = "0.5";
  });
}

async function includeHTML(el, url) {
  try {
    let options = {
      method: "GET",
      headers: { "content-type": "text/html; charset=utf-8" },
    };
    let res = await fetch(url, options);
    let cont = await res.text();

    el.outerHTML = cont;
  } catch (err) {
    console.log(err);
    el.outerHTML = "ocurrio un error al cargar";
  }
}
