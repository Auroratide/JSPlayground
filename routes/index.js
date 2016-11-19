var express = require('express');
var router = express.Router();
const exercises = [
    'multiplier',
    'emailValidator',
    'promises'
    ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Timothy's JS Fun Dive!!!", exercises });
});

router.get('/multiplier', function(req, res) {
  res.render('multiplier', { title: 'Multiplier', exercises });
});

router.get('/emailValidator', function(req, res) {
  res.render('emailValidator', { title: 'Email Validator', exercises });
});

router.get('/promises', function(req, res) {
    res.render('promises', { title: 'Promises', exercises });
});

router.get('/')
module.exports = router;
