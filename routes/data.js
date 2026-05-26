var express = require('express');
var router = express.Router();
const carData = require('../data/cars.json')

// Add a 5 second delay to simulate a slow data fetch
async function getDataSlowly(){
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
  await new Promise(r=> setTimeout(r, 5000))
  return carData
}

router.get('/', async function(req, res, next) {
  const cars = await getDataSlowly();
  res.set('Cache-Control', 'public, max-age=30000')
  res.json({data: cars });
});

module.exports = router;
