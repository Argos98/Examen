function Listar() {
    this.tblCustomersId = 'tblUsuarios';
    this.service = 'usuario';
    this.ctrlActions = new ControlActions();
    this.columns = "userId,Id,Email,Nombre,Apellido";

    this.RetrieveAll = function (rol) {
        this.ctrlActions.FillTable(`${this.service}/GetByRole?rol=${rol}`, this.tblCustomersId, false, true, [0]);
    }

    this.BindFields = function (data) {
        this.ctrlActions.BindFields('frmEdition', data);
    }
}

$(document).ready(function () {
    var vcustomer = new Listar();
    var $adminAeropTab = $('#admin-aeropuerto-list');
    var $adminAerolineaTab = $('#tab-admin-aerolinea-list');
    var $clienteTab = $('#tab-cliente-list');

    if ($adminAeropTab.length) {
        vcustomer.RetrieveAll('AdministradorAeropuerto');
    }

    if ($adminAerolineaTab.length) {
        vcustomer.RetrieveAll('AdministradorAerolinea');
    }

    if ($clienteTab.length) {
        vcustomer.RetrieveAll('ClienteFinal');
    }
    
});

