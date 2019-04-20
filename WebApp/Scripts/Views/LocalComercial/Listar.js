(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Listar() {

    this.tbListaItemsId = 'tblLocalesComerciales';
    this.service = 'LocalComercial';
    this.ctrlActions = new ControlActions();
    this.columns = "IdLocalComercial,CodigoLocalComercial,Nombre,MontoAlquierMensual,AreaConstruccionM2,CodigoAeropuerto,Estado";

    this.RetrieveAll = function (CodigoAeropuerto) {
        this.ctrlActions.FillTable(this.service + '/GetLocalComercialDeAeropuerto?CodigoAeropuerto=' + CodigoAeropuerto, this.tbListaItemsId, false, true, [0,5,6]);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tbListaItemsId, true);
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

