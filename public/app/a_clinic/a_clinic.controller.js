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
    // $scope.right = false;
    // $scope.left = false;
    // $scope.showcaseOR = false;
    // $scope.recc = false;
    // $scope.show_searchright = false;
    // // $scope.initdata = initdata;
    // $scope.closeall = closeall;
    // $scope.showr1 = showr1;
    // $scope.showr2 = showr2;
    // $scope.estimate = estimate;
    // $scope.DateThai = DateThai;
    // $scope.getAge = getAge;
    // $scope.showbycat = showbycat;
    // // $scope.openwindow = openwindow;
    // $scope.PrintMe = PrintMe;
    // $scope.getORcase = getORcase;
    // $scope.openORpage = openORpage;
    // $scope.calculate = calculate;
    // $scope.tocalculate = tocalculate;
    // //-------------------------------------------
    $scope.show_searchright = false;
    $scope.searchHN = searchHN;
    $scope.save_dr = save_dr;
    $scope.save_user = save_user;
    $scope.find_title = find_title;
    $scope.selectitle = selectitle;
    $scope.new_p1 = new_p1;
    $scope.show_p1 = true;
    $scope.lbl_note = '';
    $scope.show_btnsave = true;
    $scope.save_data = save_data;
    $scope.clearaddress = clearaddress;

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
    // $scope.JSONToCSVConvertor = JSONToCSVConvertor;
    // $scope.Printdetail=Printdetail;
    $scope.getOrguid = getOrguid;
    // $scope.txt_show='';
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
        vm.keytitle = $scope.selecttitle ;
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
        matchList.innerHTML ='';
        saddress.innerHTML ='';
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
                    "title": vm.resulttitle,
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
    function new_p1() {
        $scope.lbl_note = '';
        $scope.show_btnsave = true;
        $scope.show_p1 = true;
    }
    function save_user(name, pwd) {
        console.log(name);
        console.log(pwd);

        $http.post('/local/savedata_user', {
            "mfile": "user",
            "name": name,
            "password": pwd,


        }).success(function (data) {
            console.log(data);
            if (data.data == 1) {
                $scope.lbl_savedata = 'บันทึกรายการเรียบร้อย';

            } else {
                $scope.lbl_savedata = 'มีชื่อนี้แล้ว';
            }
            $scope.show_savedata = true;
            $scope.setup_user = false;

        });
    }
    function save_dr(name, pwd, drid) {
        console.log(name);
        console.log(pwd);
        console.log(drid);
        $http.post('/local/savedata_dr', {
            "mfile": "dr",
            "name": name,
            "password": pwd,
            "drid": drid,

        }).success(function (data) {
            console.log(data);
            if (data.data == 1) {
                $scope.lbl_savedata = 'บันทึกรายการเรียบร้อย';

            } else {
                $scope.lbl_savedata = 'มีชื่อนี้แล้ว';
            }
            $scope.show_savedata = true;
            $scope.setup_dr = false;

        });
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
    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
        console.log(JSONData);
        console.log(ReportTitle);
        console.log(ShowLabel);
        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
        var arrData =
            typeof JSONData != "object" ? JSON.parse(JSONData) : JSONData;

        var CSV = "";
        //Set Report title in first row or line

        CSV += ReportTitle + "\r\n\n";

        //This condition will generate the Label/Header
        if (ShowLabel) {
            var row = "";

            //This loop will extract the label from 1st index of on array
            for (var index in arrData[0]) {
                //Now convert each value to string and comma-seprated
                row += index + ",";
            }

            row = row.slice(0, -1);

            //append Label row with line break
            CSV += row + "\r\n";
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
            CSV += row + "\r\n";
        }

        if (CSV == "") {
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
        var uri = "data:text/xls;charset=utf-8," + escape(CSV);
        // downloadFile('1.csv', 'data:text/csv;charset=UTF-8,' + '\uFEFF' + encodeURIComponent(CSV));
        var uri =
            "data:text/csv;charset=utf-8," + "\uFEFF" + encodeURIComponent(CSV);
        // var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
        // console.log('vm.table', vm.table);
        // console.log('CSV', CSV);
        // console.log('uri', uri);

        //Download the file as CSV
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", CSV]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = ReportTitle; //Name the file here
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        // CSV.download('csv', `${$rootScope.selectedRoute.title}.csv`);
        // window.open(uri);
        // Now the little tricky part.
        // you can use either>> window.open(uri);
        // but this will not work in some browsers
        // or you will not get the correct file extension

        //this trick will generat
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
                // $scope.HN = mhn;
                // vm.mHN = mhn;
            } else {
                $scope.findpt = [];
                $scope.show_searchright = false;
            }
            console.log('findpt',$scope.findpt);
            // vm.HN = '';
        });

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
    //   function mongo2table(mfile) {
    //     console.log(mfile);
    //     vm.headertxt = mfile;
    //     $http
    //       .post("/centrix_migrate/list_dbdetail", {
    //         mfile: mfile,
    //         orguid: $scope.orguid,
    //       })
    //       .success(function (data) {
    //         vm.results = data.data;
    //         vm.renderTable("#table_mongo2table");
    //       });
    //   }
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






