(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto') {
        location.href = "../Aeropuerto/Listar";
    }
})();


function Editar() {
    this.service = 'aerolinea';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    
    this.Update = function (originData, usuario) {

        vista = this.Vista(usuario);
        var aerolineaData = {};
        aerolineaData = this.ctrlActions.GetDataForm(this.formId);

        aerolineaData.IdAerolinea = originData["IdAerolinea"];
        //Hace el post al create
        this.ctrlActions.PutToAPI(this.service, aerolineaData, vista);//cambiar de vista si es un administrador aerolinea
    }

    this.FillForm = function (data) {
        this.ctrlActions.FillForm(this.formId, data);
    }

    this.Delete = function (originData) {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
        var vista = this.Vista(usuario);
        this.ctrlActions.DeleteToAPI(this.service, originData, vista);
    }

    this.Vista = function (usuario) {
        var vista;
        switch (usuario.Rol) {
            case "AdministradorAerolinea":
                //vista = "../Dashboard/AdministradorAerolinea";
                vista = "Listar";
                break;
            case "AdministradorAeropuerto":
                vista = "Listar";
                break;
            case "SuperAdmin":
                vista = "Listar";
                break;
            default:
                break;
        }
        return vista;
    }

    this.RegresarDashboard = function (usuario, vista) {
        switch (usuario.Rol) {
            case "AdministradorAerolinea":
                //"../Dashboard/AdministradorAerolinea"
                location.href = 'Listar';
                break;
            case "AdministradorAeropuerto":
                location.href = 'Listar';
                break;
            case "SuperAdmin":
                location.href = 'Listar';
                break;
            default:
                break;
        }
    }
}


//ON DOCUMENT READY
$(document).ready(function () {
    var editar = new Editar();

    
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    var data = JSON.parse(sessionStorage.getItem('tblAerolineas_selected'));
    var vista = editar.Vista(usuario);

    if (data === null) {
        location.href = vista;
    }
    
    editar.FillForm(data);

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + editar.formId);
        form.validate();
        if (form.valid())
            editar.Update(data, usuario);
        window.scrollTo(0, 0);
    });

    $('#btn-regresar').on('click', function () {
        editar.RegresarDashboard(usuario, vista);
    });

    if (usuario.Rol === "AdministradorAerolinea")
        $('#btn-eliminar').hide();

    $('#btn-eliminar').on('click', function (e) {
        editar.Delete(data);
    });
});