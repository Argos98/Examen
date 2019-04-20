(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Eliminar() {

    this.tblAeropuertosId = 'tblAeropuertos';
    this.service = 'aeropuerto';
    this.ctrlActions = new ControlActions();
    this.columns = "CodigoAeropuerto,Nombre,CodigoPais,CodigoCiudad,Direccion,Latitud,Longitud,VuelosHora,PorcentajeComisionBoletos,PorcentajeImpuestoVentas,ComisionUsoPuerta,ComisionUsoParqueo,ComisionUsoPista,ZonaHoraria,Moneda,Estado";

    this.RetrieveAll = function () {
        this.ctrlActions.FillTable(this.service, this.tblAeropuertosId, false);
    }

    this.ReloadTable = function () {
        this.ctrlActions.FillTable(this.service, this.tblAeropuertosId, true);
    }

    this.Create = function () {
        var aeropuertoData = {};
        aeropuertoData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el post al create
        this.ctrlActions.PostToAPI(this.service, aeropuertoData);
        //Refresca la tabla
        this.ReloadTable();
    }

    this.Update = function () {

        var aeropuertoData = {};
        aeropuertoData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el post al create
        this.ctrlActions.PutToAPI(this.service, aeropuertoData);
        //Refresca la tabla
        this.ReloadTable();

    }

    this.Delete = function () {

        var aeropuertoData = {};
        aeropuertoData = this.ctrlActions.GetDataForm('frmEdition');
        //Hace el post al create
        this.ctrlActions.DeleteToAPI(this.service, aeropuertoData);
        //Refresca la tabla
        this.ReloadTable();

    }

    this.BindFields = function (data) {
        this.ctrlActions.BindFields('frmEdition', data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var aeropuerto = new Eliminar();
    aeropuerto.RetrieveAll();
});

