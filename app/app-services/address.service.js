(function () {
    'use strict';

    angular
        .module('app')
        .factory('AddressService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/address/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/address').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/address/' + _id).then(handleSuccess, handleError);
        }

        function GetByEmail(email) {
            return $http.get('/api/address/' + email).then(handleSuccess, handleError);
        }

        function Create(user) {
            return $http.post('/api/address', user).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put('/api/address/' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/address/' + _id).then(handleSuccess, handleError);
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
