const express = require('express');
const auth = express.Router();

auth.post('/login', (req, res, next) => {
    console.log("got into /login");
    res.status(200).json({message: "success"})
    // passport.authenticate('local',  (err, user, info) => {
    //     console.log('user: '+ user);
    //     console.log('info: '+ info);
    //     if (err) {
    //         console.log('error: '+ err);
    //         handleResponse(res, 500, 'error');
    //     }
    //     if (!user) {
    //         handleResponse(res, 404, 'User not found.');
    //     }
    //     if (user) {
    //         req.logIn(user, function(err) {
    //             if(err) {
    //                 handleResponse(res, 500, 'some kind of error');
    //             }
    //             handleResponse(res, 200, 'logged in?');
    //         });
    //     }
    // })(req, res, next);
});


module.exports.auth = auth;