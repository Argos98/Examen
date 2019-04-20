(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Registrar() {

    this.service = 'aeropuerto';
    this.ctrlActions = new ControlActions();
    this.formEdition = 'frmEdition';

    this.Create = function () {
        var aeropuertoData = {};
        aeropuertoData = this.ctrlActions.GetDataForm(this.formEdition);
        aeropuertoData.Estado = 'HA';
        //Hace el post al create
            this.ctrlActions.PostToAPI(this.service, aeropuertoData);

    }

    this.EnviarCorreo = function () {
        this.ctrlActions.EnviarCorreo("/Aeropuerto/EnviarCorreoAUsuario", "silviabolanosp@gmail.com", "Confirmación de creación aeropuerto", "Querido usuario, este es un correo que se envía de manera automática cuando se registra un aeropuerto. Por favor no lo conteste puesto que no habrá ninguna respuesta. Saludos aplicación Flay.");
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
    };
    
}

function initMap() {

    //map..
    var map = new google.maps.Map(document.getElementById('dvMap'), {
        center: {
            lat: 9.89946040323008,
            lng: -83.89028871225287
        },
        zoom: 5
    });
    //marker..
    marker = new google.maps.Marker({
        position: {
            lat: 9.89946040323008,
            lng: -83.89028871225287
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
}

//ON DOCUMENT READY
$(document).ready(function () {
    $("#Latitud").hide();
    $("#Longitud").hide();
    var registrar = new Registrar();
    var countryId = $("#CodigoPais").val();
    registrar.getCiudades(countryId);
    registrar.GetDropDownPaises();

    $("#CodigoPais").change(function () {
        var countryId = $("#CodigoPais").val()
            registrar.getCiudades(countryId);

    });

    $('#btn-submit').on('click', function (e) {
        e.preventDefault();
        var form = $("#" + registrar.formEdition);
        form.validate();
        if (form.valid())
            registrar.Create();

        registrar.EnviarCorreo();
        window.scrollTo(0, 0);

    });
});


