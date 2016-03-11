(function () {

    'use strict';

    var angular = window.angular;

    function EstimatesSvc(
        $http,
        $interpolate,
        UserSvc,
        UtilsSvc,
        EstimatesLogicSvc
    ) {

        function getEstimates(estimatesId) {
            var url = 'estimates/users/' + UserSvc.get('userId') + '/estimates/' + estimatesId;

            return $http.get(url)
                .then(UtilsSvc.succeeded)
                .catch(UtilsSvc.failed);
        }

        function updateEstimates(estimatesData) {

            var putData = EstimatesLogicSvc.createQuoteUpdatePayload(quoteData),
                url = $interpolate('estimates/users/{{userId}}/estimates/{{estimatesId}}')({
                    userId: UserSvc.get('userId'),
                    estimatesId: estimatesData.main.estimatesNumber
                });

            return $http.put(url, putData);
        }

        return {
            getEstimates: getEstimates,
            updateEstimates: updateEstimates
        };
    }

    angular.module('estimates')
        .factory('EstimatesSvc', [
            '$http',
            '$interpolate',
            'UserSvc',
            'UtilsSvc',
            'EstimatesLogicSvc',
            EstimatesSvc
        ]);

}());

