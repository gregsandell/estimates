(function () {

  'use strict';

  var angular = window.angular;

  function EstimatesLogicSvc() {

    function isReadOnly(response) {
      return response.estimatesStatus.readOnly;
    }

    function isCompleted(response) {
      return response.estimatesStatus.completed;
    }

    function createEstimatesUpdatePayload(estimatesData) {
      return {
        center: estimatesData.main.center.selected,
        representative: estimatesData.main.representative.selected,
        estimatesStatus: estimatesData.main.status.selectedValue,
        endDate: estimatesData.endDate,
        userNotes: estimatesData.userNotes
      };
    }

    function disable(response) {
      return isCompleted(response) || isReadOnly(response);
    }

    return {
      createEstimatesUpdatePayload: createEstimatesUpdatePayload,
      disable: disable,
      isReadOnly: isReadOnly,
      isCompleted: isCompleted
    };
  }

  angular.module('estimates')
    .service('EstimatesLogicSvc', [
      EstimatesLogicSvc
    ]);

}());
