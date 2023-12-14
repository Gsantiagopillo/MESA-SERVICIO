const d = document;

export default function viewPassw(e) {
  if (e.target.matches("#watch-passw") || e.target.matches("#watch-passw *")) {
    const $passw = d.getElementById("passw"),
      $imgPassw = d.querySelector("#watch-passw img");

    if ($passw.dataset.watch === "true") {
      // console.log("visible");
      $passw.type = "password";
      $passw.setAttribute("data-watch", "false");
      $imgPassw.src = "./assets/eye-fill.svg";
    } else {
      // console.log("unvisible");
      $passw.type = "text";
      $passw.setAttribute("data-watch", "true");
      $imgPassw.src = "./assets/eye-slash-fill.svg";
    }
  }
}
