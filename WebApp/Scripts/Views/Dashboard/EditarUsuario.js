function Editar() {
    this.service = 'usuario';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    this.Update = function (data) {
        var usuarioData = {};
        usuarioData = this.ctrlActions.GetDataForm(this.formId);
        usuarioData.IdUsuario = data.IdUsuario;
        usuarioData.CorreoElectronico = data.CorreoElectronico;
        usuarioData.Estado = usuarioData.Estado ? usuarioData.Estado : "HA";
        usuarioData.PerfilCompleto = true;
        usuarioData.Rol = data.Rol;

        this.ctrlActions.PutToAPI(this.service, usuarioData).then(function (response) {
            sessionStorage.setItem('usuario_sesion', JSON.stringify(usuarioData));
            $('.js-perfil-message').addClass('d-none');
        });
        
    }

    this.FillForm = function (data) {
        this.ctrlActions.FillForm(this.formId, data);
    }

    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }
}

$(document).ready(function () {
    var editar = new Editar();
    var data = JSON.parse(sessionStorage.getItem('usuario_sesion'));

    if (data.PerfilCompleto) {
        editar.FillForm(data);
    } else {
        $('.js-perfil-message').removeClass('d-none');
    }

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + editar.formId);

        form.validate();
        if (form.valid()) {
            editar.Update(data);

            var updateData = JSON.parse(sessionStorage.getItem('tblUsuarios_selected'));
            editar.FillForm(updateData);

        } else {
            editar.ShowMessage('E', 'Por favor revise los campos requeridos.');
        }

        window.scrollTo(0, 0);
    });
});