'use strict';
(function() {
  angular.module('app')
    .component('eleventh', {
      templateUrl: '/js/eleventh/eleventh.template.html',
      controller: controller
    });

    controller.$inject = ['$state', '$stateParams', '$http', 'gardenService', 'plotModal', 'ModalService'];
    function controller($state, $stateParams, $http, gardenService, plotModal, ModalService) {
      const vm = this;
      vm.plotData = gardenService.plots;
      vm.$onInit = function() {
        // Build produce object and color it
        gardenService.getPlots($http, 'eleventh_garden');
      };

      vm.selectPlot = function(plot_id) {
        plotModal.getModal($http, ModalService, plot_id);
      };
    }
}());
