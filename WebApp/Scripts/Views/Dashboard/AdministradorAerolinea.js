function AdministradorAerolinea() {
    this.service = 'DashboardAdministradorAerolinea';
    this.ctrlActions = new ControlActions();

    this.ActualizarDashboard = function () {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
        this.ctrlActions.FillDashboard(this.service, usuario.IdUsuario);
    }
}

$(document).ready(function () {
    var vista = new AdministradorAerolinea();
    vista.ActualizarDashboard();

    $('#btnActualizarDashboard').on('click', function (e) {
        vista.ActualizarDashboard();
    });
});
