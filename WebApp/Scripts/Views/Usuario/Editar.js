function Editar() {
    this.service = 'usuario';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    this.Update = function (idUsuario) {
        var usuarioData = {};
        usuarioData = this.ctrlActions.GetDataForm(this.formId);
        usuarioData.IdUsuario = idUsuario;

        this.ctrlActions.PutToAPI(this.service, usuarioData);
        sessionStorage.setItem('tblUsuarios_selected', JSON.stringify(usuarioData));
    }

    this.FillForm = function (data) {
        var $formInputs = $('input.js-form-filter-control');

        this.ctrlActions.FillForm(this.formId, data);

        if (data.Estado === "HA") {
            $formInputs.prop('disabled', false);
        } else {
            $formInputs.prop('disabled', true);
        }
    }

    this.Delete = function (data) {
        this.ctrlActions.DeleteToAPI(this.service, data, 'Listar');
    }

    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var editar = new Editar();
    var data = JSON.parse(sessionStorage.getItem('tblUsuarios_selected'));

    if (data === null) {
        location.href = "Listar";
    }
        
    editar.FillForm(data);

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + editar.formId);

        form.validate();
        if (form.valid()) {
            editar.Update(data.IdUsuario);

            var updateData = JSON.parse(sessionStorage.getItem('tblUsuarios_selected'));
            editar.FillForm(updateData);

        } else {
            editar.ShowMessage('E', 'Por favor revise los campos requeridos.');
        }

        window.scrollTo(0, 0);
    });

    $('#btn-eliminar').on('click', function (e) {
        e.preventDefault();
        editar.Delete(data);
    });
});