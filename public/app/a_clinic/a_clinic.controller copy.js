var app = angular.module('myApp', ['ngMaterial', 'ja.qr', 'angular.filter']);
app.controller('a_clinicController', function ($scope, $location, $http, $timeout, $mdSidenav, $window, $q, globalSetting, $filter) {
    var vm = this;


    //--------------------------------
    // $scope.hospname = $location.search()['hospname'];
    // $scope.orguid = $location.search()['orguid'];
    // $scope.username = $location.search()['name'];
    // console.log(globalSetting.checkOrg($scope.site));
    //----global-------------------
    // $scope.orguid = globalSetting.checkOrg($scope.site);
    // $scope.apiip = globalSetting.setting.apiip;
    // $scope.apiip12 = globalSetting.setting.apiip12;
    // $scope.ippub = globalSetting.setting.ippub;
    // $scope.entypeuid = globalSetting.setting.entypeuid_opd;
    //-----------------------------------
    // $location.url($location.path());
    $scope.right = false;
    $scope.left = false;
    $scope.showcaseOR = false;
    $scope.recc = false;
    $scope.show_p1right = false;
    // $scope.initdata = initdata;
    $scope.closeall = closeall;
    $scope.showr1 = showr1;
    $scope.showr2 = showr2;
    $scope.estimate = estimate;
    $scope.DateThai = DateThai;
    $scope.getAge = getAge;
    $scope.showbycat = showbycat;
    // $scope.openwindow = openwindow;
    $scope.PrintMe = PrintMe;
    $scope.getORcase = getORcase;
    $scope.openORpage = openORpage;
    $scope.calculate = calculate;
    $scope.tocalculate = tocalculate;
    //-------------------------------------------
    $scope.searchicd9 = searchicd9;
    $scope.showdetail = showdetail;
    $scope.searchlocal = searchlocal;
    $scope.gohome = gohome;
    // $scope.showbill = showbill;
    // $scope.showbilldetail = showbilldetail;
    $scope.return_main = return_main;
    $scope.right = true;
    $scope.left = true;
    $scope.show_estimate = true;
    $scope.edit_number0 = true;
    $scope.edit_number1 = true;
    $scope.edit_number2 = true;
    $scope.edit_number3 = true;
    $scope.edit_number4 = true;
    $scope.edit_number5 = true;
    $scope.show_searchlocal = show_searchlocal;
    $scope.searchlocalbycondition = searchlocalbycondition;
    $scope.editnumber = editnumber;
    $scope.revertnumber = revertnumber;
    $scope.setvm = setvm;
    $scope.save_data = save_data;

    $scope.mapHN = mapHN;
    $scope.show_tomapHN = false;
    $scope.show_tomapcost = false;
    $scope.show_inputHN = false;
    $scope.show_btnsave = true;
    $scope.insertHN = insertHN;
    $scope.updateHN = updateHN;
    $scope.show_inputsave = false;
    $scope.lbl_note = '';
    $scope.map_cost = map_cost;
    $scope.findbyHN = findbyHN;
    $scope.show_visit = false;
    $scope.show_visitdetail = false;
    $scope.detail_visit = detail_visit;
    $scope.show_waiting_img = false;
    $scope.show_edit_room = false;
    $scope.sumroom = sumroom;
    $scope.clearroom = clearroom;
    $scope.show_edit_df = false;
    $scope.sumdf = sumdf;
    $scope.cleardf = cleardf;
    $scope.searchHN = searchHN;
    $scope.show_episode = false;
    $scope.findcostbyHN = findcostbyHN;
    $scope.show_pagemapcost = false;
    $scope.save_mapcost = save_mapcost;
    $scope.txt_savemapcost = '';
    $scope.adjustdetail = adjustdetail;
    $scope.report = report;
    $scope.showreport = showreport;
    $scope.show_databyuser = false;
    $scope.caldiff = caldiff;
    $scope.show_report = false;
    $scope.findrange = findrange;
    $scope.setrange = setrange;
    $scope.show_print = false;
    $scope.p21 = true;
    $scope.p22 = true;
    $scope.p23 = false;
    $scope.print_estimate = print_estimate;
    $scope.closeprint = closeprint;
    $scope.search_byHN = search_byHN;
    // $scope.save2form=save2form;
    $scope.clear_vm = clear_vm;
    $scope.setitem41 = setitem41;
    $scope.setitem42 = setitem42;
    $scope.show_save = false;
    $scope.caltotal = caltotal;
    $scope.setup_item = setup_item;
    $scope.show_importhn = false;

    $scope.estimate_form = estimate_form;
    $scope.show_estimateform = show_estimateform;
    $scope.form_print = false;
    $scope.roundnumber = roundnumber;
    $scope.searchptbyhn = searchptbyhn;
    $scope.show_searchpt = false;
    // $scope.show_loading = false;
    // $scope.show_billdetail = false;
    // $scope.show_billsum = false;
    $scope.show_header = false;

    // $scope.billbyitem = billbyitem;
    // $scope.billbydate = billbydate;
    // $scope.billall = billall;
    //-----------------------------------------------------------------------------
    $scope.rep_title = rep_title;
    $scope.JSONToCSVConvertor = JSONToCSVConvertor;
    $scope.Printdetail=Printdetail;
    $scope.getOrguid=getOrguid;
    //---------------------------------------
    $scope.code = '';


    var today = new Date();
    // $scope.ptnote = {};
    $scope.dtp = {
        // value: new Date(today.getFullYear(), today.getMonth(), 1)
        value: today
    };
    $scope.dtp2 = {
        value: today
    };
    $scope.todaydate = new Date();
    setup_item();
    findrange();

    // setInterval(() => {
    //     initdata();
    // }, 50000);

    // $scope.toggleLeft = buildToggler('left');
    // $scope.toggleRight = buildToggler('right');

    // function buildToggler(componentId) {
    //     return function () {
    //         $mdSidenav(componentId).toggle();
    //     };
    // }
    getOrguid();

    function getOrguid(){
      $http.get('/org-config').then(function(success){
        var orgSite = success.data.org
        $scope.orguid = globalSetting.setting.orguid[orgSite];
        $scope.iip = globalSetting.setting.url[orgSite];
        $scope.vatnuser = globalSetting.setting.vatnuser[orgSite];
        findopd();
      })
    }
    function searchptbyhn(hn) {
        console.log(hn);
        $scope.show_wait = true;
        $http
            .post("/centrix/search_pt_byhn", {

                hn: hn,
                orguid: $scope.orguid,

            })
            .success(function (data) {
                if (data) {
                    // $scope.show_dermo = true;
                    $scope.searchpt = data.data[0];
                    console.log("$scope.searchpt");
                    console.log($scope.searchpt);
                    $http.post('/centrix/find_ptvuid', {
                        "mhn": hn,
                        "orguid": $scope.orguid,
                        // "fromdate": moment($scope.todaydate).startOf('day').format(),
                        // "todate": moment($scope.todaydate).endOf('day').format()
                    }).success(function (response) {
                        if (response.data && response.data.length > 0) {
                            $scope.ptvisit = response.data;
                            console.log('ptvisit');
                            console.log($scope.ptvisit);
                            $scope.show_searchpt = true;
                            // $scope.HN = mhn;
                            // vm.mHN = mhn;
                        } else {

                        }
                        vm.HN = '';
                    });
                    //   $scope.show_patients = true;
                    //   $scope.show_ipds = false;
                }
                // $scope.show_wait = false;
            });

    }

    function findrange() {
        $http.post('/local_host/find_range', {
            "orguid": $scope.orguid
        }).success(function (data) {
            if (data && data.data.length > 0) {
                $scope.rangeID = parseInt(data.data[0]._id);
                $scope.rangeday = parseInt(data.data[0].range);
                console.log(' $scope.rangeday');
                console.log($scope.rangeday);
                $scope.diff_ratep = parseInt(data.data[0].diff);
                $scope.diff_ratem = -1 * parseInt(data.data[0].diff);
                console.log(' $scope.diff_rate');
                console.log($scope.diff_ratep);
                console.log($scope.diff_ratem);
                $scope.diffp = (100 - $scope.diff_ratep) / 100;
                console.log($scope.diffp);
                $scope.diffm = (100 + $scope.diff_ratep) / 100;
                console.log($scope.diffm);
            } else {
                $scope.rangeday = 360;
                $scope.diff_ratep = 10;
                $scope.diff_ratem = -10;
            }

            $scope.sincedate = moment($scope.todaydate).add(-$scope.rangeday, 'days').calendar();
            searchlocal('');
        });
    }
    function setrange(exd, pwd, diffrate) {

        console.log(exd);
        if (pwd == 1234) {
            // $http.post('/local_host/set_range', {
            //     "range": exd,
            //     "orguid": $scope.orguid,
            // }).success(function (data) {
            //     $scope.txt_note = 'set up ready';

            // });
            $http.post('/local_host/update_range', {
                "range": exd,
                "diff": diffrate,
                "orguid": $scope.orguid,
                "ID": $scope.rangeID,
            }).success(function () {
                $scope.txt_note = 'set up ready';

            });
        } else {
            $scope.txt_note = 'password incorrect';

        }


    }
    //bill detail
    function searchptbyhn(hn) {
        console.log(hn);
        $scope.show_wait = true;
        $http
            .post("/centrix/search_pt_byhn", {

                hn: hn,
                orguid: $scope.orguid,

            })
            .success(function (data) {
                if (data) {
                    // $scope.show_dermo = true;
                    $scope.searchpt = data.data[0];
                    console.log("$scope.searchpt");
                    console.log($scope.searchpt);
                    $http.post('/centrix/find_ptvuid', {
                        "mhn": hn,
                        "orguid": $scope.orguid,
                        // "fromdate": moment($scope.todaydate).startOf('day').format(),
                        // "todate": moment($scope.todaydate).endOf('day').format()
                    }).success(function (response) {
                        if (response.data && response.data.length > 0) {
                            $scope.ptvisit = response.data;
                            console.log('ptvisit');
                            console.log($scope.ptvisit);
                            $scope.show_searchpt = true;
                            // $scope.HN = mhn;
                            // vm.mHN = mhn;
                        } else {

                        }
                        vm.HN = '';
                    });
                    //   $scope.show_patients = true;
                    //   $scope.show_ipds = false;
                }
                // $scope.show_wait = false;
            });

    }


    function search_byHN(hn) {
        console.log(hn);
        $scope.show_wait = true;
        $http
            .post("/centrix/search_pt_byhn", {

                hn: hn,
                orguid: $scope.orguid,

            })
            .success(function (data) {
                if (data && data.data.length > 0) {
                    $scope.show_importhn = true;
                    $scope.patient = data.data[0];
                    console.log("$scope.patient");
                    console.log($scope.patient);
                    $scope.HN = $scope.patient.mrn;
                    $scope.patientuid = $scope.patient._id;
                    $scope.patientname =
                        $scope.patient.firstname + " " + $scope.patient.lastname;
                    $scope.title = $scope.patient.titleuid[0].valuedescription;
                    $scope.gender = $scope.patient.genderuid[0].valuedescription;
                    $scope.dob = $scope.patient.dateofbirth;
                    $scope.thaiDOB = DateThai($scope.patient.dateofbirth);
                    $scope.age = getAge($scope.patient.dateofbirth);
                    $scope.address = $scope.patient.address.address;
                    $scope.ptuid = $scope.patient._id;
                } else {
                    $scope.HN = "";
                    $scope.patientuid = "";
                    $scope.patientname = "";
                    $scope.title = "";
                    $scope.gender = "";
                    $scope.dob = "";
                    $scope.thaiDOB = "";
                    $scope.age = "";
                    $scope.address = "";
                }

            });

    }
    function searchlocal(ssearch) {
        $http.post('/centrix/search_localprocedure', {
            "name": ssearch,
            "orguid": $scope.orguid,
            "fromdate": moment($scope.sincedate).startOf('day').format(),
            "todate": moment($scope.todaydate).endOf('day').format()
        }).success(function (response) {
            $scope.data_localprocedure = response.data;
            $scope.localprocedure = $scope.data_localprocedure;
            console.log('localprocedure');
            console.log($scope.localprocedure);
            $scope.showicd9 = false;
            $scope.showlocal = true;
            // $scope.toggleLeft();
            // showr1();
        });
    }
    // call from left page 
    function showdetail(code, desc) {
        // $scope.toggleLeft();

        $scope.show_waiting_img = true;
        $scope.code = code;
        $scope.procedure = desc;
        $http.post('/centrix/search_detail', {
            "code": code,
            "name": desc,
            "orguid": $scope.orguid,
            "fromdate": moment($scope.sincedate).startOf('day').format(),
            "todate": moment($scope.todaydate).endOf('day').format()
        }).success(function (response) {

            if (response.data && response.data.length > 0) {
                $scope.detailbyicd_all = response.data;
                console.log('detailbyicd_all');
                console.log($scope.detailbyicd_all);
                async.waterfall([
                    function get0(callback) {
                        $http.post('/centrix/check_ispackage', {
                            "code": code,
                            "name": desc,
                            "orguid": $scope.orguid,
                            "fromdate": moment($scope.sincedate).startOf('day').format(),
                            "todate": moment($scope.todaydate).endOf('day').format()
                        }).success(function (response) {
                            $scope.package = response.data;
                            $scope.packagecount = response.data.length;
                            console.log('$scope.package');
                            console.log($scope.package);
                            callback();
                        })

                    },
                    function get1(callback) {


                        for (var i = 0; i < $scope.detailbyicd_all.length; i++) {
                            $scope.detailbyicd_all[i].package = false;
                            for (var ii = 0; ii < $scope.package.length; ii++) {
                                if ($scope.detailbyicd_all[i].patientuid._id == $scope.package[ii]._id) {
                                    $scope.detailbyicd_all[i].package = true;
                                }
                            }
                        }
                        console.log('detailbyicd_all');
                        console.table($scope.detailbyicd_all);
                        $scope.detailbyicd = $scope.detailbyicd_all.filter(function (item) { return item.package == false });
                        $scope.detailcount = $scope.detailbyicd.length;
                        console.log('detailbyicd');
                        console.table($scope.detailbyicd);
                        // var stooges = $scope.detailbyicd
                        if ($scope.detailbyicd.length > 0) {


                            $scope.maxvalue = _.max($scope.detailbyicd, function (detailbyicd) { return detailbyicd.totalbillamount; });
                            $scope.minvalue = _.min($scope.detailbyicd, function (detailbyicd) { return detailbyicd.totalbillamount; });
                            $scope.avgvalue = $scope.detailbyicd.reduce((item, num) => {
                                return (item.totalbillamount || item) + num.totalbillamount
                            }) / $scope.detailbyicd.length;
                            if ($scope.avgvalue == NaN) {
                                $scope.avgvalue = $scope.maxvalue;
                            }

                            console.log($scope.avgvalue);
                            // $scope.table_cat = [];
                            // showbycat($scope.code, $scope.procedure);
                            // $scope.show_detail = true;
                            // showr1();
                            $scope.show_p1right = true;
                        } else {
                            $scope.show_p1right = false;
                        }
                        callback();

                    },
                    function get2(callback) {
                        $http.post('/centrix/search_bycat', {
                            "code": code,
                            "name": desc,
                            "orguid": $scope.orguid,
                            // "fromdate": moment($scope.todaydate).startOf('day').format(),
                            // "todate": moment($scope.todaydate).endOf('day').format()
                        }).success(function (response) {
                            $scope.expendbycat_all = response.data;
                            console.log('expendbycat_all');
                            console.table($scope.expendbycat_all);

                            for (var i = 0; i < $scope.expendbycat_all.length; i++) {
                                $scope.expendbycat_all[i].package = false;
                                for (var ii = 0; ii < $scope.package.length; ii++) {
                                    if ($scope.expendbycat_all[i].patientuid == $scope.package[ii]._id) {
                                        $scope.expendbycat_all[i].package = true;
                                    }
                                }
                            }
                            console.log('expendbycat_all');
                            console.table($scope.expendbycat_all);
                            $scope.expendbycat = $scope.expendbycat_all.filter(function (item) { return item.package == false });

                            console.log('expendbycat');
                            console.log($scope.expendbycat);
                            callback();
                        });
                    },
                    function get21(callback) {
                        for (var i = 0; i < $scope.expendbycat.length; i++) {
                            if ($scope.expendbycat[i].ordercatname == 'ROOM SERVICES') {
                                $scope.expendbycat[i].ordercattype = 'ROOM'

                            }
                        }
                        console.log('$scope.expendbycat');
                        console.table($scope.expendbycat);

                        // $scope.journey = {};
                        // $scope.journey = $scope.expendbycat.filter(function (opd) { return opd.patientuid == "5ddf853d93ce3e22f00d7b47" });
                        // console.log('$scope.journey');
                        // console.table($scope.journey);

                        callback();
                    },
                    function get3(callback) {
                        var data = $scope.expendbycat;
                        $scope.table_cat = [];
                        for (i = 0; i < data.length; i++) {
                            var cat = $scope.table_cat.find((cattype) => cattype.patientuid == data[i].patientuid);
                            if (!cat) {
                                $scope.table_cat.push({
                                    patientuid: data[i].patientuid,
                                    // HN: data[i].patient.mrn,
                                    MEDICINE_SUPPLY: 0,
                                    LAB_RADIO: 0,
                                    DOCTORFEE: 0,
                                    OTHERS: 0,
                                    ROOM: 0,
                                    TOTAL: 0,
                                });
                            }
                        }
                        // console.log('$scope.table_cat');
                        // console.table($scope.table_cat);
                        callback();
                    },
                    function get4(callback) {
                        for (var i = 0; i < $scope.expendbycat.length; i++) {
                            var mamount = $scope.expendbycat[i].netamount;
                            for (var j = 0; j < $scope.table_cat.length; j++) {
                                if ($scope.expendbycat[i].patientuid == $scope.table_cat[j].patientuid) {
                                    if ($scope.expendbycat[i].ordercattype == 'RADIOLOGY') {
                                        $scope.table_cat[j].LAB_RADIO = $scope.table_cat[j].LAB_RADIO + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'DOCTORFEE') {
                                        $scope.table_cat[j].DOCTORFEE = $scope.table_cat[j].DOCTORFEE + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'MEDICINE') {
                                        $scope.table_cat[j].MEDICINE_SUPPLY = $scope.table_cat[j].MEDICINE_SUPPLY + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'SUPPLY') {
                                        $scope.table_cat[j].MEDICINE_SUPPLY = $scope.table_cat[j].MEDICINE_SUPPLY + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'LAB') {
                                        $scope.table_cat[j].LAB_RADIO = $scope.table_cat[j].LAB_RADIO + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'DIET') {
                                        $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'OTHERS') {
                                        $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                                    } else if ($scope.expendbycat[i].ordercattype == 'ROOM') {
                                        $scope.table_cat[j].ROOM = $scope.table_cat[j].ROOM + mamount;
                                    } else {
                                        $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                                    }
                                }

                            }
                        }
                        //         console.log('$scope.table_cat');
                        // console.table($scope.table_cat);
                        callback();
                    },
                    function get5(callback) {
                        for (var i = 0; i < $scope.table_cat.length; i++) {

                            for (var j = 0; j < $scope.detailbyicd.length; j++) {
                                if ($scope.table_cat[i].patientuid == $scope.detailbyicd[j].patientuid._id) {
                                    $scope.table_cat[i].createdat = $scope.detailbyicd[j].createdat;
                                    $scope.table_cat[i].name = $scope.detailbyicd[j].name;
                                    $scope.table_cat[i].code = $scope.detailbyicd[j].code;
                                    $scope.table_cat[i].HN = $scope.detailbyicd[j].patientuid.mrn;
                                    $scope.table_cat[i].EN = $scope.detailbyicd[j].patientvisituid.visitid;
                                    $scope.table_cat[i].TOTAL = $scope.detailbyicd[j].totalbillamount;
                                    $scope.table_cat[i].patientvisituid = $scope.detailbyicd[j].patientvisituid._id;
                                }


                            }
                        }
                        callback();
                    },
                ], function (
                ) {

                    $scope.show_waiting_img = false;
                    console.log('$scope.table_cat');
                    console.table($scope.table_cat);
                    if ($scope.table_cat.length > 0) {


                        $scope.show_detail = true;
                        showr1();
                        $scope.$apply($scope.table_cat);



                        $scope.avgmed_sup = $scope.table_cat.reduce((item, num) => {
                            return (item.MEDICINE_SUPPLY || item) + num.MEDICINE_SUPPLY
                        }) / $scope.table_cat.filter((item) => item.MEDICINE_SUPPLY > 0).length;
                        $scope.avglab_radio = $scope.table_cat.reduce((item, num) => {
                            return (item.LAB_RADIO || item) + num.LAB_RADIO
                        }) / $scope.table_cat.filter((item) => item.LAB_RADIO > 0).length;
                        $scope.avgdf = $scope.table_cat.reduce((item, num) => {
                            return (item.DOCTORFEE || item) + num.DOCTORFEE
                        }) / $scope.table_cat.filter((item) => item.DOCTORFEE > 0).length;
                        $scope.avgothers = $scope.table_cat.reduce((item, num) => {
                            return (item.OTHERS || item) + num.OTHERS
                        }) / $scope.table_cat.filter((item) => item.OTHERS > 0).length;
                        $scope.avgroom = $scope.table_cat.reduce((item, num) => {
                            return (item.ROOM || item) + num.ROOM
                        }) / $scope.table_cat.filter((item) => item.ROOM > 0).length;
                        $scope.show_estimate = false;
                        setvm();
                    } else {
                        // $scope.show_waiting_img = false;
                        // setvm();
                    }

                })
            }
        });

    }
    function print_estimate() {
        $scope.p21 = false;
        $scope.p22 = false;
        $scope.p23 = true;
    }
    function closeprint() {
        $scope.p21 = true;
        $scope.p22 = true;
        $scope.p23 = false;
    }
    function adjustdetail(ptvuid) {
        // $scope.toggleLeft();

        $scope.show_waiting_img = true;
        $scope.ptvuid = ptvuid;


        async.waterfall([

            function get1(callback) {

                console.log('detailbyicd');
                console.table($scope.detailbyicd);
                $scope.detailbyicd = $scope.detailbyicd.filter(function (item) { return item.patientvisituid._id != $scope.ptvuid });
                $scope.detailcount = $scope.detailbyicd.length;
                console.log('TEST');
                console.table($scope.detailbyicd);
                // var stooges = $scope.detailbyicd
                $scope.maxvalue = _.max($scope.detailbyicd, function (detailbyicd) { return detailbyicd.totalbillamount; });
                $scope.minvalue = _.min($scope.detailbyicd, function (detailbyicd) { return detailbyicd.totalbillamount; });
                $scope.avgvalue = $scope.detailbyicd.reduce((item, num) => {
                    return (item.totalbillamount || item) + num.totalbillamount
                }) / $scope.detailbyicd.length;
                if ($scope.avgvalue == NaN) {
                    $scope.avgvalue = $scope.maxvalue;
                }
                console.log($scope.avgvalue);
                callback();
            },
            function get2(callback) {

                console.log('expendbycat');
                console.table($scope.expendbycat);
                $scope.expendbycat = $scope.expendbycat.filter(function (item) { return item.patientvisituid != $scope.ptvuid });

                var data = $scope.expendbycat;
                $scope.table_cat = [];
                for (i = 0; i < data.length; i++) {
                    var cat = $scope.table_cat.find((cattype) => cattype.patientuid == data[i].patientuid);
                    if (!cat) {
                        $scope.table_cat.push({
                            patientuid: data[i].patientuid,
                            // HN: data[i].patient.mrn,
                            MEDICINE_SUPPLY: 0,
                            LAB_RADIO: 0,
                            DOCTORFEE: 0,
                            OTHERS: 0,
                            ROOM: 0,
                            TOTAL: 0,
                        });
                    }
                }
                // console.log('$scope.table_cat');
                // console.table($scope.table_cat);
                callback();
            },
            function get4(callback) {
                for (var i = 0; i < $scope.expendbycat.length; i++) {
                    var mamount = $scope.expendbycat[i].netamount;
                    for (var j = 0; j < $scope.table_cat.length; j++) {
                        if ($scope.expendbycat[i].patientuid == $scope.table_cat[j].patientuid) {
                            if ($scope.expendbycat[i].ordercattype == 'RADIOLOGY') {
                                $scope.table_cat[j].LAB_RADIO = $scope.table_cat[j].LAB_RADIO + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'DOCTORFEE') {
                                $scope.table_cat[j].DOCTORFEE = $scope.table_cat[j].DOCTORFEE + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'MEDICINE') {
                                $scope.table_cat[j].MEDICINE_SUPPLY = $scope.table_cat[j].MEDICINE_SUPPLY + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'SUPPLY') {
                                $scope.table_cat[j].MEDICINE_SUPPLY = $scope.table_cat[j].MEDICINE_SUPPLY + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'LAB') {
                                $scope.table_cat[j].LAB_RADIO = $scope.table_cat[j].LAB_RADIO + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'DIET') {
                                $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'OTHERS') {
                                $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                            } else if ($scope.expendbycat[i].ordercattype == 'ROOM') {
                                $scope.table_cat[j].ROOM = $scope.table_cat[j].ROOM + mamount;
                            } else {
                                $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                            }
                        }

                    }
                }
                //         console.log('$scope.table_cat');
                // console.table($scope.table_cat);
                callback();
            },
            function get5(callback) {
                for (var i = 0; i < $scope.table_cat.length; i++) {

                    for (var j = 0; j < $scope.detailbyicd.length; j++) {
                        if ($scope.table_cat[i].patientuid == $scope.detailbyicd[j].patientuid._id) {
                            $scope.table_cat[i].createdat = $scope.detailbyicd[j].createdat;
                            $scope.table_cat[i].name = $scope.detailbyicd[j].name;
                            $scope.table_cat[i].code = $scope.detailbyicd[j].code;
                            $scope.table_cat[i].HN = $scope.detailbyicd[j].patientuid.mrn;
                            $scope.table_cat[i].EN = $scope.detailbyicd[j].patientvisituid.visitid;
                            $scope.table_cat[i].TOTAL = $scope.detailbyicd[j].totalbillamount;
                            $scope.table_cat[i].patientvisituid = $scope.detailbyicd[j].patientvisituid._id;
                        }


                    }
                }
                callback();
            },
        ], function (
        ) {

            $scope.show_waiting_img = false;
            console.log('$scope.table_cat');
            console.table($scope.table_cat);
            $scope.show_detail = true;
            showr1();
            $scope.$apply($scope.table_cat);



            $scope.avgmed_sup = $scope.table_cat.reduce((item, num) => {
                return (item.MEDICINE_SUPPLY || item) + num.MEDICINE_SUPPLY
            }) / $scope.table_cat.filter((item) => item.MEDICINE_SUPPLY > 0).length;
            $scope.avglab_radio = $scope.table_cat.reduce((item, num) => {
                return (item.LAB_RADIO || item) + num.LAB_RADIO
            }) / $scope.table_cat.filter((item) => item.LAB_RADIO > 0).length;
            $scope.avgdf = $scope.table_cat.reduce((item, num) => {
                return (item.DOCTORFEE || item) + num.DOCTORFEE
            }) / $scope.table_cat.filter((item) => item.DOCTORFEE > 0).length;
            $scope.avgothers = $scope.table_cat.reduce((item, num) => {
                return (item.OTHERS || item) + num.OTHERS
            }) / $scope.table_cat.filter((item) => item.OTHERS > 0).length;
            $scope.avgroom = $scope.table_cat.reduce((item, num) => {
                return (item.ROOM || item) + num.ROOM
            }) / $scope.table_cat.filter((item) => item.ROOM > 0).length;
            $scope.show_estimate = false;
            setvm();


        })



    }
    function show_searchlocal() {
        $scope.localprocedure = $scope.data_localprocedure;
        console.log('localprocedure');
        console.log($scope.localprocedure);
        $scope.showicd9 = false;
        $scope.showlocal = true;
        vm.msearch = '';
    }
    function searchlocalbycondition(params) {
        // console.log(params);
        if (params && params.length > 2) {


            $http.post('/centrix/search_localprocedure_bycondition', {
                "name": params,
                "orguid": $scope.orguid,
                "fromdate": moment($scope.sincedate).startOf('day').format(),
                "todate": moment($scope.todaydate).endOf('day').format()
            }).success(function (response) {
                $scope.localprocedure = response.data;
                console.log('localprocedure');
                console.log($scope.localprocedure);
                $scope.showicd9 = false;
                $scope.showlocal = true;
                // $scope.toggleLeft();
                // showr1();
            });
        }

    }
    function editnumber(params) {

        if (params == 1) {
            vm.mavgmed_sup = '';
            $scope.edit_number1 = false;
            document.getElementById('medsup').focus();
        } else if (params == 2) {
            vm.mavglab_radio = '';
            $scope.edit_number2 = false;
            document.getElementById('labradio').focus();
        } else if (params == 3) {
            vm.mavgdf1 = '';
            vm.mavgdf2 = '';
            vm.mavgdf3 = '';
            $scope.show_edit_df = true;
            document.getElementById('df1').focus();
        } else if (params == 4) {
            vm.mavgothers = '';
            $scope.edit_number4 = false;


            document.getElementById('others').focus();
        } else if (params == 5) {

            vm.mavgroom1 = '';
            vm.mavgroom2 = '';
            $scope.show_edit_room = true;
            document.getElementById('room1').focus();
        } else {

        }

    }
    function sumroom(s1, s2) {
        vm.mavgroom = parseInt(s1 || 0) + parseInt(s2 || 0);
        clearroom()
        calculate(vm.mavgmed_sup, vm.mavglab_radio, vm.mavgdf, vm.mavgothers, vm.mavgroom);
    }
    function clearroom() {
        $scope.show_edit_room = false;
        vm.mavgroom1 = 0;
        vm.mavgroom2 = 0;
    }
    function sumdf(s1, s2, s3) {
        vm.mavgdf = parseInt(s1 || 0) + parseInt(s2 || 0) + parseInt(s3 || 0);
        cleardf()
        calculate(vm.mavgmed_sup, vm.mavglab_radio, vm.mavgdf, vm.mavgothers, vm.mavgroom);
    }
    function cleardf() {
        $scope.show_edit_df = false;
        vm.mavgdf1 = 0;
        vm.mavgdf2 = 0;
        vm.mavgdf3 = 0;
    }
    function revertnumber(params) {
        if (params == 1) {
            vm.mavgmed_sup = parseInt($scope.avgmed_sup);
            $scope.edit_number1 = true;

        } else if (params == 2) {
            vm.mavglab_radio = parseInt($scope.avglab_radio);
            $scope.edit_number2 = true;
        } else if (params == 3) {
            vm.mavgdf = parseInt($scope.avgdf);
            $scope.edit_number3 = true;
        } else if (params == 4) {
            vm.mavgothers = parseInt($scope.avgothers);
            $scope.edit_number4 = true;
        } else if (params == 5) {
            vm.mavgroom = parseInt($scope.avgroom);
            $scope.edit_number5 = true;
        } else if (params == 0) {
            vm.mavgmed_sup = parseInt($scope.avgmed_sup);
            $scope.edit_number1 = true;


            vm.mavglab_radio = parseInt($scope.avglab_radio);
            $scope.edit_number2 = true;

            vm.mavgdf = parseInt($scope.avgdf);
            $scope.edit_number3 = true;

            vm.mavgothers = parseInt($scope.avgothers);
            $scope.edit_number4 = true;

            vm.mavgroom = parseInt($scope.avgroom);
            $scope.edit_number5 = true;

        } else {

        }
        calculate($scope.avgmed_sup, $scope.avglab_radio, $scope.avgdf, $scope.avgothers, $scope.avgroom);
    }
    function searchHN(mhn) {
        console.log(mhn);

        $http.post('/centrix/find_ptvuid', {
            "mhn": mhn,
            "orguid": $scope.orguid,
            // "fromdate": moment($scope.todaydate).startOf('day').format(),
            // "todate": moment($scope.todaydate).endOf('day').format()
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.findpt = response.data;
                console.log('findpt');
                console.log($scope.findpt);
                $scope.show_episode = true;
                $scope.HN = mhn;
                vm.mHN = mhn;
            } else {

            }
            vm.HN = '';
        });

    }
    //------------page estimate
    function estimate(code, name) {
        console.log(code);
        console.log(name);
        $scope.procedure = name;
        $scope.code = code;
        $scope.show_btnsave = true;
        $scope.show_inputsave = false;
        $scope.lbl_note = '';
        // $scope.show_estimate = true;
        $scope.edit_number0 = true;
        $scope.edit_number1 = true;
        $scope.edit_number2 = true;
        $scope.edit_number3 = true;
        $scope.edit_number4 = true;
        $scope.edit_number5 = true;
        vm.NB = '';
        vm.name = '';
        vm.HN = '';
        // closeall();
        // $scope.R3 = true;
    }
    function mapHN() {
        // console.log(mdate);
        $http.post('/local_host/find_mapHN', {
            "orguid": $scope.orguid,
            // "fromdate": moment(mdate).startOf('day').format(),
            // "todate": moment(mdate).endOf('day').format()
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.tomapHN = response.data;
                console.log('tomapHN');
                console.log($scope.tomapHN);
                $scope.show_tomapHN = true;
            } else {
                $scope.show_tomapHN = false;
            }

        });
    }
    //-----map cost
    function save_mapcost(exactcost, ID) {
        console.log(exactcost);
        console.log(ID);
        $http.post('/local_host/update_mapcost', {

            "exactcost": exactcost,
            "ID": ID,
        }).success(function (response) {
            $scope.txt_savemapcost = 'save data ready';
            map_cost();

        });
    }
    function findcostbyHN(params) {
        $scope.txt_savemapcost = '';
        console.log(params.ptvuid);
        $scope.show_waiting_img = true;
        $scope.id_mapcost = params._id;
        $http.post('/centrix/get_totalbill_byvisitid_org', {
            "orguid": $scope.orguid,
            "patientvisituid": params.ptvuid
        }).success(function (response) {
            if (response.data.length > 0) {
                $scope.totalbill = response.data;
                console.log('$scope.totalbill');
                console.log($scope.totalbill);
                var mtotal = 0;
                for (var i = 0; i < $scope.totalbill.length; i++) {
                    mtotal = mtotal + $scope.totalbill[i].totalbillamount + $scope.totalbill[i].totalcopayamount;
                }
                console.log(mtotal);
                $scope.total_bill = mtotal;
                $scope.show_pagemapcost = true;
            }


        })

    }
    //--------report
    function report() {

        $http.post('/local_host/q_user', {
            "orguid": $scope.orguid,
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.repusername = response.data;
                console.log('$scope.repusername ');
                console.log($scope.repusername);
                $scope.show_report = true;
            }

        });
    }

    function showreport(params) {
        $http.post('/local_host/q_estimate_byuser', {
            "orguid": $scope.orguid,
            "username": params
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.databyuser = response.data;
                for (var i = 0; i < $scope.databyuser.length; i++) {
                    var mtotal = $scope.databyuser[i].gtotal;
                    var mexact = $scope.databyuser[i].exactcost;
                    $scope.databyuser[i].diff = ((mtotal - mexact) / mexact) * 100;;
                    if ($scope.databyuser[i].diff > $scope.diff_ratep || $scope.databyuser[i].diff < $scope.diff_ratem) {
                        $scope.databyuser[i].result = false;
                    } else {
                        $scope.databyuser[i].result = true;
                    }
                }
                console.log('$scope.databyuser ');
                console.log($scope.databyuser);
                $scope.mestimatecase = $scope.databyuser.length;
                $scope.temp = $scope.databyuser.filter(function (item) { return item.result == true });
                $scope.mestimatecase_true = $scope.temp.length;
                $scope.percentcorrect = ($scope.mestimatecase_true / $scope.mestimatecase) * 100;
                $scope.show_databyuser = true;
            }

        });
    }
    function caldiff(mtotal, mexact) {
        var mdiff = ((mtotal - mexact) / mexact) * 100;
        return mdiff;
    }
    function setvm() {
        if ($scope.avgmed_sup > 0) {
            vm.mavgmed_sup = roundnumber(parseInt($scope.avgmed_sup));
        } else {
            vm.mavgmed_sup = 0;
        }
        if ($scope.avglab_radio > 0) {
            vm.mavglab_radio = roundnumber(parseInt($scope.avglab_radio));
        } else {
            vm.mavglab_radio = 0;
        }
        if ($scope.avgdf > 0) {
            vm.mavgdf = roundnumber(parseInt($scope.avgdf));
        } else {
            vm.mavgdf = 0;
        }
        if ($scope.avgothers > 0) {
            vm.mavgothers = roundnumber(parseInt($scope.avgothers));
        } else {
            vm.mavgothers = 0;
        }
        if ($scope.avgroom > 0) {
            vm.mavgroom = roundnumber(parseInt($scope.avgroom));
        } else {
            vm.mavgroom = 0;
        }
        calculate($scope.avgmed_sup, $scope.avglab_radio, $scope.avgdf, $scope.avgothers, $scope.avgroom);



        // $scope.mtotal = vm.mavgmed_sup + vm.mavglab_radio + vm.mavgdf + vm.mavgothers + vm.mavgroom;
    }
    // function save_data(med, lab, df, other, room, name, HN, username, NB, code, desc) {
    //     console.log(name);
    //     $http.post('/local_host/savedata2local', {
    //         "code": code,
    //         "desc": desc,
    //         "name": name,
    //         "HN": HN,
    //         "med": parseInt(med),
    //         "df": parseInt(df),
    //         "other": parseInt(other),
    //         "lab": parseInt(lab),
    //         "room": parseInt(room),
    //         "username": username,
    //         "orguid": $scope.orguid,
    //         "total": parseInt(med) + parseInt(lab) + parseInt(df) + parseInt(other) + parseInt(room),
    //         "NB": NB
    //     }).success(function (data) {
    //         $scope.lbl_note = 'save data ready';
    //         $scope.show_btnsave = false;
    //         $scope.show_print = true;
    //     });

    // }

    function tocalculate(med, lab, df, other, room) {
        calculate(med, lab, df, other, room);
        $scope.show_inputsave = true;
    }
    function calculate(med, lab, df, other, room) {
        console.log(med);
        console.log(lab);
        console.log(df);
        console.log(other);
        console.log(room);

        $scope.mtotal = roundnumber(parseInt(med || 0) + parseInt(lab || 0) + parseInt(df || 0) + parseInt(other || 0) + parseInt(room || 0));

        $scope.mtotal1 = roundnumber(parseInt($scope.mtotal * $scope.diffp));
        $scope.mtotal2 = roundnumber(parseInt($scope.mtotal * $scope.diffm));
        console.log($scope.mtotal);

        vm.itemprice1 = roundnumber(parseInt(med));
        vm.itemprice2 = roundnumber(parseInt(lab));
        vm.itemprice5 = roundnumber(parseInt(df));
        vm.itemprice3 = roundnumber(parseInt(other));
        vm.itemprice4 = roundnumber(parseInt(room));
        vm.item1 = 'med & supply';
        vm.item2 = 'lab & radio';
        vm.item3 = 'others';
        vm.item4 = 'room';
        vm.item5 = 'df';
        vm.item51 = 'Surgeon and Team fee';
        vm.item52 = 'Anesthesiologist fee';
        vm.item53 = 'Other medical fee';
        vm.procedure = $scope.procedure;
    }
    function gohome() {
        // window.location = "/";
        window.location = "/chooseapp#?orguid=" + $scope.orguid + "&name=" + $scope.name + "&hospname=" + $scope.hospname;

    }
    function return_main() {

        $scope.showcaseOR = false;
        $scope.right = true;
        $scope.left = true;
        // $scope.toggleLeft();
    }
    function showbycat(code, desc) {
        // $scope.toggleLeft();
        $scope.code = code;
        $scope.procedure = desc;
        $http.post('/centrix/search_bycat', {
            "code": code,
            "name": desc,
            "orguid": $scope.orguid,
            // "fromdate": moment($scope.todaydate).startOf('day').format(),
            // "todate": moment($scope.todaydate).endOf('day').format()
        }).success(function (response) {
            $scope.expendbycat = response.data;

            // console.log('expendbycat');
            // console.log($scope.expendbycat);
            async.waterfall([
                function get1(callback) {
                    for (var i = 0; i < $scope.expendbycat.length; i++) {
                        if ($scope.expendbycat[i].ordercatname == 'ROOM SERVICES') {
                            $scope.expendbycat[i].ordercattype = 'ROOM'

                        }
                    }
                    console.log('$scope.expendbycat');
                    console.log($scope.expendbycat);
                    callback();
                },
                function get2(callback) {
                    var data = $scope.expendbycat;
                    $scope.table_cat = [];
                    for (i = 0; i < data.length; i++) {
                        var cat = $scope.table_cat.find((cattype) => cattype.patientuid == data[i].patientuid);
                        if (!cat) {
                            $scope.table_cat.push({
                                patientuid: data[i].patientuid,
                                // HN: data[i].patient.mrn,
                                MEDICINE_SUPPLY: 0,
                                LAB_RADIO: 0,
                                DOCTORFEE: 0,
                                OTHERS: 0,
                                ROOM: 0,
                                TOTAL: 0,
                            });
                        }
                    }
                    //          console.log('$scope.table_cat');
                    // console.log($scope.table_cat);
                    callback();
                },
                function get3(callback) {
                    for (var i = 0; i < $scope.expendbycat.length; i++) {
                        var mamount = $scope.expendbycat[i].netamount;
                        for (var j = 0; j < $scope.table_cat.length; j++) {
                            if ($scope.expendbycat[i].patientuid == $scope.table_cat[j].patientuid) {
                                if ($scope.expendbycat[i].ordercattype == 'RADIOLOGY') {
                                    $scope.table_cat[j].LAB_RADIO = $scope.table_cat[j].LAB_RADIO + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'DOCTORFEE') {
                                    $scope.table_cat[j].DOCTORFEE = $scope.table_cat[j].DOCTORFEE + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'MEDICINE') {
                                    $scope.table_cat[j].MEDICINE_SUPPLY = $scope.table_cat[j].MEDICINE_SUPPLY + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'SUPPLY') {
                                    $scope.table_cat[j].MEDICINE_SUPPLY = $scope.table_cat[j].MEDICINE_SUPPLY + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'LAB') {
                                    $scope.table_cat[j].LAB_RADIO = $scope.table_cat[j].LAB_RADIO + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'DIET') {
                                    $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'OTHERS') {
                                    $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                                } else if ($scope.expendbycat[i].ordercattype == 'ROOM') {
                                    $scope.table_cat[j].ROOM = $scope.table_cat[j].ROOM + mamount;
                                } else {
                                    $scope.table_cat[j].OTHERS = $scope.table_cat[j].OTHERS + mamount;
                                }
                            }

                        }
                    }
                    callback();
                },
            ], function (
            ) {
                for (var ii = 0; ii < $scope.table_cat.length; ii++) {
                    $scope.table_cat[ii].TOTAL = $scope.table_cat[ii].MEDICINE_SUPPLY +
                        $scope.table_cat[ii].LAB_RADIO +
                        $scope.table_cat[ii].DOCTORFEE +
                        $scope.table_cat[ii].OTHERS +
                        $scope.table_cat[ii].ROOM;
                    console.log('$scope.table_cat');
                    console.log($scope.table_cat);
                    $scope.show_estimate = true;
                }
            })

        });
    }
    function searchicd9(ssearch, mcho) {
        // console.log(ssearch.length);
        if (ssearch && ssearch.length > 2) {
            $http.post('/centrix/search_procedure', {
                "name": ssearch,
                "orguid": $scope.orguid,
                // "fromdate": moment($scope.todaydate).startOf('day').format(),
                // "todate": moment($scope.todaydate).endOf('day').format()
            }).success(function (response) {
                $scope.icd9 = response.data;
                console.log('icd9');
                console.log($scope.icd9);
                $scope.showicd9 = true;
                $scope.showlocal = false;
                // showr1();
            });
        } else {

        }

    }

    function insertHN(data) {
        $scope.data2insertHN = data;
        console.log($scope.data2insertHN);
        $scope.show_inputHN = true;
    }
    function updateHN(data, HN, ID) {
        console.log(data);
        console.log(HN);
        $http.post('/local_host/update_HN', {
            "ptvuid": data.ptvuid,
            "EN": data.visitid,
            "HN": HN,
            "ID": ID,
        }).success(function (response) {
            $scope.show_inputHN = false;
            mapHN();

        });


    }
    function showbill(ID) {
        $scope.show_waiting_img = true;
        console.log(ID);
        $http.post('/centrix/getbill_byvisitid_org', {
            "orguid": $scope.orguid,
            "patientvisituid": ID
        }).success(function (response) {
            if (response.data.length > 0) {

                async.waterfall([
                    function get1(callback) {
                        $scope.billbytype = response.data;
                        $scope.reccount = response.data.length;
                        for (i = 0; i < $scope.billbytype.length; i++) {

                            $scope.billbytype[i].catname = $scope.billbytype[i].patientbilleditems.orderitems.ordercat.ordercattype + '/' +
                                $scope.billbytype[i].patientbilleditems.orderitems.ordercat.name + '/' +
                                $scope.billbytype[i].patientbilleditems.orderitems.code;
                        }

                        callback();

                    },
                    function get2(callback) {
                        var results = [];
                        $scope.groupbycat = $filter('groupBy')($scope.billbytype, 'catname');
                        // console.log('groupbycat');
                        // console.log($scope.groupbycat);
                        Object.keys($scope.groupbycat).forEach(function (key) {
                            var categoly = $scope.groupbycat[key];
                            var name = $scope.groupbycat[key][0].patientbilleditems.orderitemname;
                            var ordercat = $scope.groupbycat[key][0].patientbilleditems.orderitems.ordercat.ordercattype;
                            var ordercatname = $scope.groupbycat[key][0].patientbilleditems.orderitems.ordercat.name;
                            var quantity = categoly.reduce(function (a, b) {
                                return (a || 0) + (b.patientbilleditems.quantity || 0)
                            }, 0);
                            var netamount = categoly.reduce(function (a, b) {
                                return (a || 0) + (b.patientbilleditems.netamount || 0)
                            }, 0);
                            results.push({
                                categoly: key,
                                quantity: quantity,
                                netamount: netamount,
                                name: name,
                                ordercat: ordercat,
                                ordercatname: ordercatname
                            });


                        });
                        $scope.billbytype1 = results;

                        console.log('$scope.billbytype1');
                        console.log($scope.billbytype1);
                        $scope.$apply($scope.billbytype1);
                        callback();
                    },
                ], function (
                ) {


                    showr2();
                })
            }
            // sum by category
            // var results = [];
            // $scope.groupbycat = $filter('groupBy')($scope.billbytype, 'patientbilleditems.orderitems.ordercat.ordercattype');
            // console.log('groupbycat');
            // console.log($scope.groupbycat);
            // Object.keys($scope.groupbycat).forEach(function (key) {
            //     var categoly = $scope.groupbycat[key];
            //     var netamount = categoly.reduce(function (a, b) {
            //         return (a || 0) + (b.patientbilleditems.netamount || 0)
            //     }, 0);
            //     results.push({
            //         categoly: key,
            //         netamount: netamount
            //     });
            // });




        })

    }

    function openORpage() {
        // $scope.toggleLeft();
        $scope.right = false;
        $scope.left = false;
        $scope.showcaseOR = true;
    }

    function getORcase(mdate) {
        console.log(mdate);
        $scope.recc = false;
        $http.post($scope.apiip12 + '/orrecord/caseOR', {
            "orguid": $scope.orguid,
            "fromdate": moment(mdate).startOf('day').format(),
            "todate": moment(mdate).endOf('day').format()
        }).success(function (response) {
            $scope.caseOR = response.data;
            console.log('caseOR');
            console.log($scope.caseOR);
            $scope.recc = true;

        });

    }

    function closeall() {
        // openwindow();
        $scope.R1 = false;
        $scope.R2 = false;
        // $scope.R3 = false;
        // $scope.R4 = false;
        // $scope.R5 = false;
        // $scope.R6 = false;
        // $scope.R7 = false;
    }
    function showr1() {
        closeall();
        $scope.R1 = true;
    }
    function showr2() {
        closeall();

        $scope.show_waiting_img = false;
        $scope.$apply($scope.show_waiting_img);
        $scope.R2 = true;
    }

    function map_cost() {
        // console.log(mdate);
        $http.post('/local_host/find_mapcost', {
            "orguid": $scope.orguid,
            // "fromdate": moment(mdate).startOf('day').format(),
            // "todate": moment(mdate).endOf('day').format()
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.tomapcost = response.data;
                console.log('tomapcost');
                console.log($scope.tomapcost);
                $scope.show_tomapcost = true;
            } else {
                $scope.show_tomapcost = false;
            }

        });
    }
    function findbyHN(mhn) {
        $http.post('/centrix/find_ptvuid', {
            "mhn": mhn,
            "orguid": $scope.orguid,
            // "fromdate": moment($scope.todaydate).startOf('day').format(),
            // "todate": moment($scope.todaydate).endOf('day').format()
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.dermo = response.data;
                // $scope.visit = response.data[0].patientvisits;
                // $scope.ptuid = $scope.dermo[0]._id;
                console.log('dermo');
                console.log($scope.dermo);
                for (var i = 0; i < $scope.dermo.length; i++) {
                    if ($scope.dermo[i].procedure && $scope.dermo[i].procedure.length > 0) {
                        $scope.dermo[i].or = true;
                    } else {
                        $scope.dermo[i].or = false;
                    }

                }
                $scope.show_visit = true;
                // $scope.toggleLeft();
                // showr1();
            }

        });
    }
    function detail_visit(ID) {

        $http.post('/centrix/getbill_byvisitid_org', {
            "orguid": $scope.orguid,
            "patientvisituid": ID
        }).success(function (response) {
            $scope.bill = response.data;
            $scope.reccount = response.data.length;
            console.log('$scope.bill');
            console.log($scope.bill);

            // var billitem = [];
            //     for (var i = 0; i < $scope.bill.length; i++) {
            //         var patientbill = $scope.bill[i];
            //         if (patientbill.patientbilleditems && patientbill.patientbilleditems.length > 0) {
            //             billitem = billitem.concat(patientbill.patientbilleditems);
            //         }
            //     }
            //     $scope.billgroup = billitem;
            //     console.log('$scope.billgroup');
            //     console.log($scope.billgroup);

        })

    }
    //-----------------
    function caltotal(itemprice1, itemprice2, itemprice3, itemprice41, itemprice42, itemprice51, itemprice52, itemprice53) {
        $scope.gtotal = parseInt(itemprice1 || 0) + parseInt(itemprice2 || 0) + parseInt(itemprice3 || 0) + parseInt(itemprice41 || 0) + parseInt(itemprice42 || 0) + parseInt(itemprice51 || 0) + parseInt(itemprice52 || 0) + parseInt(itemprice53 || 0);
        $scope.gtotal1 = parseInt($scope.gtotal * $scope.diffp);
        $scope.gtotal2 = parseInt($scope.gtotal * $scope.diffm);
        $scope.show_save = true;
    }
    function save_data(relativename, drname, type, loo, los, ICUlos, ICUprice, wardlos, wardprice, item1, itemprice1, item2, itemprice2, item3, itemprice3, item41, itemprice41, item42, itemprice42, item51, itemprice51, item52, itemprice52, item53, itemprice53, patientname, HN, gender, thaiDOB, age, procedure, code, gtotal, ptuid) {

        //   itemprice1=roundnumber(itemprice1);
        //   itemprice2=roundnumber(itemprice2);
        //   itemprice3=roundnumber(itemprice3);
        //   itemprice41=roundnumber(itemprice41);
        //   itemprice42=roundnumber(itemprice42);
        //   itemprice51=roundnumber(itemprice51);
        //   itemprice52=roundnumber(itemprice52);
        //   itemprice53=roundnumber(itemprice53);
        //   gtotal=roundnumber(gtotal);

        console.log(patientname);
        console.log(HN);
        console.log(gender);
        console.log(thaiDOB);

        console.log(relativename);
        console.log(drname);
        console.log(type);
        console.log(loo);
        console.log(los);
        console.log(ICUlos);
        console.log(ICUprice);
        console.log(wardlos);
        console.log(wardprice);
        console.log(item1);
        console.log(itemprice1);
        console.log(item2);
        console.log(itemprice2);
        console.log(item3);
        console.log(itemprice3);
        console.log(item41);
        console.log(itemprice41);
        console.log(item42);
        console.log(itemprice42);
        console.log(item51);
        console.log(itemprice51);
        console.log(item52);
        console.log(itemprice52);
        console.log(item53);
        console.log(itemprice53);
        console.log(procedure);
        console.log(gtotal);

        $http.post('/local_host/savedata2local', {
            "code": code,
            "procedure": procedure,
            "patientname": patientname,
            "relativename": relativename,
            "drname": drname,
            "username": $scope.username,
            "orguid": $scope.orguid,
            "HN": HN,
            "gender": gender,
            "thaiDOB": thaiDOB,
            "age": age,
            "type": type,
            "loo": loo,
            "los": los,
            "ICUlos": ICUlos,
            "ICUprice": ICUprice,
            "wardlos": wardlos,
            "wardprice": wardprice,
            "item1": item1,
            "itemprice1": itemprice1,
            "item2": item2,
            "itemprice2": itemprice2,
            "item3": item3,
            "itemprice3": itemprice3,
            "item41": item41,
            "itemprice41": itemprice41,
            "item42": item42,
            "itemprice42": itemprice42,
            "item51": item51,
            "itemprice51": itemprice51,
            "item52": item52,
            "itemprice52": itemprice52,
            "item53": item53,
            "itemprice53": itemprice53,
            "gtotal": gtotal,
            "ptuid": ptuid,
        }).success(function (data) {
            $scope.lbl_note = 'save data ready';
            $scope.show_btnsave = false;
            $scope.show_print = true;
        });

    }
    function clear_vm(params) {
        if (params == 1) {
            vm.item1 = '';
            vm.itemprice1 = '';
        } else if (params == 2) {
            vm.item2 = '';
            vm.itemprice2 = '';
        } else if (params == 3) {
            vm.item3 = '';
            vm.itemprice3 = '';
        } else if (params == 41) {
            vm.item41 = '';
            vm.itemprice41 = '';
        } else if (params == 42) {
            vm.item42 = '';
            vm.itemprice42 = '';
        } else if (params == 51) {
            vm.item51 = '';
            vm.itemprice51 = '';
        } else if (params == 52) {
            vm.item52 = '';
            vm.itemprice52 = '';
        } else if (params == 53) {
            vm.item53 = '';
            vm.itemprice53 = '';
        } else {

        }
    }
    function setitem41(los, price) {
        vm.item41 = 'Intensive care unit @ ' + price + ' * ' + los + ' days';
        vm.itemprice41 = parseInt(los) * parseInt(price);

    }
    function setitem42(los, price) {
        vm.item42 = 'Type of wardroom @ ' + price + ' * ' + los + ' days';
        vm.itemprice42 = parseInt(los) * parseInt(price);

    }
    function setup_item() {
        vm.itemprice1 = '';
        vm.itemprice2 = '';
        vm.itemprice5 = '';
        vm.itemprice3 = '';
        vm.itemprice4 = '';
        vm.item1 = 'med & supply';
        vm.item2 = 'lab & radio';
        vm.item3 = 'others';
        vm.item4 = 'room';
        vm.item5 = 'df';
        vm.item51 = 'Surgeon and Team fee';
        vm.item52 = 'Anesthesiologist fee';
        vm.item53 = 'Other medical fee';
    }
    //------------------------
    function estimate_form() {
        $http.post('/local_host/q_estimateform', {
            "orguid": $scope.orguid,
        }).success(function (response) {
            if (response.data && response.data.length > 0) {
                $scope.repusername = response.data;
                console.log('$scope.repusername ');
                console.log($scope.repusername);
                $scope.show_form = true;
            }

        });
    }
    function show_estimateform(params, cho) {
        console.log(params);
        $scope.HN = params.HN;
        $scope.form_print = true;
        // window.location = "/print_eform";
        if (cho == 'eng') {
            window.open("/print_eform#?ID=" + params._id + '&orguid=' + $scope.orguid);
        } else {
            window.open("/print_tform#?ID=" + params._id + '&orguid=' + $scope.orguid);
        }

    }
    // ---------------------
    function getAge(myDate) {
        var currentDate = moment();
        var dateOfBirth = moment(myDate);
        var years = currentDate.diff(dateOfBirth, 'years');
        dateOfBirth.add(years, 'years');
        var months = currentDate.diff(dateOfBirth, 'months');
        dateOfBirth.add(months, 'months');
        var days = currentDate.diff(dateOfBirth, 'days');
        var mage = years + ' Y /' + months + ' M /' + days + 'D';
        return mage;
    }
    function PrintMe() {
        var disp_setting = "toolbar=yes,location=no,";
        disp_setting += "directories=yes,menubar=yes,";
        disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
        var content_vlue = document.getElementById('printableArea').innerHTML;
        var docprint = window.open("", "", disp_setting);
        docprint.document.open();
        docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
        docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
        docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
        docprint.document.write('<head><title>My Title</title>');
        docprint.document.write('<style type="text/css">body{ _margin:0px;');
        docprint.document.write('font-family:verdana,Arial;color:#000;');
        docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
        docprint.document.write('a{color:#000;text-decoration:none;} </style>');
        docprint.document.write('</head><body onLoad="self.print()"><center>');
        docprint.document.write(content_vlue);
        docprint.document.write('</center></body></html>');
        docprint.document.close();
        docprint.focus();
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
    function roundnumber(x) {
        x = Math.ceil(x / 1000) * 1000;

        return x;
    }
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var CSV = '';
        //Set Report title in first row or line

        CSV += ReportTitle + '\r\n\n';

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {

                //Now convert each value to string and comma-seprated
                row += index + ',';
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + '\r\n';
        }

        //1st loop is to extract each row
        for (var i = 0; i < arrData.length; i++) {
            var row = "";

            //2nd loop will extract each column and convert it in string comma-seprated
            for (var index in arrData[i]) {
                row += '"' + arrData[i][index] + '",';
            }

            row.slice(0, row.length - 1);

            //add a line break after each row
            CSV += row + '\r\n';
        }

        if (CSV == '') {
            alert("Invalid data");
            return;
        }

        //Generate a file name
        // var fileName = "MyReport_";
        var fileName = "";
        //this will remove the blank-spaces from the title and replace it with an underscore
        fileName += ReportTitle.replace(/ /g, "_");
        // fileName='kit';
        //Initialize file format you want csv or xls
        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension    

        //this trick will generate a temp <a /> tag
        var link = document.createElement("a");
        link.href = uri;

        //set the visibility hidden so it will not effect on your web-layout
        link.style = "visibility:hidden";
        link.download = fileName + ".csv";

        //this part will append the anchor tag and remove it after automatic click
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // window.open(uri);
    }
    function Printdetail() {
        var disp_setting = "toolbar=yes,location=no,";
        disp_setting += "directories=yes,menubar=yes,";
        disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
        var content_vlue = document.getElementById('print_detail').innerHTML;
        var docprint = window.open("", "", disp_setting);
        docprint.document.open();
        docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
        docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
        docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
        docprint.document.write('<head><title>My Title</title>');
        docprint.document.write('<style type="text/css">body{ _margin:0px;');
        docprint.document.write('font-family:verdana,Arial;color:#000;');
        docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
        docprint.document.write('a{color:#000;text-decoration:none;} </style>');
        docprint.document.write('</head><body onLoad="self.print()"><center>');
        docprint.document.write(content_vlue);
        docprint.document.write('</center></body></html>');
        docprint.document.close();
        docprint.focus();
    }
    function Printsum() {
        var disp_setting = "toolbar=yes,location=no,";
        disp_setting += "directories=yes,menubar=yes,";
        disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
        var content_vlue = document.getElementById('print_sum').innerHTML;
        var docprint = window.open("", "", disp_setting);
        docprint.document.open();
        docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
        docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
        docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
        docprint.document.write('<head><title>My Title</title>');
        docprint.document.write('<style type="text/css">body{ _margin:0px;');
        docprint.document.write('font-family:verdana,Arial;color:#000;');
        docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
        docprint.document.write('a{color:#000;text-decoration:none;} </style>');
        docprint.document.write('</head><body onLoad="self.print()"><center>');
        docprint.document.write(content_vlue);
        docprint.document.write('</center></body></html>');
        docprint.document.close();
        docprint.focus();
    }
})






