(function () {

  'use strict';

  var angular = window.angular,
    expect = window.chai.expect,
    sinon = window.sinon,
    testSetup = window.testSetup,
    chance = window.chance;

  var inject = angular.mock.inject,
    module = angular.mock.module;

  describe('EstimatesLogicSvc', function () {

    var suite;

    beforeEach(function () {
      suite = {};

      module('mockTemplates', 'app', 'estimates');
      window.testSetup();
      suite.sandbox = sinon.sandbox.create();

      testSetup();

      inject(function (_EstimatesLogicSvc_) {

        suite.EstimatesLogicSvc = _EstimatesLogicSvc_;
      });

    });

    afterEach(function () {
      suite.sandbox.restore();
      suite = null;
    });

    describe('when determining the form\'s read-only state', function () {
      var response;

      beforeEach(function () {
        response = {estimatesStatus: {readOnly: null}};
      });

      describe('and estimates is read only', function () {
        it('the form should be read only', function () {
          response.estimatesStatus.readOnly = true;
          expect(suite.EstimatesLogicSvc.isReadOnly(response)).to.equal(true);
        });
      });

      describe('and estimates is writable', function () {
        it('the form should be writable', function () {
          response.estimatesStatus.readOnly = false;
          expect(suite.EstimatesLogicSvc.isReadOnly(response)).to.equal(false);
        });
      });
    });

    describe('when determining the form\'s Estimates completed state', function () {
      var response;

      beforeEach(function () {
        response = {estimatesStatus: {completed: null}};
      });

      describe('and estimates is completed', function () {
        it('the form should be completed', function () {
          response.estimatesStatus.completed = true;
          expect(suite.EstimatesLogicSvc.isCompleted(response)).to.equal(true);
        });
      });

      describe('and estimates is not completed', function () {
        it('the form should not be completed', function () {
          response.estimatesStatus.completed = false;
          expect(suite.EstimatesLogicSvc.isCompleted(response)).to.equal(false);
        });
      });
    });

    describe('Given that Estimates data is prepared for update', function () {
      var payload;

      beforeEach(function () {
        suite.estimatesData = {
          main: {
            center: {
              selected: chance.string({length: 20})
            },
            representative: {
              selected: chance.string({length: 20})
            },
            status: {
              selectedValue: chance.string({length: 20})
            }
          },
          endDate: '01/21/2015',
          customerNotes: chance.string({length: 20})
        };
        payload = suite.EstimatesLogicSvc.createEstimatesUpdatePayload(suite.estimatesData);
      });

      it('the center should be translated as expected for the PUT service', function () {
        expect(payload.center).to.equal(suite.estimatesData.main.center.selected);
      });
      it('the representative should be translated as expected for the PUT service', function () {
        expect(payload.representative).to.equal(suite.estimatesData.main.representative.selected);
      });
      it('the status should be translated as expected for the PUT service', function () {
        expect(payload.estimatesStatus).to.equal(suite.estimatesData.main.status.selectedValue);
      });
      it('the expiration should be translated as expected for the PUT service', function () {
        expect(payload.endDate).to.equal(suite.estimatesData.endDate);
      });
      it('the user notes should be translated as expected for the PUT service', function () {
        expect(payload.userNotes).to.equal(suite.estimatesData.userNotes);
      });

    });
  });
}());

