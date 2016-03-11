(function () {

  'use strict';

  var angular = window.angular,
    expect = window.chai.expect,
    sinon = window.sinon,
    testSetup = window.testSetup,
    chance = window.chance;

  var inject = angular.mock.inject,
    module = angular.mock.module;

  describe('EstimatesCtrl', function () {

    var suite;

    function createController() {
      suite.estimatesCtrl = suite.$ctrl('EstimatesCtrl', {
        $scope: suite.$scope
      });
      suite.$rootScope.$digest();

    }

    beforeEach(function () {
      suite = {};

      module('mockTemplates', 'app', 'estimates');
      window.testSetup();
      suite.sandbox = sinon.sandbox.create();

      testSetup();

      inject(function (
        _$controller_,
        _$q_,
        _$rootScope_,
        _$templateCache_,
        _$compile_,
        _$document_,
        _$state_,
        _UtilsSvc,
        _EstimatesSvc_
      ) {

        suite.$ctrl = _$controller_;
        suite.$q = _$q_;
        suite.$rootScope = _$rootScope_;
        suite.$templateCache = _$templateCache_;
        suite.$compile = _$compile_;
        suite.$document = _$document_;
        suite.$state = _$state_;
        suite.$scope = suite.$rootScope.$new();
        suite.UtilsSvc = _UtilsSvc_;
        suite.EstimatesSvc = _EstimatesSvc_;
      });

      suite.$scope.$apply();

      suite.deferredEstimatesOverview = suite.$q.defer();
      suite.sandbox.stub(suite.EstimatesSvc, 'getEstimatesOverview').returns(suite.deferredEstimatesOverview.promise);

    });

    afterEach(function () {
      suite.sandbox.restore();
      suite = null;
    });

    describe('Given the controller has initialized', function () {

      beforeEach(function () {
        createController();
      });

      it('should identify itself as having no unsaved changes', function () {
        expect(suite.estimatesCtrl.unsavedChanges).to.equal(false);
      });
    });

    describe('When getting the estimates top level details', function () {

      var expectedState;

      beforeEach(function () {
        createController();
      });

      it('should indicate the \'loading\' state', function () {
        expectedState = 'loading';
        expect(suite.estimatesCtrl.loadingState).to.equal(expectedState);
      });
    });

    describe('Given that estimates overvew data has successfully be retrieved', function () {
      var getEstimatesOverviewResponse = {
        main: {
          status: {
            selectedValue: chance.string()
          }
        },
        estimatesStatus: {
          readOnly: true
        }
      },
        mockEstimatesId = chance.integer();

      beforeEach(function () {
        suite.EstimatesSvc.getEstimatesOverview.restore();
        suite.sandbox
          .stub(suite.EstimatesSvc, 'getEstimatesOverview')
          .returns(suite.$q.when(getEstimatesOverviewResponse));
        suite.$state.params.estimatesId = mockEstimatesId;
        createController();
      });

      it('should indicate the \'loaded\' state', function () {
        expect(suite.estimatesCtrl.loadingState).to.equal('loaded');
      });

    });

    describe('Give the retrieval of estimates top level details has failed', function () {

      beforeEach(function () {
        suite.EstimatesSvc.getEstimatesOverview.restore();
        suite.sandbox.stub(suite.EstimatesSvc, 'getEstimatesOverview').returns(suite.$q.reject());
        suite.mock = suite.sandbox.mock(suite.UtilsSvc)
          .expects('showMessage')
          .once()
          .withArgs('estimates.messages.ESTIMATES_READ_ERROR', 'error', 'retrieve-estimates');
        createController();
        suite.$scope.$apply();
      });

      it('should show failure message', function () {
        suite.mock.verify();
      });

    });

  });
}());

