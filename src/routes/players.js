const express = require('express');
const players = express.Router();
const knex = require('../dbconfig');


players.get('/:player_identifier', function(req, res, next) {
    console.log(req.params.player_identifier)
    //do validation logic here
    knex('users')
    .select("*")
    .leftJoin('players', 'players.player_id', 'users.user_id')
    .where('users.given_name', 'ilike', `%${req.params.player_identifier}%`)
    .orWhere('users.family_name', 'ilike', `%${req.params.player_identifier}%`)
    .then( result => {
        console.log(result)
        res.status(200).json(result)
    })
})

players.get('/autocomplete/:player_identifier', function(req, res, next) {
    console.log(req.params.player_identifier)
    //do validation logic here
    knex('users')
    .select('user_id as userId',
    'given_name as givenName',
    'family_name as familyName',
    knex.raw(`CONCAT(given_name, ' ', family_name) as "fullName"`))
    .leftJoin('players', 'players.player_id', 'users.user_id')
    .where('users.given_name', 'ilike', `%${req.params.player_identifier}%`)
    .orWhere('users.family_name', 'ilike', `%${req.params.player_identifier}%`)
    .then( result => {
        console.log(result)
        res.status(200).json(result)
    })
})

/**
 * * returns the single json object form of a single user found
 */
players.get('/:player_identifier/profileData', async function(req, res, next) {
    console.log(req.params.player_identifier)

    const response = await knex('users as u')
    .select(
        'u.user_id as userId',
        'u.username as username',
        'u.given_name as givenName',
        'u.family_name as familyName',
        'u.email as email',
        'u.birthday as birthday',
        'p.level as level',
        'p.hand as hand',
        'p.location as location',
        'p.institution as institution'
    )
    //* more aggregate data to come later as i learn hwo to do it
    .leftJoin('players as p', 'p.player_id', 'u.user_id')
    .where('u.user_id', req.params.player_identifier)
    .then( results => {
        console.log(results)
        return results
    })
    .catch( err => {
        console.log(err)
        return err
    })

    if(response.code != undefined) {
        next(response)
        return
    }

    res.status(200).json(response[0])


})

module.exports.players = players;