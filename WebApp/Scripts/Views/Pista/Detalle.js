(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Detalle() {
    this.service = 'pista';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        $('#CodigoPista').html(data.CodigoPista);
        $('#Estado').html(data.Estado ? 'Habilitada' : 'Deshabilitada');
    }
}

$(document).ready(function () {
    var detalle = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblPistas_selected'));
    detalle.BuildDetail(data);
});

