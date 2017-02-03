'use strict';
(function() {
  angular.module("app")
    .component("land", {
      templateUrl: "js/land/land.template.html",
      controller: controller
    });

  controller.$inject = ["$http", "$state", "$stateParams"];

  function controller($http, $state, $stateParams) {
    const vm = this;
    vm.hover = "";

    vm.$onInit = function() {
      $http.get('/api/plots').then(function(result) {
        // TODO Update map accoding to plot data (color?/saturation?)
      });
    };

    vm.updateHover = function(gardenName) {
      vm.hover = gardenName;
      // console.log(vm.hover);
    };

    vm.selectGarden = function(gardenName) {
      $state.go(gardenName);
    };
  }
}());
