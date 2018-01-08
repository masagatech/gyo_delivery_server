var GooglePlaces = require('google-places');

var places = new GooglePlaces('AIzaSyA82-J9f4u3b0uYLEHHQ_MwoQXUCGGGqys');

var db = require("db");
var rs = require("gen").res;
var globals = require("gen").globals;

var fs = require('fs');

var addrsearch = module.exports = {};

addrsearch.searchAddress = function(req, res, done) {
    var inp = req.query.key;

    places.autocomplete({ input: inp, components: "country:in" }, function(err, response) {
        // console.log("autocomplete: ", response.predictions);

        var success = function(err, response) {
            // console.log("did you mean: ", response.result.name);
        };

        var data = [];

        for (var index in response.predictions) {
            places.details({ reference: response.predictions[index].reference }, success);
            var d = response.predictions[index];
            data.push({
                "description": d.description,
                "terms": d.terms,
                "placeid": d.place_id
            })
        }

        rs.resp(res, 200, data);
    });
}