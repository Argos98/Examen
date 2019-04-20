(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Editar() {
    this.service = 'negocio';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    this.Update = function (originData, aeropuertoSeleccionado) {
        var negocioData = {};
        negocioData = this.ctrlActions.GetDataForm(this.formId);
        negocioData.IdNegocio = originData.IdNegocio;
        negocioData.CodigoAeropuerto = aeropuertoSeleccionado['CodigoAeropuerto'];
        //Hace el post al create
        this.ctrlActions.PutToAPI(this.service, negocioData);
    }

    this.FillForm = function (negocioSeleccionado, aeropuertoSeleccionado) {
        this.GetDropDownLocalesComerciales(aeropuertoSeleccionado['CodigoAeropuerto']);
        this.ctrlActions.FillForm(this.formId, negocioSeleccionado);
    }

    this.GetDropDownLocalesComerciales = function (codigoAeropuerto) {
        this.ctrlActions.FillDropDown('LocalComercial/GetLocalComercialDeAeropuertoDisponibles?CodigoAeropuerto=' + codigoAeropuerto, 'IdLocalComercial');
    }

    this.AddSelectedToDropDown = function (negocioSeleccionado) {
        this.ctrlActions.GetByIdToAPI('LocalComercial' , negocioSeleccionado['IdLocalComercial'])
            .then(function (apiResponse) {
                var opcion = {};
                opcion.Descripcion = apiResponse.Data.CodigoLocalComercial;
                opcion.IdValor = apiResponse.Data.IdLocalComercial;

                $('#IdLocalComercial').append(new Option(opcion.Descripcion, opcion.IdValor, true));
                $('#IdLocalComercial' + " > option[value=" + opcion.IdValor + "]").prop("selected", true);
            });
    }

    this.Delete = function (data) {

        this.ctrlActions.DeleteToAPI(this.service, data, 'Listar');
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    var editar = new Editar();
    var negocioSeleccionado = JSON.parse(sessionStorage.getItem('tblNegocios_selected'));
    var aeropuertoSeleccionado = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));

    if (negocioSeleccionado === null && aeropuertoSeleccionado === null)
        location.href = "Listar";

    editar.FillForm(negocioSeleccionado, aeropuertoSeleccionado);

    editar.AddSelectedToDropDown(negocioSeleccionado);

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + editar.formId);
        form.validate();
        if (form.valid())
            editar.Update(negocioSeleccionado, aeropuertoSeleccionado);
        window.scrollTo(0, 0);
    });

    $('#btn-eliminar').on('click', function (e) {
        editar.Delete(negocioSeleccionado);
    });
});
