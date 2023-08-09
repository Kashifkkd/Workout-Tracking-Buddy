const express = require('express');
const Workout = require('../models/workoutModel');
const { createWorkout, getWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// Authentication
router.use(requireAuth)

router.get('/', getWorkouts)
router.get('/:id', getSingleWorkout)
router.post('/', createWorkout)
router.delete('/:id', deleteWorkout)
router.patch('/:id', updateWorkout)

module.exports = router