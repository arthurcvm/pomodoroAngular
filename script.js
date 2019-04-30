angular.module('myApp', ['timer']);
    angular.module('myApp').controller('myAppCtrl', function ($scope) {
      $scope.ciclo = 1500; //25min
      $scope.interCurto = 300; //5min
      $scope.interLongo = 900; //15min
      $scope.titulo = "";

      $scope.atividades = [
      ];

      $scope.cronometro = { 'classe': 'text-danger', 'texto': 'Iniciar ciclo', 'qtdCiclo': 0 };

      $scope.timerButton = function () {
        if ($scope.cronometro.texto == "Iniciar ciclo") {
          if ($scope.cronometro.qtdCiclo > 0) {
            $scope.$broadcast('timer-add-cd-seconds', $scope.ciclo);
          }
          $scope.$broadcast('timer-start');
          $scope.cronometro.texto = "Parar ciclo";
        }
        else if ($scope.cronometro.texto == "Iniciar intervalo curto") {
          $scope.$broadcast('timer-add-cd-seconds', $scope.interCurto);
          $scope.$broadcast('timer-start');
          $scope.cronometro.texto = "Parar intervalo";
        }
        else if ($scope.cronometro.texto == "Iniciar intervalo longo") {
          $scope.$broadcast('timer-add-cd-seconds', $scope.interLongo);
          $scope.$broadcast('timer-start');
          $scope.cronometro.texto = "Parar intervalo";
        }
        else if ($scope.cronometro.texto == "Parar ciclo") {
          $scope.$broadcast('timer-stop');
          $scope.$broadcast('timer-reset');
          $scope.cronometro.texto = "Iniciar ciclo";
        }
        else if ($scope.cronometro.texto == "Parar intervalo") {
          $scope.$broadcast('timer-stop');
          $scope.$broadcast('timer-reset');
          $scope.cronometro.classe = "text-danger";
          $scope.cronometro.texto = "Iniciar ciclo";
        }
      }

      $scope.concluido = function () {
        if ($scope.cronometro.texto == "Parar ciclo") {
          playAlert('purr');
          alert("Ciclo encerrado");
          $scope.cronometro.qtdCiclo += 1;

          $scope.atividades.forEach(atividade => {
            if (!atividade.concluida) {
              atividade.ciclos += 1;
            }
          });

          if ($scope.cronometro.qtdCiclo == 4) {
            $scope.cronometro.qtdCiclo = 0;
            $scope.cronometro.classe = "text-success";
            $scope.cronometro.texto = "Iniciar intervalo longo";
          }
          else {
            $scope.cronometro.classe = "text-success";
            $scope.cronometro.texto = "Iniciar intervalo curto";
          }
        }
        else {
          playAlert('purr');
          alert("Intervalo encerrado");
          $scope.cronometro.classe = "text-danger";
          $scope.cronometro.texto = "Iniciar ciclo";
        }
      }

      $scope.adicionarAtividade = function () {
        $scope.atividades.push(
          {
            'titulo': $scope.novaAtividade, 'concluida': false, 'ciclos': 0
          })
        $scope.novaAtividade = '';
      }

      $scope.$on('timer-tick', function (event, data) {
        $scope.titulo = '(' + data.minutes + ':' + data.seconds + ') - ';
      });

    });