function ControlActions() {
    this.URL_API = "http://localhost:61936/api/";

    this.GetUrlApiService = function (service) {
        return this.URL_API + service;
    }

    this.GetTableColumsDataName = function (tableId) {
        var val = $('#' + tableId).attr("ColumnsDataName");

        return val;
    }

    this.EnviarCorreo = function (url, correoDestino, contenido, cuerpoCorreo) {
        $.ajax({
            url: url,
            data:
            {
                emailDestino: correoDestino,
                subject: contenido,
                cuerpoEmail: cuerpoCorreo
            },
            type: 'POST'

        })
    }

    this.FillTable = function (
        service, //nombre del controlador en el api
        tableId, //id de la tabla a la cual se le van agregar los datos
        refresh, //true si se desea refrescar la tabla
        withActions = false, //true si desea mostrar los botones de editar y detalle
        hiddenColumns = [] // es un array con los id de las columnas que se desean ocultar
    ) {

        if (!refresh) {
            columns = this.GetTableColumsDataName(tableId).split(',');
            var arrayColumnsData = [];

            $.each(columns, function (index, value) {
                var obj = {};
                obj.data = value;
                arrayColumnsData.push(obj);
            });

            if (!withActions) {
                hiddenColumns.push(arrayColumnsData.length);
            }

            $('#' + tableId).DataTable({
                "language": {
                    "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
                },
                "processing": true,
                "ajax": {
                    "url": this.GetUrlApiService(service),
                    dataSrc: 'Data'
                },
                "columns": arrayColumnsData,
                "columnDefs": [ //indica cuales columnas no se van a mostrar y tampoco buscar 
                    {
                        "targets": hiddenColumns,
                        "visible": false,
                        "searchable": false
                    },
                    {
                        "targets": arrayColumnsData.length,
                        "data": null,
                        "defaultContent": '<button class="btn btn-primary btn-xs js-btn-detalle">Detalle</button> <button class="btn btn-secondary btn-xs js-btn-editar">Editar</button>'
                    }
                ]
            });
        } else {
            //RECARGA LA TABLA
            $('#' + tableId).DataTable().ajax.reload();
        }

    }

    this.FillDropDown = function (service, selectId) {
        this.GetByParamsToAPI(service).then(function (response) {
            if (response) {
                $.each(response.Data, function (index, item) {
                    $('#' + selectId).append(new Option(item.Descripcion, item.IdValor));
                });
            }
        }).fail(function (response) {
            var data = response.responseJSON;
            var ctrlActions = new ControlActions();
            ctrlActions.ShowMessage('E', data.ExceptionMessage);
            console.log(data);
        });
    }

    this.FillDashboard = function (service, idUsuario) {
        this.GetByIdToAPI(service, idUsuario).
            then(function (datosDashboard) {
                jQuery.each(datosDashboard.Data, function (propiedad, valorDePropiedad) {
                    if (jQuery.type(valorDePropiedad) === 'object') {
                        if (valorDePropiedad.Tipo === 'GraficoArea') {
                            $('.' + propiedad).each(function (index, grafico) {
                                grafico.dataset.series = JSON.stringify(valorDePropiedad.Series);//serie o datos del grafico en eje y
                                valorDePropiedad.Etiquetas.push('');//agrega una etiqueta vacía al final para que se vea la última etiqueta
                                grafico.dataset.labels = JSON.stringify(valorDePropiedad.Etiquetas);//etiquestas en el eje x
                                grafico.dataset.fillColors = '["#00c9a7","#ffc107", "#377dff"]'; //color del grafico, puse tres colores, para tres graficos juntos
                            });
                            // initialization of chartist area charts
                            $.HSCore.components.HSChartistAreaChart.init('.js-area-chart');
                        }
                    }
                    else {
                        $('#' + propiedad).text(valorDePropiedad);
                    }
                });
            });
    }

    this.GetSelectedRow = function () {
        var data = sessionStorage.getItem(tableId + '_selected');

        return data;
    };

    this.BindFields = function (formId, data) {
        console.log(data);
        $('#' + formId + ' *').filter(':input').each(function (input) {
            var columnDataName = $(this).attr("ColumnDataName");
            this.value = data[columnDataName];
        });
    }

    this.FillForm = function (formId, data) {
        $('#' + formId + ' *').filter('.js-form-filter-control').each(function (input) {
            var inputId = $(this).attr("id");
            var inputValue = data[inputId];

            $('#' + inputId).val(inputValue);

            if ($(this).get(0).tagName === "SELECT")
                $('#' + inputId + " > option[value=" + inputValue + "]").prop("selected", true);
        });
    }

    this.GetDataForm = function (formId) {
        var data = {};
        $('#' + formId + ' *').filter('.js-form-filter-control').each(function (input) {
            var columnDataName = $(this).attr("id");
            data[columnDataName] = this.value;
        });

        return data;
    }


    this.ShowMessage = function (type, message) {
        var $alertContainer = $('#alert_container');

        if (type == 'E') {
            $alertContainer.removeClass('alert-success');
            $alertContainer.removeClass('alert-warning');
            $alertContainer.addClass('alert-danger');
        } else if (type == 'I') {
            $alertContainer.removeClass('alert-danger');
            $alertContainer.removeClass('alert-success');
            $alertContainer.addClass('alert-warning');
        } else if (type == 'S') {
            $alertContainer.removeClass('alert-danger');
            $alertContainer.removeClass('alert-warning');
            $alertContainer.addClass('alert-success');
        }

        $('#alert_message').text(message);
        $('.alert').removeClass('d-none');
    };

    this.PostToAPI = function (service, data) {
        $(".loader").fadeIn("slow");
        var jqxhr = $.post(this.GetUrlApiService(service), data, function (response) {
            var ctrlActions = new ControlActions();
            ctrlActions.ShowMessage('S', response.Message);
            $(".loader").fadeOut("fast");
        })
            .fail(function (response) {
                var data = response.responseJSON;
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('E', data.ExceptionMessage);

                $(".loader").fadeOut("fast");
            });

        return jqxhr;
    };

    this.PutToAPI = function (service, data) {
        $(".loader").fadeIn("slow");
        var jqxhr = $.put(this.GetUrlApiService(service), data, function (response) {
            var ctrlActions = new ControlActions();
            ctrlActions.ShowMessage('I', response.Message);
            $(".loader").fadeOut("fast");
        })
            .fail(function (response) {
                var data = response.responseJSON;
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('E', data.ExceptionMessage);

                $(".loader").fadeOut("fast");
            });

        return jqxhr;
    };

    this.GetByIdToAPI = function (service, id) {
        $(".loader").fadeIn("slow");
        var jqxhr = $.get(`${this.GetUrlApiService(service)}/${id}`, function (data) {
            $(".loader").fadeOut("fast");
            return data.Data;
        })
            .fail(function (response) {
                $(".loader").fadeOut("fast");
                var data = response.responseJSON;
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('E', data.ExceptionMessage);
                console.log(data);
            });

        return jqxhr;
    };

    this.GetByParamsToAPI = function (service) {
        var jqxhr = $.get(this.GetUrlApiService(service), function (data) {
            return data.Data;
        })
            .fail(function (response) {
                var data = response.responseJSON;
                var ctrlActions = new ControlActions();
                ctrlActions.ShowMessage('E', data.ExceptionMessage);
                console.log(data);
            });

        return jqxhr;
    };

    this.DeleteToAPI = function (service, data, href = '') {
        Swal.fire({
            title: '¿Desea eliminar?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6'
        }).then((result) => {
            if (result.value) {
                $(".loader").fadeIn("slow");
                var jqxhr = $.delete(this.GetUrlApiService(service), data, function (response) {
                    var ctrlActions = new ControlActions();
                    $(".loader").fadeOut("fast");
                    ctrlActions.ShowMessage('S', response.Message);
                    if (href !== '')
                        location.href = href;
                })
                    .fail(function (response) {
                        $(".loader").fadeOut("fast");
                        var data = response.responseJSON;
                        var ctrlActions = new ControlActions();
                        ctrlActions.ShowMessage('E', data.ExceptionMessage);
                        console.log(data);
                    });

            }
        });
    };
}

//Custom jquery actions
$.put = function (url, data, callback) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'PUT',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}

$.delete = function (url, data, callback) {
    if ($.isFunction(data)) {
        type = type || callback,
            callback = data,
            data = {}
    }
    return $.ajax({
        url: url,
        type: 'DELETE',
        success: callback,
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
}
