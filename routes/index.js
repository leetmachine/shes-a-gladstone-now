var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'She\' a Gladstone!' });
});

/* GET registry page */
router.get('/registry', function(req, res, next) {
  res.render('registry', {imgpath: 'images/italytofrancemap.jpg'});
})

module.exports = router;
