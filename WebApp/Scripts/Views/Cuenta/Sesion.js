(function () {
    var page = JSON.parse(sessionStorage.getItem('flay'));
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

    if (page.type == 'privado' && !usuario) {
        location.href = '/Cuenta/InicioSesion';
    }

    $(document).ready(function () {
        if (usuario) {
            updateMainMenu(usuario.Nombre || '');
            updateOffcanvasProfile(usuario.Nombre, usuario.PrimerApellido);
            updateOffcanvasRol(usuario.Rol, usuario.Sexo);
        }

        $('.js-link-logout').on('click', function (e) {
            e.preventDefault();
            sessionStorage.clear();
            location.href = '/';
        });

        function updateMainMenu(nombreUsuario) {
            $('.js-link-login').addClass('d-none');
            $('.js-account-wrap').removeClass('d-none');
            $('.js-account-name').html(nombreUsuario);
        }

        function updateOffcanvasProfile(nombre, apellido) {
            $('.js-offcanvas-fullname').html(`${nombre ? nombre : ''} ${apellido ? apellido : ''}`);
        }

        function updateOffcanvasRol(rol, sexo = 'M') {
            var userRol;

            switch (rol) {
                case 'AdministradorAeropuerto':
                    userRol = 'Administrador de aeropuerto';
                    break;

                case 'AdministradorAerolinea':
                    userRol = 'Administrador de aerolínea';
                    break;

                case 'ClienteFinal':
                    userRol = `Viajer${sexo === 'M' ? 'o' : 'a'}`;
                    break;

                case 'SuperAdmin':
                    userRol = 'Administrador';
                    break;

                default:
                    userRol = '';
            }

            $('.js-offcanvas-rol').html(userRol);
        }
    });
})();