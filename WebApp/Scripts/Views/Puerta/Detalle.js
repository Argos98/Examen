(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();


function Detalle() {
    this.service = 'puerta';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        $('#IdPuerta').html(data.IdPuerta);
        $('#CodigoPuerta').html(data.CodigoPuerta);
        $('#CodigoAeropuerto').html(data.CodigoAeropuerto);
        $('#Tipo').html(data.Tipo);
        $('#Estado').html(data.Estado ? 'Habilitada' : 'Deshabilitada');
      
    }
}

$(document).ready(function () {
    var aeropuerto = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblPuertas_selected'));
    aeropuerto.BuildDetail(data);
});