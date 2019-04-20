(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Editar() {
    this.service = 'aeropuerto';
    this.ctrlActions = new ControlActions();
    this.formId = 'frmEdition';

    this.BuildDetail = function (data) {
        $('#CodigoAeropuerto').html(data.CodigoAeropuerto);
    }

    this.Update = function (data) {
        var aeropuertoData = {};
        aeropuertoData = this.ctrlActions.GetDataForm(this.formId);
        aeropuertoData.CodigoAeropuerto = data["CodigoAeropuerto"];
        this.ctrlActions.PutToAPI(this.service, aeropuertoData);
    }
    this.FillForm = function (data) {
        this.GetDropDownPaises();
        this.getCiudades(data.CodigoPais);
        this.ctrlActions.FillForm(this.formId, data);
    }

    this.Delete = function (data) {

        this.ctrlActions.DeleteToAPI(this.service, data, 'Listar');
    }

    this.GetDropDownPaises = function () {
        this.ctrlActions.FillDropDown('ListaValor/GetAllListaValor?idLista=Pais', 'CodigoPais');
    }

    this.getCiudades = function (id) {
        $('#CodigoCiudad option').remove();
        this.ctrlActions.GetByParamsToAPI('ListaValor/GetCiudades?idValor=' + id).then(function (data) {

            if (data.Data != 0) {
                $('#CodigoCiudad').append(new Option("Seleccione una ciudad", ""));
                $.each(data.Data, function (index, ciudad) {
                    $('#CodigoCiudad').append(new Option(ciudad.Descripcion, ciudad.IdValor));
                });
            }
            else {
                $('#CodigoCiudad').append(new Option("No tiene ninguna ciudad registrada", ""));
            }
        });
    }

    this.AddSelectedToDropDown = function (paisSeleccionado, idLista, id) {
        this.ctrlActions.GetByParamsToAPI('listaValor/GetListaValor?idLista=' + idLista + '&idValor=' + paisSeleccionado)
            .then(function (apiResponse) {

                $('#' + id).append(new Option(apiResponse.Data.Descripcion, apiResponse.Data.IdValor, true));
                $('#' + id + " > option[value=" + apiResponse.Data.IdValor + "]").prop("selected", true);
            });
    }
}

function initMap() {
    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
    //map..
    var map = new google.maps.Map(document.getElementById('dvMap'), {
        center: {
            lat: data.Latitud,
            lng: data.Longitud
        },
        zoom: 15
    });
    //marker..
    var marker = new google.maps.Marker({
        position: {
            lat: data.Latitud,
            lng: data.Longitud
        },
        map: map,
        draggable: true
    });

    //dragend event of marker
    google.maps.event.addListener(marker, 'dragend', function () {
        var Lats = marker.getPosition().lat();
        var Longs = marker.getPosition().lng();
        $('#Latitud').val(Lats);
        $('#Longitud').val(Longs);
    });
    this.FillForm = function (data) {
        this.ctrlActions.FillForm(this.formId, data);
    }
}

//ON DOCUMENT READY
$(document).ready(function () {
    $("#Latitud").hide();
    $("#Longitud").hide();
    var editar = new Editar();
    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
    if (data === null)
        location.href = "Listar";

    editar.FillForm(data);
    editar.AddSelectedToDropDown(data['CodigoPais'], 'Pais', 'CodigoPais');
    editar.AddSelectedToDropDown(data['CodigoCiudad'], 'Ciudad', 'CodigoCiudad');



    $("#CodigoPais").change(function () {
        var countryId = $("#CodigoPais").val()
        editar.getCiudades(countryId);

    });

    editar.BuildDetail(data);

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + editar.formId);
        form.validate();
        if (form.valid())
            editar.Update(data);
        window.scrollTo(0, 0);
    });

    $('#btn-eliminar').on('click', function (e) {
        editar.Delete(data);
    });
});
