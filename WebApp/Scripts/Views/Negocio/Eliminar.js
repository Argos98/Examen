(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Eliminar() {

    this.tblNegociosId = 'tblNegocios';
    this.service = 'negocio';
    this.ctrlActions = new ControlActions();
    this.columns = "IdNegocio,NombreComercial,CedulaJuridica,TipoNegocio,IdLocalComercial,Estado";

    this.RetrieveAll = function () {
        this.ctrlActions.FillTable(this.service, this.tblNegociosId, false);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblNegociosId, true);
    }
}
    //ON DOCUMENT READY
    $(document).ready(function () {
        var negocio = new Eliminar();
        negocio.RetrieveAll();
    });