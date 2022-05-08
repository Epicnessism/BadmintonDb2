const express = require('express');
const searchResults = express.Router();
const knex = require('../dbconfig');

//grab players by substring or all
// router.get('/autoComplete/:substring', authHelpers.loginRequired, function(req, res, next) {
searchResults.get('/:substring', function(req, res, next) {
    console.log(req.params.substring);
} )


module.exports.searchResults = searchResults;