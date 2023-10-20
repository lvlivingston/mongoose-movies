const Movie = require('../models/movie')

module.exports = {
    new: newMovie,
    create,
    index
}

function newMovie(req, res) {
    res.render('movies/new', {errorMsg: ''})
}

async function create (req, res) {
    // convert now showing's checkbox of nothing or "on" to boolean
    req.body.nowShowing = !!req.body.nowShowing;
    // remove any white space at start and end of cast
    req.body.cast = req.body.cast.trim();
    // split cast into an array if not an empty string
    if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    try {
        await Movie.create(req.body);
        // always redirect after CUDing data, we'll refactor to redirect to the movies index after we implement it
        res.redirect('/movies');
    } catch (err) {
        // typically some sort of validation error
        console.logg(err);
        res.render('movies/new', {errorMsg: err.message });
    }
}

async function index(req, res) {
    const movies = await Movie.find({});
    res.render('movies/index', { movies });
}

