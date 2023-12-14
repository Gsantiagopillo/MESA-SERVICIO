import login from "./login.js";
import viewPassw from "./viewPassw.js";
import api from "../helpers/app.js";
import validateSession from "./validateSession.js";
import header from "./header.js";
import { pushHtml } from "./pushHtml.js";
import CreateUser from "../usuarios/create/js/createUser.js";
import listUser, { goToUser } from "../usuarios/listado/js/listUser.js";
import infoUser from "../usuarios/informacion/js/infoUser.js";
import editUser, { userToEdit } from "../usuarios/edit/js/editUser.js";
import deleteUser from "../usuarios/delete/js/deleteUser.js";
import docsUser, {
  deleteDoc,
  goToDoc,
  goToDocs,
} from "../documentos/docs-user/js/docsUser.js";
import createDoc, { UploadDoc } from "../documentos/docs-user/js/createDoc.js";
import createEmpresa from "../empresas/create/js/createEmpresa.js";
import listEmpresas, {
  goToEmpresa,
} from "../empresas/listado/js/listadoEmpresas.js";
import infoEmpresa from "../empresas/informacion/js/infoEmpresa.js";
import editEmpresa, { empresaToEdit } from "../empresas/edit/js/editEmpresa.js";
import deleteEmpresa from "../empresas/delete/js/deleteEmpresa.js";
import setEmpresa from "../clientes/create/js/setEmpresa.js";
import CreateCliente from "../clientes/create/js/createCliente.js";
import listClientes, {
  goToClient,
} from "../clientes/listado/js/listClientes.js";
import infoCliente from "../clientes/informacion/js/infoCliente.js";
import editCliente, { clienteToEdit } from "../clientes/edit/js/editCliente.js";
import deleteCliente from "../clientes/delete/js/deleteCliente.js";
import createMarca, {
  Uploadmarca,
} from "../impresoras/create/js/createMarcas.js";
import listMarcas, {
  deleteMarca,
  goToMarca,
} from "../impresoras/listado/js/listMarcas.js";
import listModelos, {
  deleteModelo,
  goToModelo,
} from "../impresoras/listado/js/listModelos.js";
import createModelo, {
  UploadModelo,
} from "../impresoras/create/js/createModelo.js";
import listEquipos, {
  deleteEquipo,
  equipoToEdit,
} from "../impresoras/listado/js/listEquipos.js";
import createEquipo, {
  UploadEquipo,
} from "../impresoras/create/js/createEquipo.js";
import infoEquipo from "../impresoras/edit/js/infoEquipo.js";
import editEquipo from "../impresoras/edit/js/editEquipo.js";
import autocompleteCliente from "../reportes/create/js/autocompleteCliente.js";
import autocompleteEquipo from "../reportes/create/js/autocompleteEquipo.js";
import createReporte from "../reportes/create/js/createReporte.js";
import autocompleteFiltroReporte from "../reportes/listado/js/autocompleteFiltros.js";
import listReportes, {
  goToReporte,
} from "../reportes/listado/js/listReportes.js";
import infoReporte from "../reportes/informacion/js/infoReporte.js";
import logout from "./logout.js";

const d = document;

d.addEventListener("submit", (e) => {
  e.preventDefault();
  if (location.pathname.includes("login.html")) login(e);
  CreateUser();
  editUser(e);
  editEmpresa(e);
  createEmpresa(e);
  CreateCliente(e);
  editCliente(e);
  editEquipo(e);
  createReporte(e);
});

d.addEventListener("click", (e) => {
  if (
    e.target.matches("#a-listado-modelos") ||
    e.target.matches("#a-listado-modelos *")
  )
    sessionStorage.removeItem("idMarcaGO");
  if (
    e.target.matches("#a-listado-equipos") ||
    e.target.matches("#a-listado-equipos *")
  )
    sessionStorage.removeItem("idModeloGO");

  logout(e);
  viewPassw(e);
  header(e);
  goToUser(e);
  goToEmpresa(e);
  userToEdit(e);
  empresaToEdit(e);
  deleteEmpresa(e);
  deleteUser(e);
  goToDocs(e);
  goToDoc(e);
  deleteDoc(e);
  createDoc(e);
  UploadDoc(e);
  goToClient(e);
  clienteToEdit(e);
  deleteCliente(e);
  createMarca(e);
  Uploadmarca(e);
  deleteMarca(e);
  goToMarca(e);
  deleteModelo(e);
  goToModelo(e);
  createModelo(e);
  UploadModelo(e);
  deleteEquipo(e);
  createEquipo(e);
  UploadEquipo(e);
  equipoToEdit(e);
  goToReporte(e);
});

d.addEventListener("DOMContentLoaded", (e) => {
  if (location.pathname.includes("login.html")) {
    if (localStorage.getItem("session") || sessionStorage.getItem("session"))
      if (validateSession()) location.replace(`${api.DOMAIN}`);
  } else {
    if (
      !localStorage.getItem("session") &&
      !sessionStorage.getItem("session")
    ) {
      location.replace(`${api.DOMAIN}login.html`);
    } else {
      if (!validateSession()) {
        location.replace(`${api.DOMAIN}login.html`);
      } else {
        if (!location.pathname.includes("listadoModelos.html"))
          sessionStorage.removeItem("idMarcaGO"); //Elimina idmarca para el listado de modelos
        if (!location.pathname.includes("listadoEquipos.html"))
          sessionStorage.removeItem("idModeloGO"); //Elimina idmodelo para el listado de equipos

        if (
          !location.pathname.includes("/reportes/edit") &&
          !location.pathname.includes("/reportes/informacion")
        ) {
          sessionStorage.removeItem("idReporteGO"); // elimina idreporte para info reporte
          sessionStorage.removeItem("idFormatoReporteGO"); // elimina idformatoreporte para info reporte
        }

        pushHtml();

        listUser();
        listEmpresas();
        listClientes();
        infoUser();
        infoEmpresa();
        docsUser();
        setEmpresa();
        infoCliente();
        listMarcas();
        listModelos();
        listEquipos();
        infoEquipo();
        autocompleteCliente();
        autocompleteEquipo();
        autocompleteFiltroReporte();
        listReportes();
        infoReporte();
      }
    }
  }
});
