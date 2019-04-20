(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Listar() {

    this.tblPuertaId = 'tblPuertas';
    this.service = 'puerta';
    this.ctrlActions = new ControlActions();
    this.columns = "IdPuerta,CodigoPuerta,CodigoAeropuerto,Tipo,Estado";

    this.RetrieveAll = function (CodigoAeropuerto) {
        this.ctrlActions.FillTable(this.service + '/GetPuertaDeAeropuerto?CodigoAeropuerto=' + CodigoAeropuerto, this.tblPuertaId, false, true,[0,2,4],);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblPuertaId, true);
    }
 
    this.BindFields = function (data) {
        this.ctrlActions.BindFields('frmEdition', data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var puerta = new Listar();
    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'))
    if (data == null)
        location.href = "../Aeropuerto/Listar";

    puerta.RetrieveAll(data['CodigoAeropuerto']);

});

