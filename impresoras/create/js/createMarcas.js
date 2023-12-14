import api from "../../../helpers/app.js";
const d = document;

const { IMPRESORAS } = api;

export default function createMarca(e) {
  if (!e.target.matches("#add-marca") && !e.target.matches("#add-marca *"))
    return;

  const $btnAdd = d.getElementById("add-marca"),
    $btnCreate = d.getElementById("create-marca"),
    $sectionCreate = d.querySelector(".section-add-marcas");

  $btnAdd.classList.toggle("d-none");
  $btnCreate.classList.toggle("d-none");

  const $input2 =
    '<form class="form-create-marca"><div class="input-field"><input placeholder="Marca" id="input-file-marca" type="text" class="validate" required><label for="input-file-marca">Marca</label></div></form>';

  $sectionCreate.insertAdjacentHTML("afterbegin", $input2);

  $sectionCreate.classList.add("flex-column");
  $sectionCreate.classList.remove("justify-content-end");
  M.updateTextFields();
}

export function Uploadmarca(e) {
  if (
    !e.target.matches("#create-marca") &&
    !e.target.matches("#create-marca *")
  )
    return;
  const $inputMarca = d.getElementById("input-file-marca");
  if ($inputMarca.value === "") {
    alert("Llena el campo nombre Marca");
    return;
  }

  document.querySelector(".load").style.display = "flex";

  const formData = new FormData();
  formData.append("marca", $inputMarca.value);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${IMPRESORAS}createMarca.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      document.querySelector(".load").style.display = "none";
      alert(`Marca creada: ${json.marca}`);
      location.reload();
    })
    .catch((err) => {
      document.querySelector(".load").style.display = "none";
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      alert(` ocurrio un error al registrar marca`);
    });
}
