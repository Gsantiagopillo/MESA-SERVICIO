import api from "../../../helpers/app.js";
const d = document;
const { USUARIOS, DOMAIN } = api;

export default function docsUser() {
  if (!location.pathname.includes("documentos/docs-user/")) return;
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  if (type_user === "1") {
    const formData = new FormData();

    let id = sessionStorage.getItem("userToDocs");
    formData.append("id", id);

    let options = {
      method: "POST",
      body: formData,
    };

    fetch(`${USUARIOS}getDocs.php`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        //  console.log(json);
        if (json["tam"]) {
          const $h5 = d.createElement("h5");
          $h5.textContent = "NO HAY DOCUMENTOS DADOS DE ALTA";
          const $docsContent = d.getElementById("docs-content");
          $docsContent.insertAdjacentElement("afterbegin", $h5);
          d.getElementById("docs-table").style.display = "none";
        } else {
          const $template = d.getElementById("docs-template").content,
            $fragmento = document.createDocumentFragment();
          json.forEach((el) => {
            //console.log(el);
            let nombre = el.nombre;
            $template.getElementById("doc-name").textContent = nombre.substring(
              0,
              10
            );
            $template
              .getElementById("doc-detail")
              .setAttribute("data-id", `${DOMAIN}${el.url}`);
            $template
              .getElementById("doc-delete")
              .setAttribute("data-id", el.id);

            let $clone = d.importNode($template, true);
            $fragmento.appendChild($clone);
          });

          const $tbodyDocs = d.getElementById("tbody-docs");
          $tbodyDocs.appendChild($fragmento);
        }
      })
      .catch((err) => {
        console.log(err);
        let message = err.statusText || "ocurrio un error";
        console.log(` error ${err.status} : ${message}`);
        alert(` ocurrio un error al obtener docs`);
      });
  } else {
    const $headDocs = d.getElementById("head-docs");
    $headDocs.removeChild($headDocs.lastElementChild);
    d.getElementById("add-doc").style.display = "none";

    const formData = new FormData();

    let id = sessionStorage.getItem("userToDocs");
    formData.append("id", id);

    let options = {
      method: "POST",
      body: formData,
    };

    fetch(`${USUARIOS}getDocs.php`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        //  console.log(json);
        if (json["tam"]) {
          const $h5 = d.createElement("h5");
          $h5.textContent = "NO HAY DOCUMENTOS DADOS DE ALTA";
          const $docsContent = d.getElementById("docs-content");
          $docsContent.insertAdjacentElement("afterbegin", $h5);
          d.getElementById("docs-table").style.display = "none";
        } else {
          const $template = d.getElementById("docs-template").content,
            $fragmento = document.createDocumentFragment();
          json.forEach((el) => {
            //console.log(el);
            let nombre = el.nombre;
            $template.getElementById("doc-name").textContent = nombre.substring(
              0,
              10
            );

            let $clone = d.importNode($template, true);
            const $trDocsTemplate = $clone.getElementById("tr-docs-template");
            console.log($trDocsTemplate);
            $trDocsTemplate.removeChild($trDocsTemplate.lastElementChild);
            $fragmento.appendChild($clone);
          });

          const $tbodyDocs = d.getElementById("tbody-docs");
          $tbodyDocs.appendChild($fragmento);
        }
      })
      .catch((err) => {
        console.log(err);
        let message = err.statusText || "ocurrio un error";
        console.log(` error ${err.status} : ${message}`);
        alert(` ocurrio un error al obtener docs`);
      });
  }
}

export function goToDocs(e) {
  if (
    !e.target.matches("#td-user-docs") &&
    !e.target.matches("#td-user-docs *")
  )
    return;

  let id = e.target.getAttribute("data-id-docs");
  sessionStorage.setItem("userToDocs", id);
  location.replace(`${DOMAIN}documentos/docs-user`);
}

export function goToDoc(e) {
  if (!e.target.matches("#doc-detail")) return;
  const url = e.target.getAttribute("data-id");
  open(url, "_blank");
}

export function deleteDoc(e) {
  if (!e.target.matches("#doc-delete")) return;

  const id = e.target.getAttribute("data-id");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${USUARIOS}deleteDoc.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      if (json.err) alert(` ocurrio un error al eliminar documento`);
      else {
        alert(`documento: ${json.id} eliminado correctamente`);
        location.reload();
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al eliminar usuario`);
    });
}
