(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Listar() {

    this.tblParqueosId = 'tblParqueos';
    this.service = 'parqueo';
    this.ctrlActions = new ControlActions();
    this.columns = "IdParqueo,CodigoParqueo,CodigoAeropuerto,Estado";

    this.RetrieveAll = function (CodigoAeropuerto) {
        this.ctrlActions.FillTable(this.service + '/GetParqueosDeAeropuerto?CodigoAeropuerto=' + CodigoAeropuerto, this.tblParqueosId, false, true,[0,2,3]);
    
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblParqueosId, true);
    }

    this.BindFields = function (data) {
        this.ctrlActions.BindFields('frmEdition', data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var parqueo = new Listar();

    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'))
    if (data == null)
        location.href = "../Aeropuerto/Listar";

    parqueo.RetrieveAll(data['CodigoAeropuerto']);

    
});

