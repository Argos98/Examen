function SuperAdmin() {
    this.service = 'DashboardSuperAdmin';
    this.ctrlActions = new ControlActions();

    this.ActualizarDashboard = function () {
        this.ctrlActions.FillDashboard(this.service, -1);
    }
}

$(document).ready(function () {
    var vista = new SuperAdmin();
    vista.ActualizarDashboard();

    $('#btnActualizarDashboard').on('click', function (e) {
        vista.ActualizarDashboard();
    });
});
