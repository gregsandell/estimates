(function () {

  'use strict';

  var angular = window.angular;

  function estimatesView() {
    return {
      restrict: 'E',
      templateUrl: 'src/estimates/estimates-directive.html',
      scope: {
        unsavedChanges: '=',
        completed: '=',
        disable: '=',
        saveEstimatesDetail: '=',
        enableSave: '=',
        estimatesData: '='
      },
      controller: 'EstimatesDirectiveCtrl',
      controllerAs: 'estimatesDirective'
    };
  }

  angular.module('estimates')
    .directive('estimatesDirective', [
      estimatesView
    ]);
}());

