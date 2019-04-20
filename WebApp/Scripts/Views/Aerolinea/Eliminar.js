(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'SuperAdmin' && usuario.Rol !== 'AdministradorAeropuerto') {
        location.href = "../Aeropuerto/Listar";
    }
})();


function Eliminar() {

    this.tblAerolineaId = 'tblAerolineas';
    this.service = 'aerolinea';
    this.ctrlActions = new ControlActions();
    this.columns = "NombreComercial,AnoFundacion,SitioWeb,Descripcion";

    this.RetrieveAll = function () {
        this.ctrlActions.FillTable(this.service, this.tblAerolineaId, false);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblAerolineaId, true);
    }

    this.Create = function () {
        var aerolineaData = {};
        aerolineaData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el post al create
        this.ctrlActions.PostToAPI(this.service, aerolineaData);
        //Refresca la tabla
        this.ReloadTable();
    }

    this.Update = function () {

        var aerolineaData = {};
        aerolineaData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el post al create
        this.ctrlActions.PutToAPI(this.service, aerolineaData);
        //Refresca la tabla
        this.ReloadTable();

    }

    this.Delete = function () {

        var aerolineaData = {};
        aerolineaData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el post al create
        this.ctrlActions.DeleteToAPI(this.service, aerolineaData);
        //Refresca la tabla
        this.ReloadTable();

    }

    this.BindFields = function (data) {
        this.ctrlActions.BindFields('frmEdition', data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var aerolinea = new Eliminar();
    aerolinea.RetrieveAll();
});

