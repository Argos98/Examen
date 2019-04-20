(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAerolinea') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Listar() {

    this.tblAeropuertosId = 'tblAeropuertos';
    this.service = 'aeropuerto';
    this.ctrlActions = new ControlActions();
    this.columns = "CodigoAeropuerto,Nombre,CodigoPais,NombrePais,CodigoCiudad,NombreCiudad,Direccion,Latitud,Longitud,VuelosHora,PorcentajeComisionBoletos,PorcentajeImpuestoVentas,ComisionUsoPuerta,ComisionUsoParqueo,ComisionUsoPista,ZonaHoraria,Moneda,Estado";

    this.RetrieveAll = function () {
            this.ctrlActions.FillTable(this.service, this.tblAeropuertosId, false, true, [2, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblAeropuertosId, true);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var aeropuerto = new Listar();
    aeropuerto.RetrieveAll();
});

