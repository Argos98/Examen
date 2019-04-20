(function () {
    var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    if (usuario.Rol !== 'AdministradorAeropuerto' && usuario.Rol !== 'AdministradorAerolinea' && usuario.Rol !== 'AsistenteAeropuerto' && usuario.Rol !== 'SuperAdmin') {
        location.href = "../Dashboard/" + usuario.Rol;
    }
})();

function Detalle() {
    this.service = 'listaValor';
    this.ctrlActions = new ControlActions();

    this.BuildDetail = function (data) {
        $('#Nombre').html(data.Nombre);
        $('#CodigoAeropuerto').html(data.CodigoAeropuerto);
        $('#Direccion').html(data.Direccion);
        $('#VuelosHora').html(data.VuelosHora);
        $('#Latitud').html(data.Latitud);
        $('#Longitud').html(data.Longitud);
        $('#PorcentajeComisionBoletos').html(data.PorcentajeComisionBoletos);
        $('#PorcentajeImpuestoVentas').html(data.PorcentajeImpuestoVentas);
        $('#ComisionUsoPuerta').html(data.ComisionUsoPuerta);
        $('#ComisionUsoParqueo').html(data.ComisionUsoParqueo);
        $('#ComisionUsoPista').html(data.ComisionUsoPista);
        $('#ZonaHoraria').html(data.ZonaHoraria);
        $('#Moneda').html(data.Moneda);
        $('#Estado').html(data.Estado == 'HA' ? 'Habilitado' : 'Deshabilitado');
    }

    this.AsignarAdmin = function (data) {
        this.ctrlActions.PostToAPI('aeropuerto/PostAdminToAirport', data);
    }

    this.RetrievePaisById = function (data) {
        this.ctrlActions.GetByParamsToAPI(this.service + '/GetListaValor?idLista=Pais&idValor=' + data.CodigoPais).then(function (data1) {
            if (data1) {
                $('#Pais').html(data1.Data.Descripcion);
            }
        });
    }
 
    this.RetrieveCiudadById = function (data) {
        this.ctrlActions.GetByParamsToAPI(this.service + '/GetListaValor?idLista=Ciudad&idValor=' + data.CodigoCiudad).then(function (data1) {
            if (data1) {
                $('#Ciudad').html(data1.Data.Descripcion);
            }
        });
    }


    this.ShowMessage = function (type, message) {
        this.ctrlActions.ShowMessage(type, message);
    }

    this.loadMapa = function () {
        $("#viewArea").zoomMarker({
            src: "https://sacramento.aero/images/uploads/maps/terminal_a-3.jpg",
            rate: 0.2,
            markers: [
                {
                    src: "https://image.flaticon.com/icons/svg/63/63349.svg",
                    x: 800,
                    y: 900,
                    size: 40,
                    click: function () {
                        Swal.fire({
                            title: '<strong>Ha seleccionado el negocio McDonalds</strong>',
                            type: 'info',
                            html:
                                '',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,

                        })
                    }
                },
                {
                    src: "https://image.flaticon.com/icons/svg/63/63349.svg",
                    x: 1400,
                    y: 800,
                    size: 40,
                    click: function () {
                        Swal.fire({
                            title: '<strong>Ha seleccionado la puerta A1</strong>',
                            type: 'info',
                            html:
                                '',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,

                        })

                    }
                }
            ]
        }) 
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
        draggable: false
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

$(document).ready(function () {
    var aeropuerto = new Detalle();
    var data = JSON.parse(sessionStorage.getItem('tblAeropuertos_selected'));
    var userData = JSON.parse(sessionStorage.getItem('usuario_sesion'));
    var $searchNoResult = $('.js-noresults');
    var $searchResult = $('.js-results');
    var adminAeropuerto = {};

    aeropuerto.RetrievePaisById(data);
    aeropuerto.RetrieveCiudadById(data);
    aeropuerto.BuildDetail(data);
    aeropuerto.loadMapa();

    if (userData && userData.Rol === 'SuperAdmin') {
        $('#btn-assign-admin').removeClass('d-none');
    }

    $('.js-clear-search').on('click', function (e) {
        e.preventDefault();
        $('#inputSearchAdmin').val('');
        $('#alert_container').addClass('d-none');
        $searchResult.find('.js-result-nombre').html('');
        $searchResult.find('.js-result-id').html('');
        $searchNoResult.find('.js-noresults-msg').html('');
        $searchResult.addClass('d-none');
        $searchNoResult.addClass('d-none');
    });

    $('.js-asignar-admin').on('click', function (e) {
        e.preventDefault();
        if (adminAeropuerto && adminAeropuerto.nombreCompleto) {
            $('#nombre').html(adminAeropuerto.nombreCompleto);
            $('#correoElectronico').html(adminAeropuerto.correoElectronico);
            $('#telefono').html(adminAeropuerto.telefono);

            aeropuerto.AsignarAdmin({ IdUsuario: adminAeropuerto.IdUsuario, CodigoAeropuerto: data.CodigoAeropuerto});
            
        } else {
            $searchNoResult.removeClass('d-none');
            $searchNoResult.find('.js-noresults-msg').html('No hay un usuario para asignar');
        }
        
    });
});

