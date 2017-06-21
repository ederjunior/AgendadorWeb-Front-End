/**
 * Created by Eder on 26/04/2017.
 */
angular.module("agendadorweb")
    .config(["$routeProvider", function ($routeProvider) {

        $routeProvider.when("/", {
            templateUrl: "view/home.html"

        });

        $routeProvider.when("/agendamentos", {
            templateUrl: "view/agendamentos.html",
            controller: "agendamentosController"
        });

        $routeProvider.when("/historico", {
            templateUrl: "view/historico.html",
            controller: "historicoController"

        });

        $routeProvider.when("/novoAgendamento", {
            templateUrl: "view/novoAgendamento.html",
            controller: "novoAgendamentoController"
        });

    }]);