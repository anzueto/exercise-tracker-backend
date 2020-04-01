const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find() // gets a list of all users from database
        .then(users => res.json(users)) // return all user in json format
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const newUser = new User({ username });

    newUser.save() // saving to database
        .then(() => res.json('User added!')) // return user added
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});

module.exports = router;