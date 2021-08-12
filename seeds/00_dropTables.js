'use strict'

exports.seed = function (knex, Promise) {
    //deletes all existing entries
    // return knex('game_notifications').del()
    //     .then(() => knex('games').del())
    //     .then(() => knex('tournaments').del())
        // .then(() => knex('players').del())
        
        //delete first table last
        return knex('sets').del()
            .then(() => knex('games').del())
            .then(() => knex('players').del())
            .then(() => knex('users').del())
}