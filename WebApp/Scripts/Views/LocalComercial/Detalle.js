(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Detalle() {
    this.service = 'LocalComercial';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        $('#CodigoLocalComercial').html(data.CodigoLocalComercial);
        $('#Nombre').html(data.Nombre);
        $('#MontoAlquierMensual').html(data.MontoAlquierMensual);
        $('#AreaConstruccionM2').html(data.AreaConstruccionM2);
        $('#Estado').html(data.Estado ? 'Habilitado' : 'Deshabilitado');
    }
}

$(document).ready(function () {
    var detalle = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblLocalesComerciales_selected'));
    detalle.BuildDetail(data);
});

