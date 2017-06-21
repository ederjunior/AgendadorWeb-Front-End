/**
 * Created by Eder on 14/06/2017.
 */
angular.module("agendadorweb").controller("historicoController", function ($scope, $location, agendadorWS) {
    $scope.listaAgenda = [];

    var listarAgenda = function(){
        var sucesso = function(dados){
            $scope.listaAgenda = dados.data;
        };

        // Callback de erro
        var erro = function(err){
            alert("Erro "+err);
        };

        agendadorWS.listarAgenda().then(sucesso,erro);
    };

    listarAgenda();
});