(function () {

  'use strict';

  var angular = window.angular;

  function EstimatesCtrl(
    EstimatesLogicSvc,
    EstimatesSvc,
    $state,
    UtilsSvc,
    DateSvc
  ) {

    var ctrl = this;

    function getEstimatesSuccess(response) {
      ctrl.loadingState = 'loaded';
      ctrl.estimatesData = response;
      ctrl.completed = EstimatesLogicSvc.isCompleted(response);
      ctrl.disable = EstimatesLogicSvc.disable(response);
    }

    function getEstimatesError() {
      ctrl.loadingState = 'hasError';
      UtilsSvc.showMessage('estimates.messages.ESTIMATES_READ_ERROR', 'error', 'retrieve-estimates');
    }

    function putEstimatesSuccess() {
      UtilSvc.showMessage('estimates.messages.ESTIMATES_SUCCESS', 'success', 'write-estimates');
      getEstimates();
      ctrl.unsavedChanges = false;
    }

    function putEstimatesError() {
      ctrl.loadingState = 'hasError';
      UtilsSvc.showMessage('estimates.messages.ESTIMATES_WRITE_ERROR', 'error', 'write-estimates');
    }

    function getEstimates() {
      ctrl.loadingState = 'loading';
      EstimatesSvc.getEstimates($state.params.estimatesId)
        .then(getEstimatesSuccess)
        .catch(getEstimatesError);
    }

    function modifyEstimatesData(estimatesData) {
      estimatesData.endDate = DateSvc.getDate(estimatesData.endDate);
    }

    ctrl.saveEstimates = function () {
      modifyEstimatesData(ctrl.estimatesData);

      EstimatesSvc.updateEstimates(ctrl.estimatesData)
        .then(putEstimatesSuccess)
        .catch(putEstimatesError);
    };

    ctrl.enableSave = function () {
      ctrl.unsavedChanges = true;
    };

    // Initialize
    ctrl.unsavedChanges = false;

    getEstimates();
  }

  angular.module('estimates')
    .controller('EstimatesCtrl', [
      'EstimatesLogicSvc',
      'EstimatesSvc',
      '$state',
      'UtilsSvc',
      'DateSvc',
      EstimatesCtrl
    ]);

}());
