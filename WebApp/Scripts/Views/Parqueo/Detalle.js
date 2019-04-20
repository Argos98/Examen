(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Detalle() {
    this.service = 'parqueo';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        $('#IdParqueo').html(data.IdParqueo);
        $('#CodigoParqueo').html(data.CodigoParqueo);
        $('#CodigoAeropuerto').html(data.CodigoAeropuerto);
        $('#Estado').html(data.Estado ? 'Habilitada' : 'Deshabilitada');
      
    }
}

$(document).ready(function () {
    var parqueo = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblParqueos_selected'));
    parqueo.BuildDetail(data);
});