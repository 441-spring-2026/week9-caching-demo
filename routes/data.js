var express = require('express');
var router = express.Router();
const carData = require('../data/cars.json')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

// Add a 5 second delay to simulate a slow data fetch
async function getDataSlowly(){
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
  await new Promise(r=> setTimeout(r, 5000))
  return carData
}

router.get('/', async function(req, res, next) {
  // TODO: uncomment this once server-side caching is good
  // res.set('Cache-Control', 'public, max-age=30000')

  let cars = myCache.get("cars")
  if(!cars){
    cars = await getDataSlowly();
    // TODO: make TTL 24 hours
    myCache.set("cars", cars, 30000)
  }



  res.json({data: cars });
});

module.exports = router;
