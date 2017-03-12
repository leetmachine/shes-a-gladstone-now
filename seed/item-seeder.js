var mongoose = require('mongoose');
var Item = require('../models/item');

mongoose.Promise = require('bluebird');

//mongoose.connect('localhost:27017/wedding-website');
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://leetmachine:Mxolch846!@ds121980.mlab.com:21980/wedding-website';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log('db connection successful');
});

var items = [

  new Item({
  imagePath: '../images/shop-items/kiss-item.jpg',
  title: 'Kiss',
  price: 1,
  qty: 200,
  description: 'Honeymoon Kiss - FREE!'
  }),

  new Item({
  imagePath: '../images/shop-items/wine-item.jpg',
  title: 'Vino',
  price: 75,
  qty: 100,
  description: 'Our first bottle of vino'
}),

new Item({
imagePath: '../images/shop-items/capri-item.jpg',
title: 'Capri',
price: 100,
qty: 100,
description: 'Ferry ride to Capri for 2'
}),

new Item({
imagePath: '../images/shop-items/train-item.jpg',
title: 'Train',
price: 25,
qty: 100,
description: 'single day of our train ticket'
}),

new Item({
imagePath: '../images/shop-items/dinner-item.jpg',
title: 'Dinner',
price: 125,
qty: 100,
description: 'pick up our tab'
}),

new Item({
imagePath: '../images/shop-items/dinner-item.jpg',
title: 'Nice Dinner',
price: 150,
qty: 100,
description: 'pick up our tab'
}),

new Item({
imagePath: '../images/shop-items/dinner-item.jpg',
title: 'Fancy Dinner',
price: 200,
qty: 100,
description: 'pick up our tab'
}),

new Item({
imagePath: '../images/shop-items/colosseum-item.jpg',
title: 'Colosseum',
price: 60,
qty: 100,
description: 'Tour of the colosseum'
}),

new Item({
imagePath: '../images/shop-items/grotto-item.jpg',
title: 'Blue Grotto',
price: 50,
qty: 100,
description: 'Boat to the Blue Grotto'
}),

new Item({
imagePath: '../images/shop-items/crepes-item.jpg',
title: 'Crepes',
price: 30,
qty: 100,
description: 'Crepes in the morning!'
}),

new Item({
imagePath: '../images/shop-items/vespa-item.jpg',
title: 'Vespa',
price: 45,
qty: 100,
description: 'Vroom Vroom'
}),

new Item({
imagePath: '../images/shop-items/airbnb-item.jpg',
title: 'AirBnb',
price: 150,
qty: 100,
description: 'One night of our airBnb'
}),

new Item({
imagePath: '../images/shop-items/kayak-item.jpg',
title: 'Kayak',
price: 65,
qty: 100,
description: 'Kayak Verdon Gorge'
}),

new Item({
imagePath: '../images/shop-items/pizza-item.jpg',
title: 'Pizza',
price: 20,
qty: 100,
description: 'Pizza in Naples'
}),

new Item({
imagePath: '../images/shop-items/coffee-item.jpg',
title: 'Coffee',
price: 5,
qty: 100,
description: 'Keegan needs Coffee'
}),

new Item({
  imagePath:'../images/shop-items/shopping-item.jpg',
  title: 'Shopping Spree',
  price: 100,
  qty: 100,
  description: 'Shopping Spree for Ang'
}),

new Item({
imagePath: '../images/shop-items/tour-item.jpg',
title: 'Eiffel Tour',
price: 20,
qty: 100,
description: 'Ascend the Eiffel Tower'
}),

new Item({
imagePath: '../images/shop-items/champagne-item.jpg',
title: 'Champagne',
price: 75,
qty: 100,
description: 'Champagne under the stars'
}),

new Item({
imagePath: '../images/shop-items/snail-item.jpg',
title: 'Snails',
price: 30,
qty: 100,
description: 'Escargot in Marseille'
}),

new Item({
imagePath: '../images/shop-items/bike-item.jpg',
title: 'Bike',
price: 20,
qty: 100,
description: 'Bike rental in Paris'
}),

new Item({
imagePath: '../images/shop-items/plane-item.jpg',
title: 'Plane to Nice',
price: 150,
qty: 100,
description: 'Single Hopper flight to Nice'
}),

new Item({
imagePath: '../images/shop-items/shirt-item.jpg',
title: 'Classic T-Shirts',
price: 15,
qty: 100,
description: 'Classic T-shirts!'
}),

new Item({
imagePath: '../images/shop-items/spa-item.jpg',
title: 'Spa',
price: 200,
qty: 100,
description: 'We need a spa day'
}),

new Item({
imagePath: '../images/shop-items/taxi-item.jpg',
title: 'Ground Travel',
price: 500,
qty: 100,
description: 'Cover our uber fares!'
}),

new Item({
imagePath: '../images/shop-items/airplane-item.jpg',
title: 'Air Travel',
price: 1000,
qty: 100,
description: 'Pay for our Flights!'
})
];

var qtyA = 0;
var dollars = 0;

for(var i = 0; i < items.length; i++) {
  qtyA += items[i].qty;
  dollars += items[i].price*items[i].qty;
}

console.log("total qty: " + qtyA);
console.log("total dollars: " + dollars);

var done = 0;
for (var i = 0; i < items.length; i++){
  items[i].save(function(err, result) {
      done++;
      if (done === items.length){
          exit();
      }
  });
}

function exit(){
 mongoose.disconnect();
}
