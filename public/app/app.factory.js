(function () {
    var app = angular.module('myApp');

    app.factory('globalSetting', function ($rootScope) {
        var vm = this;

        vm.setting = {

            // vacode :"EYEVISION",
            // code_cr : "['3000018','3335388']",
            orguid: {
                DEMO: '59e865c8ab5f11532bab0537',
            },
            url:{
                DEMO: 'http://159.138.253.189:30030/',
            },

        }


        return vm;

    })

    app.factory('Org')
})();


