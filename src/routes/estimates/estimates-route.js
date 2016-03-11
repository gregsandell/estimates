(function () {

  'use strict';

  var angular = window.angular;

  var route = {
    details: {
      name: 'root.estimates.main',
      url: '/:estimatesId/main',
      views: {
        'mainView@root': {
          templateUrl: 'src/estimates/main/quote-details.html',
          controller: 'EstimatesCtrl',
          controllerAs: 'estimatesCtrl'
        }
      }
    }
  };

  angular
    .module('quote')
    .config(function ($stateProvider) {
      $stateProvider
        .state(route.details);
    });
}());
