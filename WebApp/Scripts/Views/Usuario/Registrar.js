function Registrar() {
    this.service = 'usuario';
    this.ctrlActions = new ControlActions();
    this.formEdition = 'frmEdition';

    this.Create = function () {
        var usuarioData = {};
        usuarioData = this.ctrlActions.GetDataForm('frmEdition');
        
        this.ctrlActions.PostToAPI(this.service, usuarioData);
    }

    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }
}

//ON DOCUMENT READY
$(document).ready(function() {
    var registrar = new Registrar();

    $('#btn-submit').on('click', function(e) {
        e.preventDefault();
        var form = $("#" + registrar.formEdition);

        form.validate();
        if (form.valid()) {
            registrar.Create();
        } else {
            registrar.ShowMessage('E', 'Por favor revise los campos requeridos.');
        }
        
        window.scrollTo(0, 0);
    });
});

