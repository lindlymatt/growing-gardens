'use strict';
(function() {
  angular.module("app")
    .component("garden", {
      templateUrl: "js/garden/garden.template.html",
      controller: controller
    });

  controller.$inject = ["$http", "$state", "$stateParams", 'ModalService'];

  function controller($http, $state, $stateParams, ModalService) {
    const vm = this;
    var plots = [];

    vm.$onInit = function() {
      $http.get('/api/plots').then(function(result) {
        console.log(result);
        for (var i = 0; i < result.data.length; i++) {
          if (result.data[i].farm === $stateParams.gardenName) {
            plots.push(result.data[i]);
          }
        }
        console.log("All plots :", plots);
        //Set the map
        vm.map = $stateParams.gardenName;
        console.log(vm.map);
        // console.log("map name: ", vm.map+".svg");
      });
    };

    // MODAL FUNCTIONALITY
    vm.selectPlot = function(plot_id) {
      ModalService.showModal({
        templateUrl: "js/garden/modal_plot.html",
        controller: function ($scope, $element, close) {
          // $scope.singlePlot = {};
          $http.get('/api/plots/'+plot_id).then(function(result) {
            $scope.singlePlot = result.data;
            // console.log("plot data", result.data);
            $http.get('/api/producePlots/'+plot_id).then(function(pData) {
              // console.log("produce data", pData.data);
              $scope.singlePlot.produce = [];
              for (var i = 0; i < pData.data.produce.length; i++) {
                // populate an array of key value pairs from the array of produce
                $scope.singlePlot.produce.push(pData.data.produce[i]);
              }
            });
          });

          // Get User Id for update priveladges
          $scope.getUID = function() {
            var UID = parseInt($.cookie('user_info'));
            // if(UID === $scope.singlePlot.user_id) {
            //   return true;
            // } else {
            //   return false;
            // }
            return true;
          };

          $scope.removeProduce = function(produce_id) {
            $http.delete(`/api/producePlots/${plot_id}/${produce_id}`).then(function(result) {
              console.log(result);
            });
          };

          $scope.addProduce = function() {
            console.log($scope.newProduce);
            // Make everything uppercase
            // Check produce DB to see if produce exists, if not add default produce url
            $http.get(`/api/produce`).then(function(result) {
              console.log(result);
            });
          };

          $scope.myClose = function(result){
            $element.modal('hide');
            close(null, 500);
          };
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("CLOSING MODAL AMIRITE?: ", result);
        });
      });
    };
  }
}());
