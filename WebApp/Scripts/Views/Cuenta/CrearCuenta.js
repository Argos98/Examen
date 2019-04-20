function CrearCuenta() {
    this.service = 'usuario';
    this.ctrlActions = new ControlActions();

    this.UserExist = function (correo) {
        return this.ctrlActions.GetByParamsToAPI(`${this.service}/GetByMail?correo=${correo}`).then(function (response) {
            return response && response.Data;
        });
    }

    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }

    this.Notificar = function (correoElectronico) {
        var apiUrl = '/Notificacion/EviarCorreo';
        var asunto = "Confirmación creación de cuenta - Flay";
        var contenido = `Su cuenta ha sido creada de manera exitosa. Usuario: ${correoElectronico}. Gracias por usar Flay.`

        this.ctrlActions.EnviarCorreo(apiUrl, correoElectronico, asunto, contenido);
        this.ctrlActions.ShowMessage('S', 'Revise su correo electrónico para activar su cuenta.');
    }

    this.Create = function (data) {
        data.Rol = 'ClienteFinal';
        data.PerfilCompleto = false;

        return this.ctrlActions.PostToAPI(this.service, data).then(function (response) {            
            return true;
        }).catch(function (response) {
            return false;
            });
    }
}

$(document).ready(function () {
    var auth = new CrearCuenta();

    function contraseCoincide(contrasena, confirm) {
        return contrasena === confirm;
    }

    $('#ConfirmarContrasena').on('blur', function(e) {
        var contrasena = $('#Contrasena').val();
        var confirm = $('#ConfirmarContrasena').val();

        if (!contraseCoincide(contrasena, confirm)) {
            auth.ShowMessage('I', 'Las contraseñas no coinciden.');
        }
    });

    $('#btn-create-account').on('click', function(e) {
        e.preventDefault();
        var correo = $('#CorreoElectronico').val();
        var contrasena = $('#Contrasena').val();
        var confirm = $('#ConfirmarContrasena').val();
        var form = $("#createAccount");

        form.validate();
        $(".loader").fadeIn("slow");

        if (form.valid()) {
            if (!contraseCoincide(contrasena, confirm)) {
                $(".loader").fadeOut("fast");
                auth.ShowMessage('I', 'Las contraseñas no coinciden.');

                return;
            }

            auth.UserExist(correo).then(function (userData) {
                if (userData) {
                    $(".loader").fadeOut("fast");
                    auth.ShowMessage('I', 'Usuario ya existe.');
                } else {
                    auth.Create({ CorreoElectronico: correo, Contrasena: contrasena }).then(function (cuentaCreada) {
                        if (cuentaCreada) {
                            auth.Notificar(correo);
                        } else {
                            $(".loader").fadeOut("fast");
                            auth.ShowMessage('I', 'Ha ocurrido un error. Por favor, intente de nuevo ó contacte a servicio al cliente.');
                        }
                    });
                }
            });
        } else {
            $(".loader").fadeOut("fast");
            auth.ShowMessage('I', 'Todos los campos son requeridos.');
        }
    });
});