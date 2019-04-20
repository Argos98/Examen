function Autenticar() {
    this.service = 'usuario';
    this.ctrlActions = new ControlActions();

    this.Login = function (correo, contrasena) {
        return this.ctrlActions.GetByParamsToAPI(`${this.service}/GetValidation?correo=${correo}&contrasena=${contrasena}`).then(function (response) {
            return response && response.Data;
        });
    }

    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }
}

$(document).ready(function () {
    var auth = new Autenticar();

    $('#btnLogin').on('click', function (e) {
        e.preventDefault();
        var correo = $('#signinSrEmail').val();
        var contrasena = $('#signinSrPassword').val();

        $(".loader").fadeIn("slow");

        if (correo && contrasena) {    
            auth.Login(correo, contrasena).then(function (userData) {
                if (userData) {
                    sessionStorage.setItem('usuario_sesion', JSON.stringify(userData));

                    if (userData.Rol === 'ClienteFinal' && !userData.PerfilCompleto) {
                        location.href = '/Dashboard/EditarUsuario';
                    } else {
                        location.href = '/Dashboard/' + userData.Rol;
                    }

                } else {
                    $(".loader").fadeOut("fast");
                    auth.ShowMessage('I', 'Correo electrónico ó contraseña incorrecto.');
                }
            })
                .catch(function () {
                    $(".loader").fadeOut("fast");
                    auth.ShowMessage('I', 'Ha ocurrido un error, intente de nuevo.');
                });
        } else {
            $(".loader").fadeOut("fast");
            auth.ShowMessage('I', 'Correo electrónico y contraseña son requeridos.');
        }
    });
});