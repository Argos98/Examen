function Detalle() {
    this.service = 'aerolinea';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        $('#IdAerolinea').html(data.IdAerolinea);
        $('#CedulaJuridica').html(data.CedulaJuridica);
        $('#RazonSocial').html(data.RazonSocial);
        $('#NombreComercial').html(data.NombreComercial);
        $('#AnoFundacion').html(data.AnoFundacion);
        $('#SitioWeb').html(data.SitioWeb);
        $('#Descripcion').html(data.Descripcion);
        $('#Estado').html(data.DescripcionEstado);
    }

    this.Aprobar = function (originData) {

        originData.Estado = 'HA';
        //Hace el post al create
        this.ctrlActions.PutToAPI(this.service, originData, 'Listar');
    }

    this.Rechazar = function (originData, codigoAeropuerto) {
        originData.CodigoAeropuerto = codigoAeropuerto;
        this.ctrlActions.DeleteToAPI(this.service, originData, 'Listar');
    }
}

$(document).ready(function () {
    var aerolinea = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblAerolineas_selected'));
    var aeropuerto = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
    $('#span-NombreAeropuerto').text(aeropuerto['Nombre']);
    aerolinea.BuildDetail(data);

    if (data.Estado != 'PE') {
        $('#btn-aprobar').hide();
        $('#btn-rechazar').hide();
    }

    $('#btn-aprobar').on('click', function (e) {
        aerolinea.Aprobar(data);
    });

    $('#btn-rechazar').on('click', function (e) {
        aerolinea.Rechazar(data, aeropuerto['CodigoAeropuerto']);
    });
 });
