(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto') {
        location.href = "../Aeropuerto/Listar";
    }
})();


function Registrar() {
    this.service = 'aerolinea';
    this.ctrlActions = new ControlActions();
    this.formEdition = 'frmEdition';

    this.Create = function (usuario) {

        
        var vista = this.Vista(usuario);
        var aerolineaData = {};
        aerolineaData = this.ctrlActions.GetDataForm(this.formEdition);

        switch (usuario.Rol) {
            case "AdministradorAerolinea":
                aerolineaData.Estado = "PE";
                aerolineaData.IdUsuario = usuario.IdUsuario;
                sessionStorage.setItem('VRegistrar_Codigo_Aeropuerto', aerolineaData["CodigoAeropuerto"]);     
                break;
            case "AdministradorAeropuerto":
                aerolineaData.Estado = "HA";
                var codigoAeropuerto = sessionStorage.getItem('VRegistrar_Codigo_Aeropuerto');
                aerolineaData.CodigoAeropuerto = codigoAeropuerto;
                break;
            case "SuperAdmin":
                aerolineaData.Estado = "HA";
                var aeropuerto = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
                aerolineaData.CodigoAeropuerto = aeropuerto['CodigoAeropuerto'];
                break;
            default:
                break;
        }
        //Hace el post al create
        this.ctrlActions.PostToAPI(this.service, aerolineaData, vista);
    }

    this.EnviarCorreo = function () {
        var aerolineaData = {};
        aerolineaData = this.ctrlActions.GetDataForm(this.formEdition);

        var correoAdminAeropuerto = sessionStorage.getItem('VRegistrar_Correo_Admin_Aeropuerto'); 
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

        this.ctrlActions.EnviarCorreo("/Aerolinea/EnviarCorreoAUsuario", correoAdminAeropuerto, "Solicitud de registro de aerolínea", "Estimado administrador, el administrador de aerolínea " + usuario['Nombre'] + " " + usuario['PrimerApellido'] + " solicita aprobación para la aerolínea " + aerolineaData.NombreComercial);
    }

    this.ObtenerAdminAeropuerto = function () {
        var codigoAeropuerto = sessionStorage.getItem('VRegistrar_Codigo_Aeropuerto');
        this.ctrlActions.GetByParamsToAPI('AeropuertoAdministrador/GetAdministradorDeAeropuerto?codigoAeropuerto=' + codigoAeropuerto)
            .then(function (idAdmin) {
                sessionStorage.setItem("VRegistrar_Admin_Aeropuerto", idAdmin["IdUsuario"]);
            });
    }

    this.ObtenerCorreoAdminAeropuerto = function () {
        var id = sessionStorage.getItem('VRegistrar_Admin_Aeropuerto');
        this.ctrlActions.GetByParamsToAPI('Usuario/Get?id=' +id)
            .then(function (correoAdmin) {
                sessionStorage.setItem('VRegistrar_Correo_Admin_Aeropuerto', correoAdmin["CorreoElectronico"]);
            });
    }

    this.ObtenerCodigoAeropuerto = function () {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

        this.ctrlActions.GetByParamsToAPI('AeropuertoAdministrador/GetAeropuertoByIdUsuario?id='+ usuario.IdUsuario)
            .then(function (dataAeropuerto) {
                sessionStorage.setItem('VRegistrar_Codigo_Aeropuerto', dataAeropuerto["CodigoAeropuerto"]);                
            });
    }

    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }

    this.Vista = function (usuario) {
        var vista;
        switch (usuario.Rol) {
            case "AdministradorAerolinea":
                //vista = "../Dashboard/AdministradorAerolinea";
                vista = "../Dashboard/AdministradorAerolinea";
                break;
            case "AdministradorAeropuerto":
                //vista = "../Dashboard/AdministradorAeropuerto";
                vista = "Listar";
                break;
            case "SuperAdmin":
                //vista = "../Dashboard/superAdmin";
                vista = "Listar";
                break;
            default:
                break;
        }
        return vista;
    }
}



//ON DOCUMENT READY
$(document).ready(function () {
    var registrar = new Registrar();

    
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
     

    switch (usuario.Rol) {
        case "SuperAdmin":
            $('#Aeropuerto').hide();
            $('#Aeropuerto').removeClass("js-form-filter-control");
            break;
        case "AdministradorAeropuerto":
            $('#Aeropuerto').hide();
            $('#Aeropuerto').removeClass("js-form-filter-control");
            registrar.ObtenerCodigoAeropuerto();
            break;
        case 'AdministradorAerolinea':
            $('#Usuario').hide();
            $('#Usuario').removeClass("js-form-filter-control");
            break;
        default:
            break;
    }


    $('#btn-submit').on('click', function (e) {

        
        e.preventDefault();
        var form = $("#" + registrar.formEdition);

        form.validate();
        if (form.valid()) {
            registrar.Create(usuario);  
            //registrar.ObtenerAdminAeropuerto();
            //registrar.ObtenerCorreoAdminAeropuerto();
            //registrar.EnviarCorreo();
        } else {
            registrar.ShowMessage('E', 'Por favor revise los campos requeridos.');
        }
        window.scrollTo(0, 0);
    });

    $('#btn-regresar').on('click', function () {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
        var vista = registrar.Vista(usuario);
        switch (usuario.Rol) {
            case "AdministradorAerolinea":
                //location.href = "../Dashboard/AdministradorAerolinea";
                location.href = vista;
                break;
            case "AdministradorAeropuerto":
                //location.href = "../Dashboard/AdministradorAeropuerto";
                location.href = vista;
                break;
            case "SuperAdmin":
                //location.href ="../Dashboard/superAdmin";
                location.href = vista;
                break;
            default:
                break;
        }
    });
});