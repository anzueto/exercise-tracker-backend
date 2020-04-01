const router = require('express').Router(); // requiring router
let Exercise = require('../models/exercise.model');

// index route
router.route('/').get((req, res) => {
    Exercise.find() // gets a list of all users from database
        .then(exercises => res.json(exercises)) // return all exercises in json format
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});


// create route
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); // converting duration to number datatype
    const date = Date.parse(req.body.date); // converting date to date datatype

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save() // saving to database
        .then(() => res.json('Exercise added!')) // return Excercise added
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});

// find by id route
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id) //finding by id
        .then(exercise => res.json(exercise)) // return id via json
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});

// delete route
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id) //finding by id and delete from database
        .then(() => res.json('exercise deleted')) // return delete confirmation
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});

// update route
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id) //finding by id
        .then(exercise => {
            exercise.username = req.body.username; // assigning to fields already exist
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('exercise updated'))
                .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
        })
        .catch(err => res.status(400).json('Error:' + err)); // if errror send us a notification
});

module.exports = router;