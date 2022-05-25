'use strict'

exports.seed = function (knex, Promise) {
    //deletes all existing entries
    // return knex('game_notifications').del()
    //     .then(() => knex('games').del())
    //     .then(() => knex('tournaments').del())
        // .then(() => knex('players').del())
        
        //delete first table last
        return knex('tournaments_to_players').del()
            // .then(() => knex('tournament_admins').del())
            // .then(() => knex('tournaments_to_players').del())
            .then(() => knex('games').del())
            .then(() => knex('sets').del())
            .then(() => knex('brackets').del())
            .then(() => knex('events').del())
            .then(() => knex('tournaments').del())
            .then(() => knex('teams_to_players').del())
            .then(() => knex('players').del())
            .then(() => knex('users').del())
}