(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'AsistenteAerolinea' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Aerolinea/Listar";
    }
})();

function Listar() {

    this.tblAvionesId = 'tblAviones';
    this.service = 'avion';
    this.ctrlActions = new ControlActions();
    this.columns = "IdAvion,IdAerolinea,Matricula,TipoAvion,Fabricante,CapacidadKg,CantidadPasajeros,AnoFabricacion,Estado";

    this.RetrieveAll = function (IdAerolinea) {
            this.ctrlActions.FillTable(this.service + '/GetAvionesDeAerolinea?IdAerolinea=' + IdAerolinea, this.tblAvionesId, false, true, [0, 1, 5, 8]);        
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var listar = new Listar();
    var data = JSON.parse(sessionStorage.getItem('tblAerolineas_selected'));
    if (data === null)
        location.href = "../Aerolinea/Listar";
    listar.RetrieveAll(data['IdAerolinea']);
});
