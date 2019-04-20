(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Aerolinea/Listar";
    }
})();

function Registrar() {
    this.service = 'avion';
    this.ctrlActions = new ControlActions();
    this.formEdition = 'frmEdition';

    this.Create = function (idAerolinea) {
        var data = {};
        data = this.ctrlActions.GetDataForm(this.formEdition);
        data.Estado = "HA";
        data.IdAerolinea = idAerolinea;
        //Hace el post al create
        this.ctrlActions.PostToAPI(this.service, data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var registrar = new Registrar();
    var data = JSON.parse(sessionStorage.getItem('tblAerolineas_selected'));

    if (data === null)
        location.href = "../Aeropuerto/Listar";

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + registrar.formEdition);
        form.validate();
        if (form.valid())
            registrar.Create(data["IdAerolinea"]);
        window.scrollTo(0, 0);
    });

});


