(function () {
    'use strict';

    angular
        .module('app')
        .factory('PurchaseHistoryService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;

        return service;

        function GetCurrent() {
            return $http.get('/api/purchaseHistory/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/purchaseHistory').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/purchaseHistory/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/purchaseHistory/' + username).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
