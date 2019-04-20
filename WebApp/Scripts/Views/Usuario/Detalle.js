function Detalle() {
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        console.log(data);
        var nombreCompleto = `${data.Nombre} ${data.PrimerApellido} ${data.SegundoApellido ? data.SegundoApellido : ''}`;
        $('#Nombre').html(nombreCompleto);
        $('#CorreoElectronico').html(data.CorreoElectronico);
        $('#Identificacion').html(data.Identificacion);
        $('#NumeroTelefono').html(data.NumeroTelefono);
    }
}

$(document).ready(function () {
    var usuario = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblUsuarios_selected'));
    usuario.BuildDetail(data);
});

