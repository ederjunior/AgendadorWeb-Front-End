/**
 * Created by Eder on 03/05/2017.
 */
angular.module("agendadorweb").factory("agendadorWS",
    function($http) {

        var _listarAgenda = function () {
            return $http({
                method: "GET",
                url: "http://localhost:8080/AgendadorWeb/agendaWS/getListaAgenda"
            });
        };

        var _cadastrarAgenda = function (dados) {
            return $http({
                method: "POST",
                url: "http://localhost:8080/AgendadorWeb/agendaWS/setAgenda",
                data: dados
            });
        };

        var _deletarAgenda = function (dados) {
            return $http({
                method: "DELETE",
                url: "http://localhost:8080/AgendadorWeb/agendaWS/deletarAgenda/"+dados

            });
        };

        var _editarAgenda = function (dados) {
            return $http({
                method: "PUT",
                url: "http://localhost:8080/AgendadorWeb/agendaWS/editarAgenda",
                data: dados
            });
        };


        return {
            listarAgenda : _listarAgenda,
            cadastrarAgenda : _cadastrarAgenda,
            deletarAgenda : _deletarAgenda,
            editarAgenda : _editarAgenda
        }
    });