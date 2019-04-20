function AdministradorAeropuerto() {
    this.service = 'DashboardAdministradorAeropuerto';
    this.ctrlActions = new ControlActions();

    this.ActualizarDashboard = function () {
        var usuario = JSON.parse(sessionStorage.getItem('usuario_sesion'));
        this.ctrlActions.FillDashboard(this.service, usuario.IdUsuario);
    }
}

$(document).ready(function () {
    var vista = new AdministradorAeropuerto();
    vista.ActualizarDashboard();

    $('#btnActualizarDashboard').on('click', function (e) {
        vista.ActualizarDashboard();
    });
});

//ejemplo de datos para el grafico de aera

/*datosDashboard.IngresosAnuales = {
            Tipo: 'Grafico', Datos: {
                Series:
                    [[
                        { "meta": "Ingresos", "value": 11234.56 },
                        { "meta": "Ingresos", "value": 941114.12 },
                        { "meta": "Ingresos", "value": 1141414.3 },
                        { "meta": "Ingresos", "value": 90000.59 },
                        { "meta": "Ingresos", "value": 123454.45 },
                        { "meta": "Ingresos", "value": 93232.1265 },
                        { "meta": "Ingresos", "value": 145454.753 },
                        { "meta": "Ingresos", "value": 923456.256 },
                        { "meta": "Ingresos", "value": 16543.255},
                        { "meta": "Ingresos", "value": 99765.478 },
                        { "meta": "Ingresos", "value": 112345.951 },
                        { "meta": "Ingresos", "value": 976543.258 }
                    ]],
                Etiquetas: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
            }
        };
        datosDashboard.AlquierLocales = '$175325';
        datosDashboard.MesualidadAerolineas = '$300000';
        datosDashboard.ComisionBoletos = '$750000';
        datosDashboard.TotalLocalesNegocios = 10;
        datosDashboard.TotalLocalesComercialesDisponibles = 1;
        datosDashboard.VuelosCancelados = 3;
        datosDashboard.VuelosEfectuados = 45;
        datosDashboard.TotalVuelos = 150;
        datosDashboard.PuertasDisponibles = 3;
        datosDashboard.TotalAerolineas = 10;*/