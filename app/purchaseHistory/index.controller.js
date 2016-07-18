(function () {
    'use strict';

    angular
        .module('app')
        .controller('PurchaseHistory.IndexController', Controller);

    function Controller(UserService, FlashService, PurchaseHistoryService) {
        var vm = this;

        vm.user = null;
        
        initController();
        

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                console.log(user);
            }).then(function () {
                PurchaseHistoryService.GetCurrent(vm.user).then(function (ph) {
                vm.ph = ph;
            })
            });
            
        }

    
        }
    

})();