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
    $scope.lbl1 = 'ค้นหา';
    $scope.change_select_fq = change_select_fq;
    $scope.select_fq = select_fq;
    $scope.show_select_fq = false;
    $scope.setup_p2 = setup_p2;
    $scope.select_drug = select_drug;
    $scope.searchdrug = searchdrug;
    $scope.clear_UOM = clear_UOM;
    $scope.uomtxt = "";
    $scope.delete_UOM = delete_UOM;
    $scope.save_UOM = save_UOM;
    $scope.clear_form = clear_form;
    $scope.formtxt = "";
    $scope.delete_form = delete_form;
    $scope.save_form = save_form;
    $scope.clear_frequency = clear_frequency;
    $scope.frequencytxt = "";
    $scope.deletefrequency = deletefrequency;
    $scope.save_frequency = save_frequency;
    $scope.find_frequencies = find_frequencies;
    $scope.find_form = find_form;
    $scope.find_UOM = find_UOM;
    $scope.show_finddrug = false;
    $scope.show_listalldrug = false;
    $scope.show_searchright = false;
    $scope.show_setup_newdrug = false;
    $scope.show_setup_UOM = false;
    $scope.show_setup_form = false;
    $scope.show_setup_frequency = false;
    $scope.setup_UOM = setup_UOM;
    $scope.setup_form = setup_form;
    $scope.setup_frequency = setup_frequency;
    $scope.list_drug = list_drug;
    $scope.save_newdrug = save_newdrug;
    $scope.setup_newdrug = setup_newdrug;
    $scope.searchHN = searchHN;
    $scope.find_title = find_title;
    $scope.selectitle = selectitle;
    $scope.show_p1 = true;
    $scope.show_p4 = true;
    $scope.lbl_note = '';
    $scope.show_btnsave = true;
    $scope.save_data = save_data;
    $scope.clearaddress = clearaddress;
    $scope.PrintMe = PrintMe;
    vm.district = '';
    vm.amphoe = '';
    vm.province = '';
    vm.zipcode = '';
    $scope.selection = selection;
    $scope.outputHtml = outputHtml;
    $scope.outputHtmltitle = outputHtmltitle;
    $scope.find_address = find_address;
    $scope.rep_zipcode = rep_zipcode;
    vm.table = null;
    $scope.downloadTypeChange = downloadTypeChange;
    $scope.downloadFile = downloadFile;
    $scope.renderTable = renderTable;
    $scope.rep_title = rep_title;
    vm.downloadSupports = ["csv", "xlsx", "pdf", "json"];
    $scope.getOrguid = getOrguid;
    $scope.ptname_show = false;
    $scope.prescribe = prescribe;
    $scope.show_searchdrug = false;
    $scope.save_drugdispense = save_drugdispense;
    $scope.clearsearchdrug = clearsearchdrug;
    $scope.lbl_savedrug = '';
    //---------------------------------------
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
    // setup_item();
    // findrange();

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
    $http
        .post("/local_json/readjson", {
            mfile: 'thailand.json',
        })
        .success(function (data) {
            if (data) {

                vm.address = data.data;
                console.log(vm.address);

            }

        });
    $http
        .post("/local_json/readjson", {
            mfile: 'title.json',
        })
        .success(function (data) {
            if (data) {

                vm.titles = data.data;
                console.log(vm.titles);

            }

        });
    getOrguid();

    function getOrguid() {
        $http.get('/org-config').then(function (success) {
            var orgSite = success.data.org
            $scope.orguid = globalSetting.setting.orguid[orgSite];
            $scope.url = globalSetting.setting.url[orgSite];
        })
    }
    function rep_title() {

        $http
            .post("/API/gettitle", {
                orguid: $scope.orguid,
            })
            .success(function (data) {
                if (data) {

                    vm.results = data.data;
                    console.log(vm.results);
                    renderTable("#mytable");
                }

            });

    }
    function rep_zipcode() {

        $http
            .post("/API/getzipcode", {
                orguid: $scope.orguid,
            })
            .success(function (data) {
                if (data) {

                    vm.results = data.data;
                    console.log(vm.results);
                    renderTable("#mytable");
                }

            });

    }
    function renderTable(mtable) {
        console.log(mtable);
        // var tableSetting = new Tabulator(mtable, {
        var tableSetting = {
            // height: "450px",
            virtualDomHoz: true,
            layout: "fitDataTable",
            data: vm.results, //load row data from array
            autoColumns: true, //create columns from data field names
            rowClick: function (e, row) {
                console.log(row.getData());
                collectiondetail(row.getData());
            },

            layout: "fitColumns", //fit columns to width of table
            // responsiveLayout: "hide", //hide columns that dont fit on the table
            // tooltips: true, //show tool tips on cells
            // addRowPos: "top", //when adding a new row, add it to the top of the table
            // history: true, //allow undo and redo actions on the table
            // pagination: "local", //paginate the data
            // paginationSize: 20, //allow 7 rows per page of data
            // movableColumns: true, //allow column order to be changed
            // resizableRows: true, //allow row order to be changed
        };
        console.log(vm.results);
        vm.table = new Tabulator(mtable, tableSetting);
    }
    function find_address(searchText) {
        // console.log(searchText);
        var addresses = vm.address;
        // const searchAddress = (searchText) => {
        // Get matches to current text input
        let matchItems = addresses.filter((address) => {
            const regex = new RegExp(`^${searchText}`, "gi");
            return (
                address.district.match(regex) ||
                address.districtEng.match(regex) ||
                address.amphoe.match(regex) ||
                address.amphoeEng.match(regex) ||
                address.province.match(regex) ||
                address.provinceEng.match(regex)
            );
        });
        if (searchText.length === 0) {
            matchItems = [];
            // matchList.innerHTML = "";

            // itemDistrict.value = "";
            // itemAmphoe.value = "";
            // itemProvince.value = "";
            // itemZipcode.value = "";
        }


        vm.resultaddress = matchItems;
        // console.log(vm.resultaddress);
        outputHtml(matchItems);

    }
    function find_title(searchTitle) {
        var titles = vm.titles;
        let matchtitle = titles.filter((add) => {
            const regex = new RegExp(`^${searchTitle}`, "gi");
            return (
                add.title.match(regex)
            );
        });
        if (searchTitle.length === 0) {
            matchtitle = [];

        }


        vm.resulttitle = matchtitle;

        // console.log(vm.resulttitle);
        outputHtmltitle(matchtitle);

    }
    function outputHtmltitle(matchItems) {
        if (matchItems.length > 0) {
            const html = matchItems
                .map(
                    (item) =>
                        `<li><span class="w3-large">${item.title}</span></li>`
                )
                .join("");

            //console.log(html);
            matchItem.innerHTML = `<ul class="match-items w3-ul w3-hoverable w3-border">${html}</ul>`;
            // Selection item
            matchItem.addEventListener("click", selectitle);
        }
    }
    function selectitle(event) {

        const item = event.target;
        //console.log(item.firstChild.textContent);
        // search.value = item.firstChild.textContent;
        matchItem.innerHTML = "";

        const items = item.firstChild.textContent.split(", ");
        console.log(items);
        $scope.selecttitle = items;

        stitle.innerHTML = $scope.selecttitle;
        // inputtitle.innerHTML = $scope.selecttitle;
        vm.keytitle = $scope.selecttitle;
    }
    function outputHtml(matchItems) {
        if (matchItems.length > 0) {
            const html = matchItems
                .map(
                    (item) =>
                        `<li><span class="w3-large">${item.district}, ${item.amphoe}, ${item.province}, ${item.zipcode}</span><br><span class="w3-small w3-opacity">${item.districtEng}, ${item.amphoeEng}, ${item.provinceEng}, ${item.zipcode}</span></li>`
                )
                .join("");

            //console.log(html);
            matchList.innerHTML = `<ul class="match-items w3-ul w3-hoverable w3-border">${html}</ul>`;
            // Selection item
            matchList.addEventListener("click", selection);
        }
    }
    function selection(event) {

        const item = event.target;
        //console.log(item.firstChild.textContent);
        // search.value = item.firstChild.textContent;
        matchList.innerHTML = "";

        const items = item.firstChild.textContent.split(", ");
        console.log(items);
        $scope.selectaddress = items;
        $scope.district = items[0];
        $scope.amphoe = items[1];
        $scope.province = items[2];
        $scope.zipcode = items[3];
        saddress.innerHTML = vm.road + ' ต.' + $scope.district + '  อ.' + $scope.amphoe + '  จ.' + $scope.province + '  รหัส:' + $scope.zipcode;
        vm.keyaddress = '';
        inputaddress.innerHTML = vm.road + ' ต.' + $scope.district + '  อ.' + $scope.amphoe + '  จ.' + $scope.province + '  รหัส:' + $scope.zipcode;

        // console.log(vm.district);
    }
    function clearaddress() {
        vm.road = '';
        vm.keyaddress = '';
        matchList.innerHTML = '';
        saddress.innerHTML = '';
    }
    function searchHN(params) {
        let mhn = params.replace("-", "");
        var m1 = mhn.substring(0, 2);
        var m2 = mhn.substring(2, 8);
        var hn = m1 + '-' + m2;
        console.log(hn);
        $scope.findpt = [];
        $http.post('/local/search_existHN', {
            "mfile": 'patient',
            "hn": hn,
            "orguid": $scope.orguid,
            // "fromdate": moment($scope.todaydate).startOf('day').format(),
            // "todate": moment($scope.todaydate).endOf('day').format()
        }).success(function (data) {
            if (data.data && data.data.length > 0) {
                $scope.findpt = data.data[0];
                $scope.show_searchright = true;
                $scope.ptname_show = true;
                //find visit
                $http.post('/local/findvisit', {
                    "mfile": "visit",
                    "HN": $scope.findpt.HN,
                    "statusflag": 'A',
                }).success(function (data) {
                    $scope.existvisit = data.data;
                    console.log('existvisit', $scope.existvisit);
                    var params = moment(new Date()).format("DD/MM/YYYY")
                    console.log(params);
                    $scope.visit = $scope.existvisit.filter(function (item) { return moment(item.startdate).format("DD/MM/YYYY") == params; });
                    console.log($scope.visit);
                });
            } else {
                $scope.findpt = [];
                $scope.show_searchright = false;
                $scope.ptname_show = false;
            }
            console.log('findpt', $scope.findpt);

        });

    }
    function save_data(name, surname, gender, address, email, nationalID) {
        async.waterfall([
            function get1(callback) {
                var myear = moment(new Date()).format('YY');
                console.log(myear);
                $http
                    .post("/local/findlastHN", {
                        mfile: 'patient',
                    })
                    .success(function (data) {
                        // console.log(data);
                        if (data && data.data.length > 0) {
                            var lastHN = data.data[0].HN;
                            // console.log(lastHN);
                            const myArray = lastHN.split("-");
                            // console.log(myArray[1]);
                            const myArrayn = (parseInt(myArray[1]) + 1000001).toString();

                            vm.newHN = myear + '-' + myArrayn.substring(1, 7);

                        } else {
                            lastHN = '';
                            vm.newHN = myear + '-' + '000001';
                        }
                        // console.log(lastHN);
                        // console.log(vm.newHN);
                    });
                callback();
            },
            function get2(callback) {
                // console.log(name);
                // console.log(surname);
                // console.log(gender);
                // console.log(address);
                // console.log($scope.district);
                // console.log($scope.amphoe);
                // console.log($scope.province);
                // console.log($scope.zipcode);
                // console.log(email);
                // console.log(nationalID);
                // console.log(vm.newHN);
                // console.log($scope.selecttitle[0]);
                $http.post('/local/savedata2local', {
                    "mfile": "patient",
                    "title": vm.keytitle,
                    "name": name,
                    "surname": surname,
                    "gender": gender,
                    "address": address,
                    "district": $scope.district,
                    "amphoe": $scope.amphoe,
                    "province": $scope.province,
                    "zipcode": $scope.zipcode,
                    "email": email,
                    "nationalID": nationalID,
                    "newHN": vm.newHN,
                }).success(function (data) {

                });
                callback();
            },

        ], function (err) {
            $scope.lbl_note = 'save data ready';
            $scope.show_btnsave = false;
            $scope.show_p1 = false;
            // $scope.txt_show='บันทึกรายการเรียบร้อย';
        });




    }
    function PrintMe(params) {
        var disp_setting = "toolbar=yes,location=no,";
        disp_setting += "directories=yes,menubar=yes,";
        disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
        var content_vlue = document.getElementById(params).innerHTML;
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
    //-------------drug
    function closeallpage4(params) {
        $scope.show_listalldrug = false;
        $scope.show_setup_newdrug = false;
        $scope.show_searchright = false;
        $scope.show_setup_UOM = false;
        $scope.show_setup_form = false;
        $scope.show_setup_frequency = false;
    }
    function setup_newdrug() {
        closeallpage4();
        $scope.show_setup_newdrug = true;
        find_UOM();
        find_frequencies();
        find_form();
    }
    function save_newdrug(tradename, genericname, default_dose, frequencies, UOM, form) {

        $http.post('/local/savenewdrug', {
            "mfile": "itemmaster",
            "tradename": tradename,
            "genericname": genericname,
            "default_dose": default_dose,
            "frequencies": frequencies,
            "UOM": UOM,
            "form": form,
            "statusflag": 'A',

        }).success(function (data) {
            $scope.lbl_note = 'save data ready';
            $scope.show_setup_newdrug = false;
            $scope.show_p4 = false;
        });
    }
    function list_drug() {
        $http.post('/local/list_alldrug', {
            "mfile": 'itemmaster',
        }).success(function (data) {
            if (data.data && data.data.length > 0) {
                $scope.alldrug = data.data;
                closeallpage4();
                $scope.show_listalldrug = true;
            } else {
                $scope.alldrug = [];
                // $scope.show_listalldrug = false;
            }
            console.log('alldrug', $scope.alldrug);

        });
    }
    function setup_UOM() {
        find_UOM();
        closeallpage4();
        $scope.show_setup_UOM = true;
    }
    function find_UOM() {
        $http
            .post("/local_json/readjson", {
                mfile: 'UOM.json',
            })
            .success(function (data) {
                if (data) {

                    $scope.UOMall = data.data;
                    $scope.UOM = $scope.UOMall.filter(function (choose) { return choose.statusflag == 'A' });
                    console.log($scope.UOM);
                }
            });
    }
    function find_frequencies() {
        $http
            .post("/local_json/readjson", {
                mfile: 'frequencies.json',
            })
            .success(function (data) {
                if (data) {
                    $scope.frequenciesall = data.data;
                    $scope.frequencies = $scope.frequenciesall.filter(function (choose) { return choose.statusflag == 'A' });
                    console.log($scope.frequencies);
                }
            });
    }
    function find_form() {
        $http
            .post("/local_json/readjson", {
                mfile: 'form.json',
            })
            .success(function (data) {
                if (data) {
                    $scope.formall = data.data;
                    $scope.form = $scope.formall.filter(function (choose) { return choose.statusflag == 'A' });
                    console.log($scope.form);
                }
            });
    }
    function save_UOM(valuedescription, locallanguagedesc) {
        console.log(valuedescription);
        console.log(locallanguagedesc);
        $http
            .post("/local_json/write_UOM", {
                mfile: 'UOM.json',
                valuedescription: valuedescription,
                locallanguagedesc: locallanguagedesc
            })
            .success(function (data) {
                find_UOM();
                $scope.uomtxt = "บันทึกรายการเรียบร้อย";
                clear_UOM();
            });
    }
    function delete_UOM(valuedescription, locallanguagedesc, idx) {
        console.log(valuedescription);
        console.log(locallanguagedesc);
        console.log(idx);
        $http
            .post("/local_json/deletejson", {
                mfile: 'UOM.json',
                idx: idx,
                valuedescription: valuedescription,
                locallanguagedesc: locallanguagedesc
            })
            .success(function (data) {
                find_UOM();
                $scope.uomtxt = "ยกเลิกรายการเรียบร้อย";
            });
    }
    function clear_UOM() {
        vm.valuedescription = '';
        vm.locallanguagedesc = '';
    }
    function setup_form() {
        find_form();
        closeallpage4();
        $scope.show_setup_form = true;
    }
    function save_form(valuedescription) {
        console.log(valuedescription);

        $http
            .post("/local_json/write_form", {
                mfile: 'form.json',
                valuedescription: valuedescription,
            })
            .success(function (data) {
                find_form();
                $scope.formtxt = "บันทึกรายการเรียบร้อย";
                clear_form();
            });
    }
    function delete_form(valuedescription, idx) {
        console.log(valuedescription);
        console.log(idx);
        $http
            .post("/local_json/delete_form", {
                mfile: 'form.json',
                idx: idx,
                valuedescription: valuedescription,
            })
            .success(function (data) {
                find_form();
                $scope.formtxt = "ยกเลิกรายการเรียบร้อย";
            });
    }
    function clear_form() {
        vm.valuedescription = '';
    }
    function setup_frequency() {
        find_frequencies();
        closeallpage4();
        $scope.show_setup_frequency = true;
    }
    function save_frequency(description, locallangdesc) {
        console.log(description);
        console.log(locallangdesc);
        $http
            .post("/local_json/write_frequency", {
                mfile: 'frequencies.json',
                description: description,
                locallangdesc: locallangdesc,
            })
            .success(function (data) {
                find_frequencies();
                $scope.frequencytxt = "บันทึกรายการเรียบร้อย";
                clear_frequency();
            });
    }
    function deletefrequency(description, locallangdesc, idx) {
        console.log(description);
        console.log(locallangdesc);
        console.log(idx);
        $http
            .post("/local_json/delete_frequency", {
                mfile: 'frequencies.json',
                idx: idx,
                locallangdesc: locallangdesc,
                description: description,
            })
            .success(function (data) {
                find_frequencies();
                $scope.frequencytxt = "ยกเลิกรายการเรียบร้อย";
            });
    }
    function clear_frequency() {
        vm.description = '';
        vm.locallangdesc = '';
    }
    function setup_p2() {
        find_frequencies();
    }
    function searchdrug(params) {
        $scope.lbl_savedrug = '';
        $http.post('/local/search_drug', {
            "mfile": 'itemmaster',
            "name": params,

        }).success(function (data) {
            if (data.data && data.data.length > 0) {
                $scope.finddrug = data.data;
                $scope.show_finddrug = true;

            } else {
                $scope.finddrug = [];
                $scope.show_finddrug = false;

            }
            console.log('finddrug', $scope.finddrug);

        });
    }
    function select_drug(params) {
        $scope.show_finddrug = false;
        $scope.show_inputdrug = true;

        console.log(params);
        $scope.tradename = params.tradename;
        $scope.defaultdose = params.default_dose + ' ' + params.UOM;
        $scope.fq = params.frequencies;
    }
    function select_fq(params) {
        $scope.fq = params;
        $scope.show_select_fq = false;
    }
    function change_select_fq() {

        $scope.show_select_fq = true;

    }
    function prescribe(HN) {
        console.log($scope.visit);
        $scope.show_searchdrug = true;
        if ($scope.visit && $scope.visit.length > 0) {
            console.log($scope.visit);
            $scope.HN = $scope.visit[0].HN;
            $scope.EN = $scope.visit[0].EN;
            console.log($scope.HN);
            console.log($scope.EN);
        } else {
            $http.post('/local/newvisit', {
                "mfile": "visit",
                "HN": HN,
                "statusflag": 'A',
            }).success(function (data) {
                $scope.visit = data;
                console.log($scope.visit);
                // $scope.show_setup_newdrug = false;
                $scope.HN = data.data.HN;
                $scope.EN = data.data.EN;
            });
        }



    }
    function clearsearchdrug() {
        vm.msearchdrug = '';
        $scope.defaultdose = '';
        $scope.fq = '';
        vm.amount = '';
        document.getElementById("s_d").focus();
    }
    function save_drugdispense(tradename, defaultdose, fq, amount, EN, HN) {
        console.log(tradename, defaultdose, fq, amount, EN, HN);

        $scope.lbl_savedrug = 'save data ready';
        clearsearchdrug();
        $http.post("/local/save_order", {
            mfile: 'visit',
            tradename: tradename,
            defaultdose: defaultdose,
            fq: fq,
            amount: amount,
            EN: EN,
            HN: HN,
        }).success(function (data) {
            // find_frequencies();
            // $scope.frequencytxt="บันทึกรายการเรียบร้อย";
            // clear_frequency();
        });
    }

    //--------library

    function gohome() {
        // window.location = "/";
        window.location = "/chooseapp#?orguid=" + $scope.orguid + "&name=" + $scope.name + "&hospname=" + $scope.hospname;

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
    function downloadTypeChange(fileType) {
        localStorage.setItem("DOWNLOAD_TYPE", fileType);
    }
    function downloadFile(fileType) {
        vm.headertxt = "Title";
        if (fileType === "pdf") {
            vm.table.download(fileType, vm.headertxt, {
                autoTable: function (doc) {
                    var doc = new jsPDF();
                    doc.addFont("THSarabunNew", "bold");
                    doc.setFont("THSarabunNew", "bold");
                    doc.setFontSize(16);
                    var header = function (data) {
                        doc.setFontSize(18);
                        doc.setTextColor(40);
                        doc.setFont("THSarabunNew", "normal");
                        doc.text("", data.settings.margin.left, 50);
                    };
                    return {
                        styles: {
                            font: "THSarabunNew",
                            fontStyle: "bold",
                            fontSize: 16,
                        },
                        headStyles: {
                            fillColor: [0, 78, 82],
                        },
                        didDrawPage: header,
                        margin: {
                            top: 65,
                        },
                        theme: "grid",
                    };
                },
            });
        } else if (fileType === "xlsx") {
            if (vm.table) {
                vm.table.download(fileType, vm.headertxt + "." + fileType, {
                    sheetName: "Report",
                    documentProcessing: (workbook) => {
                        var data = vm.table.getData();
                        var ws = XLSX.utils.aoa_to_sheet([
                            // [vm.headertxt + '  ' + vm.subtitletext],
                            // [vm.datetitle]
                        ]);

                        if (data && data.length > 0) {
                            var header = Object.keys(data[0]);

                            // XLSX.utils.sheet_add_json(ws, data, { header: header, origin: "A3" });
                            XLSX.utils.sheet_add_json(ws, data, {
                                header: header,
                                origin: "A1",
                            });
                            ws["!cols"] = header.map((h) => ({
                                wch: 20,
                            }));

                            // var mergeCell = [XLSX.utils.decode_range('A1:G1'), XLSX.utils.decode_range('A2:G2')];
                            // ws['!merges'] = mergeCell;
                        }
                        workbook.Sheets[workbook.SheetNames[0]] = ws;
                        return workbook;
                    },
                });
            }
        } else if (fileType === "csv") {
            var JSONData = vm.table.getData();
            // var ReportTitle = vm.headertxt+ '.' + fileType;
            JSONToCSVConvertor(JSONData, vm.headertxt, true);
        } else {
            vm.table.download(fileType, vm.headertxt + "." + fileType);
        }
    }
    function printFile() {
        vm.table.print();
    }
})






