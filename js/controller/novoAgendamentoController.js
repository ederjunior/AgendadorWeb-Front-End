/**
 * Created by Eder on 27/04/2017.
 */
angular.module("agendadorweb").controller("novoAgendamentoController", function ($scope, agendadorWS, $location, $interval) {

    $scope.irPara = function (caminho) {
        $location.url(caminho);
    };
    var mydatetimepicker1 = $('#datetimepicker1').datetimepicker();
    var dtp1 = mydatetimepicker1.data('DateTimePicker');

    $scope.agenda = {};

    $scope.agendar = function (agenda) {

        if($scope.agenda.ventilador==null){
            $scope.nomeAlert = "Ventilador";
            $scope.aparecerAlert = true;
            $interval(function(){$scope.aparecerAlert = false;},3000,1);

        }else if($scope.agenda.luzDaSala==null) {
            $scope.nomeAlert = "Luz da Sala";
            $scope.aparecerAlert = true;
            $interval(function(){$scope.aparecerAlert = false;},3000,1);

        }else if($scope.agenda.tv==null) {
            $scope.nomeAlert = "TV";
            $scope.aparecerAlert = true;
            $interval(function(){$scope.aparecerAlert = false;},3000,1);

        }else if($scope.agenda.luzDoQuarto==null) {
            $scope.nomeAlert = "Luz do Quarto";
            $scope.aparecerAlert = true;
            $interval(function(){$scope.aparecerAlert = false;},3000,1);

        }else{

            var dataAtual = new Date();

            if (dtp1.date() > dataAtual) {
                agenda.dataHora = dtp1.date();

                if (agenda.ventilador == "true") {
                    agenda.ventilador = "ligado";
                } else {
                    agenda.ventilador = "desligado";
                }

                if (agenda.luzDaSala == "true") {
                    agenda.luzDaSala = "ligado";
                } else {
                    agenda.luzDaSala = "desligado";
                }

                if (agenda.tv == "true") {
                    agenda.tv = "ligado";
                } else {
                    agenda.tv = "desligado";
                }

                if (agenda.luzDoQuarto == "true") {
                    agenda.luzDoQuarto = "ligado";
                } else {
                    agenda.luzDoQuarto = "desligado";
                }

                agenda.status = "Ativo";

                agendadorWS.cadastrarAgenda(agenda).then(function (dados) {
                    $("#modalConfirmInsert").modal();
                }, function (err) {
                    alert("nâo saber " + err.msg);
                });
            }else{
                $("#modalErrInsert").modal();
            }
        }



    };
});