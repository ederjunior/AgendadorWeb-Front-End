/**
 * Created by Eder on 27/04/2017.
 */
angular.module("agendadorweb").controller("agendamentosController", function ($scope, $location, agendadorWS) {

    $scope.listaAgenda = [];
    $scope.listaAgendaAtivos = [];
    var idDelete = {};
    var idEditar = {};

    $scope.agendaE = [];

    var dp =  $('#datetimepicker').datetimepicker({
        defaultDate:  new Date()
    });


    $scope.modalEdit = function(idAgenda){
        idEditar = idAgenda;

        for (i = 0; i < $scope.listaAgenda.length; i++) {

            if ($scope.listaAgenda[i].id == idAgenda) {

                //$('#datetimepicker').datetimepicker({
                //    defaultDate:  new Date($scope.listaAgenda[i].dataHora)
                //});
                dp.data("DateTimePicker").date( new Date($scope.listaAgenda[i].dataHora));

                $scope.agendaE.status = $scope.listaAgenda[i].status;

                if($scope.listaAgenda[i].ventilador=="ligado"){
                    $scope.agendaE.ventilador = true;
                }else {
                    $scope.agendaE.ventilador = false;
                }
                if($scope.listaAgenda[i].luzDaSala=="ligado"){
                    $scope.agendaE.luzDaSala = true;
                }else {
                    $scope.agendaE.luzDaSala = false;
                }
                if($scope.listaAgenda[i].tv=="ligado"){
                    $scope.agendaE.tv = true;
                }else {
                    $scope.agendaE.tv = false;
                }
                if($scope.listaAgenda[i].luzDoQuarto=="ligado"){
                    $scope.agendaE.luzDoQuarto = true;
                }else {
                    $scope.agendaE.luzDoQuarto = false;
                }
            }
        }
        $("#modalEditar").modal();

    };

    $scope.modalDelete = function(idAgenda){
        $("#modalDeletar").modal();
        idDelete = idAgenda;
    };


    var listarAgenda = function(){
        var sucesso = function(dados){
            $scope.listaAgenda = dados.data;

            $scope.listaAgendaAtivos = [];

            for(var i=0;i<$scope.listaAgenda.length;i++){
                if($scope.listaAgenda[i].status=="Ativo"){
                    $scope.listaAgendaAtivos.push($scope.listaAgenda[i]);
                }
            }
        };

        // Callback de erro
        var erro = function(err){
            alert("Erro "+err);
        };

        agendadorWS.listarAgenda().then(sucesso,erro);
    };

    $scope.deletar = function(){

            agendadorWS.deletarAgenda(idDelete).then(function(dados){
                listarAgenda();
                $("#modalConfirmDelete").modal();
                idDelete = {};
            },function(err){
                alert("nâo saber "+err.msg);
            });
    };

    $scope.editar = function(agendaE){

        agendaE.id = idEditar;
        agendaE.dataHora = moment(dp.data("DateTimePicker").date());

        if(agendaE.ventilador=="true"){
            agendaE.ventilador="ligado";
        }else{
            agendaE.ventilador="desligado";
        }

        if(agendaE.luzDaSala=="true"){
            agendaE.luzDaSala="ligado";
        }else{
            agendaE.luzDaSala="desligado";
        }

        if(agendaE.tv=="true"){
            agendaE.tv="ligado";
        }else{
            agendaE.tv="desligado";
        }

        if(agendaE.luzDoQuarto=="true"){
            agendaE.luzDoQuarto="ligado";
        }else{
            agendaE.luzDoQuarto="desligado";
        }

        agendadorWS.editarAgenda(agendaE).then(function(dados){
            $("#modalConfirmEdit").modal();
            listarAgenda();
        },function(err){
            alert("nâo saber "+err.msg);
        });
        idEditar = {};
    };
    listarAgenda();
});