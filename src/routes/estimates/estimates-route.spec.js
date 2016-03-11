(function () {

  'use strict';

  var angular = window.angular,
    expect = window.chai.expect;

  var inject = angular.mock.inject,
    module = angular.mock.module;

  describe('Route: Estimates', function () {

    var suite,
      $location,
      $rootScope,
      $state;

    var mockEstimatesId;

    beforeEach(function () {

      suite = {};

      module('app', 'estimates', 'mockTemplates');

      suite.sandbox = window.getSandboxWithRouteTranslation();

      window.testSetup();

      inject(function (
        _$location_,
        _$q_,
        _$rootScope_,
        _$state_
      ) {

        $location = _$location_;
        $rootScope = _$rootScope_;
        $state = _$state_;
      });

      mockEstimatesId = '1234';
    });

    afterEach(function () {
      suite.sandbox.restore();
      suite = {};
    });

    describe('when the main url is set', function () {

      it('should change to the details state', function () {
        $location.url('/estimates/' + mockEstimatesId + '/main');
        $rootScope.$apply();

        expect($state.current.name).to.equal('root.estimates.main');
      });
    });

    describe('when the main state is set', function () {

      it('should change to the details url', function () {
        $state.go('root.estimates.main', {
          quoteId: mockEstimatesId
        });
        $rootScope.$apply();

        expect($location.url()).to.equal('/estimates/' + mockEstimatesId + '/main');
      });

    });

  });
}());
