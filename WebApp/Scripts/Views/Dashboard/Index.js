(function () {
    var page = JSON.parse(sessionStorage.getItem('flay'));
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

    if (page.type == 'privado' && !usuario) {
        location.href = '/Cuenta/InicioSesion';
    }

    location.href = '../Dashboard/' + usuario.Rol;
    
})();