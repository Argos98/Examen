(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();


function Listar() {

    this.tblNegociosId = 'tblNegocios';
    this.service = 'negocio';
    this.ctrlActions = new ControlActions();
    this.columns = "IdNegocio,NombreComercial,CedulaJuridica,TipoNegocio,IdLocalComercial,Estado";

    this.RetrieveAll = function (CodigoAeropuerto) {
        this.ctrlActions.FillTable(this.service + '/GetNegocioDeAeropuerto?CodigoAeropuerto=' + CodigoAeropuerto, this.tblNegociosId, false, true, [0,4,5]);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblNegociosId, true);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var listar = new Listar();
    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
    if (data === null)
        location.href = "../Aeropuerto/Listar";
    listar.RetrieveAll(data['CodigoAeropuerto']);
});