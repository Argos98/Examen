(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Aerolinea/Listar";
    }
})();

function Eliminar() {
    this.service = 'avion';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    this.Delete = function () {
        var avionData = {};
        avionData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el delete al delete
        this.ctrlActions.DeleteToAPI(this.service, avionData);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var eliminar = new Eliminar();
    avion.Delete();

    $('#btn-eliminar').on('click', function (e) {
        e.preventDefault();
        eliminar.Delete();
    });
});

