//Import MySQL connection
var connection = require('../config/connection.js');

//Function to print question marks for SQL syntax based on size of an array

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

//function to conver object key/value pairs to SQL syntax

function objToSql(obj) {
    var arr = [];

    //loop through keys and push the key/value par as a string into arr
    
    for (var key in obj) {
        var value = obj[key];
        //check to skip hidden properties
        if (Object.hasOwnPropert.call(obj, key)) {
            // if strin with spaces, add quotations
            if (typeof value === 'string' && value.indexOf(" ") >= 0) {
                value = " ' " + value + " ' "
            }

            arr.push(key + '=' + value);
        }
    }
  //translate array of strings to a signle comma-separated string
  return arr.toString();
}

// Object for all SQL statement functions

var orm = {
    all: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';
        //print the string to check syntax
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    update: function(table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        //print the string to check syntax
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err){
                throw err;
            }

            cb(result);
        });
    }
};

// Export the orm
module.exports = orm;