import api from "../../../helpers/app.js";
const d = document;

const { USUARIOS, DOMAIN } = api;

export default function createDoc(e) {
  if (!e.target.matches("#add-doc") && !e.target.matches("#add-doc *")) return;

  const $btnAdd = d.getElementById("add-doc"),
    $btnCreate = d.getElementById("create-doc"),
    $sectionCreate = d.querySelector(".section-add-docs");

  $btnAdd.classList.toggle("d-none");
  $btnCreate.classList.toggle("d-none");

  const $input2 =
    '<form class="file-field input-field form-create-doc" ><div class="btn"><span>File</span><input id="input-file-doc" type="file" accept="application/pdf"></div><div class="file-path-wrapper"><input class="file-path validate" type="text" ></div></form>';

  $sectionCreate.insertAdjacentHTML("afterbegin", $input2);

  $sectionCreate.classList.add("flex-column");
  $sectionCreate.classList.remove("justify-content-end");
}

export function UploadDoc(e) {
  if (!e.target.matches("#create-doc") && !e.target.matches("#create-doc *"))
    return;

  const $inputFile = d.getElementById("input-file-doc");
  // console.log(Array.from($inputFile.files));
  //console.log($inputFile.files);

  if ($inputFile.files.length === 0) alert("selecciona un archivo");
  else {
    document.querySelector(".load").style.display = "flex";
    const file = Array.from($inputFile.files);
    const idUser = sessionStorage.getItem("userToDocs");

    console.log(file[0]);
    const formData = new FormData();

    formData.append("file", file[0]);
    formData.append("idUser", idUser);

    let options = {
      method: "POST",
      body: formData,
    };

    fetch(`${USUARIOS}createDoc.php`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        document.querySelector(".load").style.display = "none";
        alert(`archivo creado:${json.nombre}`);
        location.reload();
      })
      .catch((err) => {
        document.querySelector(".load").style.display = "none";
        alert("ocurrio un error");
      });
  }
}
