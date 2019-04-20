(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Detalle() {
    this.service = 'negocio';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (negocioSeleccionado) {
        console.log(negocioSeleccionado);
        $('#NombreComercial').html(negocioSeleccionado.NombreComercial);
        $('#CedulaJuridica').html(negocioSeleccionado.CedulaJuridica);
        $('#TipoNegocio').html(negocioSeleccionado.TipoNegocio);
        $('#Estado').html(negocioSeleccionado.Estado ? 'Habilitado' : 'Deshabilitado');
        this.ctrlActions.GetByIdToAPI('LocalComercial', negocioSeleccionado['IdLocalComercial'])
            .then(function (apiResponse) {
                $('#IdLocalComercial').html(apiResponse.Data.CodigoLocalComercial);
            });
    }
}

$(document).ready(function () {
    var detalle = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblNegocios_selected'));
    detalle.BuildDetail(data);
});

