(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'AsistenteAerolinea' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Aerolinea/Listar";
    }
})();

function Detalle() {
    this.service = 'avion';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        $('#IdAvion').html(data.IdAvion);
        $('#IdAerolinea').html(data.IdAerolinea);
        $('#Matricula').html(data.Matricula);
        $('#TipoAvion').html(data.TipoAvion);
        $('#Fabricante').html(data.Fabricante);
        $('#CapacidadKg').html(data.CapacidadKg);
        $('#CantidadPasajeros').html(data.CantidadPasajeros);
        $('#AnoFabricacion').html(data.AnoFabricacion);
        $('#Estado').html(data.Estado ? 'Habilitado' : 'Deshabilitado');
    }
}

$(document).ready(function () {
    var aeropuerto = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblAviones_selected'));
    aeropuerto.BuildDetail(data);
});

