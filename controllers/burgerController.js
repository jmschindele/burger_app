var express = require('express');

var router = express.Router();

//import the model
var burger = require('../models/burgerModel');

//create routes

router.get('/', function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        }
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/api/burger', function(req, res) {
burger.create([
    "name", "isDevoured"
], [req.body.name, req.body.isDevoured], function(result) {
    res.json({ id: result.insertId });
});
});

router.put('/api/burgers/:id', function(req, res){
    var condition = 'id = ' + req.params.id;

    console.log('condition', condition);

    burger.update({
        isDevoured: req.body.isDevoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            //if no rows were changed, the id must not exist
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('api/burgers/:id', function(req, res) {
    var condition = 'id = ' +req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            //if no rows changed, the id must not exist
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//export routes
module.exports = router;