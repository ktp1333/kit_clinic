module.exports = function (app) {
    // var local_host = require('./local_host.route.js');
    // app.post('/local_host/findconsent', local_host.findconsent);
    // app.post('/local_host/saveconsent', local_host.saveconsent);
    app.get('/org-config', function (req, res) {
        if (!process.env.ORG) {
            return res.status(500).json({ error: 'no organistion config' })
        }

        return res.status(200).json({ org: process.env.ORG })
    })

    var security = require('./utils/security');
    app.get('/security/login/:username/:shake128/:md5?', security.login);

    var API = require('./API.route.js');
    app.post('/API/find_site', API.find_site);
    app.post('/API/gettitle', API.gettitle);
    app.post('/API/getzipcode', API.getzipcode);
    var local = require('./local.route.js');
    app.post('/local/savedata2local', local.savedata2local);
    app.post('/local/savedata_user', local.savedata_user);
    app.post('/local/savedata_dr', local.savedata_dr);
    app.post('/local/finddata', local.finddata);
    app.post('/local/findlastHN', local.findlastHN);
    app.post('/local/search_existHN', local.search_existHN);
    // app.post('/local/finddata', local.finddata);
    // app.post('/local/findlastHN', local.findlastHN);
    var local_json = require('./local_json.route.js');
    app.post('/local_json/readjson', local_json.readjson);
    app.post('/local_json/writejson', local_json.writejson);
    app.post('/local_json/deletejson', local_json.deletejson);
    app.post('/local_json/editjson', local_json.editjson);
    app.post('/local_json/deletetemplatejson', local_json.deletetemplatejson);
   
}
