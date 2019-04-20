(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'AsistenteAerolinea' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AsistenteAeropuerto') {
        location.href = "../Aeropuerto/Listar";
    }
})();

function Listar() {

    this.tblAerolineaId = 'tblAerolineas';
    this.service = 'aerolinea';
    this.ctrlActions = new ControlActions();
    this.columns = "IdAerolinea,CedulaCedula,RazonSocial,NombreComercial,AnoFundacion,SitioWeb,Descripcion,DescripcionEstado";

    this.RetrieveAll = function (CodigoAeropuerto) {

        this.ctrlActions.FillTable(this.service + '/GetAerolineasDeAeropuerto?CodigoAeropuerto=' + CodigoAeropuerto, this.tblAerolineaId, false, true, [0, 2, 4, 5, 6]);
  
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblAerolineaId, true);
    }

    this.BindFields = function (data) {
        this.ctrlActions.BindFields('frmEdition', data);
    }

    this.ObtenerCodigoAeropuerto = function () {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

        this.ctrlActions.GetByParamsToAPI('AeropuertoAdministrador/GetAeropuertoByIdUsuario?id=' + usuario.IdUsuario)
            .then(function (dataAeropuerto) {
                sessionStorage.setItem('VRegistrar_Codigo_Aeropuerto', dataAeropuerto["CodigoAeropuerto"]);
            });
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var listar = new Listar();
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));

    switch (usuario.Rol) {
        case "AdministradorAeropuerto":
            listar.ObtenerCodigoAeropuerto();
            var aeropuerto = sessionStorage.getItem('VRegistrar_Codigo_Aeropuerto');
            $('#span-NombreAeropuerto').text(aeropuerto['Nombre']);
            listar.RetrieveAll(aeropuerto);
            break;
        case "SuperAdmin":
            var aeropuerto = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
            if (aeropuerto === null)
                location.href = "../Aeropuerto/Listar";
            $('#span-NombreAeropuerto').text(aeropuerto['Nombre']);
            listar.RetrieveAll(aeropuerto['CodigoAeropuerto']);
            break;
        default:
            break;
    }
    

    $('#content').on('.js-btn-detalle', 'click', function (e) {
        var itemSelected = e.target;
    });

    $('#content').on('.js-btn-editar', 'click', function (e) {
        var itemSelected = e.target;
    });

    $('#btn-regresar').on('click', function () {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
        switch (usuario.Rol) {
            case "AdministradorAeropuerto":
                //location.href = "../Dashboard/AdministradorAeropuerto";
                location.href = '../Aeropuerto/Detalle';
                break;
            case "SuperAdmin":
                //location.href ="../Dashboard/superAdmin";
                location.href = '../Aeropuerto/Detalle';
                break;
            default:
                break;
        }
    });
});




