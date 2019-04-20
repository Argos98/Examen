(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Editar() {
    this.service = 'localComercial';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    this.Update = function (originData) {
        var data = {};
        data = this.ctrlActions.GetDataForm(this.formId);
        data.IdLocalComercial = originData["IdLocalComercial"];
        data.CodigoAeropuerto = originData["CodigoAeropuerto"];
        this.ctrlActions.PutToAPI(this.service, data);
    }

    this.Delete = function (data) {

        this.ctrlActions.DeleteToAPI(this.service, data, 'Listar');
    }

    this.FillForm = function (data) {
        this.ctrlActions.FillForm(this.formId, data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var editar = new Editar();
    var data = JSON.parse(sessionStorage.getItem('tblLocalesComerciales_selected'));
    if (data === null)
        location.href = "Listar";
    editar.FillForm(data);

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + editar.formId);
        form.validate();
        if (form.valid())
            editar.Update(data);
        window.scrollTo(0, 0);
    });

    $('#btn-eliminar').on('click', function (e) {
        editar.Delete(data);
    });
});