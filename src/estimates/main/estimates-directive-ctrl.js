(function () {

  'use strict';

  var angular = window.angular;

  function EstimatesDirectiveCtrl(DateSvc) {

    var ctrl = this;

    function getMinDate() {
      var today = DateSvc.getNewDate();

      return DateSvc.getPrevMonth(today);
    }

    function getMaxDate() {
      var today = DateSvc.getNewDate();

      return DateSvc.getNextYear(today);
    }

    ctrl.datePickerOpen = function (event, readOnly) {
      event.preventDefault();
      event.stopPropagation();
      ctrl.isOpen = !readOnly;
    };

    ctrl.isOpen = false;

    ctrl.dateOptions = {
      formatYear: 'yyyy',
      startingDay: 1,
      showWeeks: false
    };

    ctrl.format = 'dd-MMM-yyyy';

    ctrl.minDate = getMinDate();
    ctrl.maxDate = getMaxDate();

  }

  angular
    .module('estimates')
    .controller('EstimatesDirectiveCtrl', [
      'DateSvc',
      EstimatesDirectiveCtrl
    ]);

}());
