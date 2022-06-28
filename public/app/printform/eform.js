var app = angular.module('myApp', ['ngMaterial', 'angular.filter']);
app.controller('eformCtrl', function ($scope, $location, $http, $timeout, $mdSidenav, $window, $q, $filter) {
    var vm = this;
    var ID = $location.search()['ID'];
    $scope.orguid = $location.search()['orguid'];
    console.log(ID);
    $scope.select_data = select_data;
    $scope.getAge = getAge;
    $scope.PrintMe = PrintMe;



    function select_data(params) {

        $http
        .post("/local/finddata", {
            "mfile": "patient",
            "name": params,
        })
        .success(function (data) {
            if (data) {

                vm.pt = data.data;
                console.log(vm.pt);

            }

        });

    }
    function PrintMe() {
        var disp_setting = "toolbar=yes,location=no,";
        disp_setting += "directories=yes,menubar=yes,";
        disp_setting += "scrollbars=no,width=1654, height=2339, left=0, top=0";
        // disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
        var content_vlue = document.getElementById('printableArea').outerHTML;
        var docprint = window.open("", "", disp_setting);
        docprint.document.open();
        docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
        docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
        docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
        docprint.document.write('<head><title>Price estimation</title>');
        docprint.document.write(' <link rel="stylesheet" href="../app/printform/css/div.css">');
        docprint.document.write('<link rel="stylesheet" href="../app/printform/css/color_green.css">');
        docprint.document.write(' <link rel="stylesheet" href="../app/printform/css/font.css">');
        docprint.document.write('<style type="text/css">body{ _margin:0px;');
        docprint.document.write('font-family:verdana,Arial;color:#000;');
        docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:10px;}');
        docprint.document.write('a{color:#000;text-decoration:none;} </style>');
        docprint.document.write('</head><body onLoad="self.print()"><center>');
        docprint.document.write(content_vlue);
        docprint.document.write('</center></body></html>');
        docprint.document.close();
        docprint.focus();
    }

    function getAge(myDate) {
        var currentDate = moment();
        var dateOfBirth = moment(myDate);
        var years = currentDate.diff(dateOfBirth, 'years');
        dateOfBirth.add(years, 'years');
        var months = currentDate.diff(dateOfBirth, 'months');
        dateOfBirth.add(months, 'months');
        var days = currentDate.diff(dateOfBirth, 'days');
        var mage = years + ' Y/' + months + ' M/' + days + 'D';
        return mage;
    }

    function DateThai(myDate) {
        // var dateOfBirth = moment(myDate);
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        var dt = myDate.split(/\-|\s/);
        tyear = (parseInt(dt[0]) + 543).toString();
        eyear = dt[0];
        tday = dt[2].substring(0, 2);;
        tmonth = dt[1];

        var thday = new Array("อาทิตย์", "จันทร์",
            "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์");

        var thmonth = new Array("", "มกราคม", "กุมภาพันธ์", "มีนาคม",
            "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน",
            "ตุลาคม", "พฤศจิกายน", "ธันวาคม");
        t2month = thmonth[parseInt(dt[1])];


        return tday + ' ' + t2month + ' ' + tyear;
    }
});

