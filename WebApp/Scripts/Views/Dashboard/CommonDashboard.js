$(document).ready(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

    if (usuario) {
        $('.js-dashboard-name').html(usuario.Nombre || '');
        $('.js-dashboard-email').html(usuario.CorreoElectronico || '');
    }

    if (usuario.Rol === 'SuperAdmin') {
        $('#super-admin-dashmenu').removeClass('d-none');
    }

    if (usuario.Rol === 'AdministradorAeropuerto' || usuario.rol === 'AsistenteAeropuerto') {
        $('#admin-aeropuerto-dashmenu').removeClass('d-none');
    }

    if (usuario.Rol === 'AdministradorAerolinea') {
        $('#admin-aerolinea-dashmenu').removeClass('d-none');
    }

    if (usuario.Rol === 'ClienteFinal') {
        $('#cliente-dashmenu').removeClass('d-none');
    }
});