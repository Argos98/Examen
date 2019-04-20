(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Registrar() {
    this.service = 'parqueo';
    this.ctrlActions = new ControlActions();
    this.formEdition = 'frmEdition';

    this.Create = function (codigoAeropuerto) {
        var data = {};
        data = this.ctrlActions.GetDataForm(this.formEdition);
        data.Estado = true;
        data.CodigoAeropuerto = codigoAeropuerto;
        //Hace el post al create
        this.ctrlActions.PostToAPI(this.service, data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var registrar = new Registrar();
    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));

    if (data === null)
        location.href = "../Aeropuerto/Listar";

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + registrar.formEdition);
        form.validate();
        if (form.valid())
            registrar.Create(data['CodigoAeropuerto']);
        window.scrollTo(0, 0);
    });
});
