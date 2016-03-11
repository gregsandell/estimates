(function () {

  'use strict';

  var angular = window.angular,
    expect = window.chai.expect,
    sinon = window.sinon,
    chance = window.chance;

  var inject = angular.mock.inject,
    module = angular.mock.module;

  function mockTopLevel() {
    var chancePoolNoAmpersand = {pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^*()[]}'},
      matchedCenter = chance.string(chancePoolNoAmpersand),
      matchedRepresentative = chance.string(chancePoolNoAmpersand),
      matchedEstimatesStatus = chance.string(chancePoolNoAmpersand);

    return {
      endDate: '10-Feb-2016',
      createDate: '01-Jan-2015',
      main: {
        totalEstimatesAmount: chance.floating(),
        estimatesNumber: chance.integer({min: 1, max: 999999}),
        estimatesType: {
          selectedValue: chance.string()
        },
        center: {
          selected: {
            description: matchedCenter,
            value: matchedCenter,
            key: matchedCenter
          },
          list: [
            {
              description: chance.string(),
              value: chance.string(),
              key: chance.integer()
            },
            {
              description: matchedCenter,
              value: matchedCenter,
              key: matchedCenter
            }
          ]
        },
        representative: {
          selected: {
            description: matchedRepresentative,
            value: matchedRepresentative,
            key: matchedCenter
          },
          list: [
            {
              description: chance.string(),
              value: chance.string(),
              key: chance.string()
            },
            {
              description: matchedRepresentative,
              value: matchedRepresentative,
              key: matchedCenter
            }
          ]
        },
        status: {
          'selectedValue': matchedEstimatesStatus,
          'list': [
            {
              'description': chance.string(),
              'value': chance.string(),
              'key': chance.string()
            },
            {
              'description': matchedEstimatesStatus,
              'value': matchedEstimatesStatus,
              'key': chance.string()
            }
          ]
        }
      },
      estimatesStatus: {
        estimatesTitle: chance.string(),
        readOnly: false,
        estimatesNumber: chance.integer()
      }
    };
  }

  describe('Estimates Directive', function () {

    var suite,
      urlPattern;

    function createController() {
      suite.estimatesCtrl = suite.$controller('EstimatesCtrl', {
        $scope: suite.$scope
      });
      suite.$rootScope.$digest();
    }

    function givenDirective() {
      suite.el = angular.element('<estimates-directive unsaved-changes="unsavedChanges" completed="completed" disable="disable" save-estimates="saveEstimates" enable-save="enableSave" estimates-data="estimatesData"></estimates-directive>');
      suite.$compile(suite.el)(suite.$scope);
      suite.$scope.$apply();
    }

    beforeEach(function () {
      suite = {};
      urlPattern = /\/estimates\/accounts\/.*\/estimates\/.*/;

      module(
        'mockTemplates',
        'app'
      );

      window.testSetup();
      suite.sandbox = sinon.sandbox.create();

      inject(function (
        _$compile_,
        _$httpBackend_,
        _$rootScope_,
        _$q_,
        _$controller_,
        _$document_,
        _EstimatesSvc_
      ) {
        suite.$compile = _$compile_;
        suite.$httpBackend = _$httpBackend_;
        suite.$q = _$q_;
        suite.$rootScope = _$rootScope_;
        suite.$scope = _$rootScope_.$new();
        suite.$controller = _$controller_;
        suite.$document = _$document_;
        suite.EstimatesSvc = _EstimatesSvc_;
        suite.mockEstimatesData = mockTopLevel();
      });

      suite.$httpBackend.whenGET(urlPattern).respond(200, suite.mockEstimatesData);

    });

    afterEach(function () {
      suite.sandbox.restore();
      suite = null;
    });

    describe('Given the directive has been rendered', function () {
      beforeEach(function () {
        createController();
        suite.$httpBackend.flush();
        suite.$scope.unsavedChanges = suite.estimatesCtrl.unsavedChanges;
        suite.$scope.saveEstimates = suite.estimatesCtrl.saveEstimates;
        suite.$scope.enableSave = suite.estimatesCtrl.enableSave;
        suite.$scope.estimatesData = suite.estimatesCtrl.estimatesData;
        suite.$scope.completed = false;
      });

      describe('and elements are in readable state', function () {
        beforeEach(function () {
          suite.$scope.readOnly = false;
          givenDirective();
        });

        it('should show correct number for the estimates', function () {
          expect(suite.el.find('.estimates-number').text()).to.equal('' + suite.mockEstimatesData.main.estimatesNumber);
        });

        it('should show correct type for the estimates', function () {
          expect(suite.el.find('.estimates-type').text()).to.equal(suite.mockEstimatesData.main.estimatesType.selectedValue);
        });

        it('should show creation date for the estimates', function () {
          expect(suite.el.find('.estimates-created-date').text()).to.equal(suite.mockEstimatesData.createDate);
        });

        it('should show expiration date for the estimates', function () {
          var endDate = suite.el.find('.estimates-expires-on')[0].value;
          expect(endDate).to.equal(suite.mockEstimatesData.endDate);
        });

        it('should show the selected center', function () {
          var selectOption = suite.el.find('.estimates-center option:selected').html();
          expect(selectOption).to.equal(suite.mockEstimatesData.main.center.selected.description);
        });

        it('should show the selected representative', function () {
          var selectOption = suite.el.find('.estimates-representative option:selected').html();

          expect(selectOption).to.equal(suite.mockEstimatesData.main.representative.selected.description);
        });

      });

      describe('and elements are in read-only state', function () {

        beforeEach(function () {
          suite.$scope.disable = true;
          givenDirective();
        });

        it('should hide the expiration date', function () {
          expect(suite.el.find('.estimates-expires-on + .dropdown-menu').hasClass('ng-valid-date-disabled')).to.equal(true);
        });

        it('should disable the store select', function () {
          var selectDisabled = suite.el.find('.estimates-center').attr('disabled');
          expect(selectDisabled).to.equal('disabled');
        });

        it('should disable the representative select', function () {
            var selectDisabled = suite.el.find('.estimates-representative').attr('disabled');
            expect(selectDisabled).to.equal('disabled');
        });
      });
    });
  });
}());
