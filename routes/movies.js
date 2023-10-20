const express = require('express');
const router = express.Router();

// create constroller module
const moviesCtrl = require('../controllers/movies')

// ALL ROUTES DEFAULT TO /movies

// GET route for /movies/new
router.get('/new', moviesCtrl.new);
// POST route to /movies
router.post('/', moviesCtrl.create);
// GET route for /movies
router.get('/', moviesCtrl.index);


module.exports = router;
