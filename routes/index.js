var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'She\'s a Gladstone!', active_home: true});
});

/*GET info page.*/
router.get('/info', function(req, res, next) {
  res.render('info', {logoPath: 'images/wedding-logo.jpg', mapPath: 'images/map-logo.jpg', active_info: true});
});

/*GET info page.*/
router.get('/us', function(req, res, next) {
  res.render('us', {active_us: true, usPath: '/images/couple.jpg', waterfallPath: '/images/waterfall.JPG', ringPath: '/images/the-ring.JPG'});
});

router.get('/engagement', function(req, res, next) {
  res.render('engagement', {active_engagement: true});
});

/* GET registry page */
router.get('/registry', function(req, res, next) {
  Item.find(function(err, docs) {
    var itemChunks = [];
    var chunkSize = 4;
    for(var i = 0; i < docs.length; i += chunkSize) {
      itemChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('registry', {items: itemChunks, imgpath: 'images/italytofrancemap.jpg', flowerbanner: 'images/flowerbanner.jpg', wineitem: 'images/shop-items/wine-item.jpg', active_registry: true});
  });
});

router.get('/add-to-cart/:id', reduceItemQty, addToCart);


function addToCart(req, res) {
  console.log("addToCart called");
  var itemId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});


  Item.findById(itemId, function(err, item) {
    if(err) {
      return res.redirect('/registry');
    } else {
      cart.add(item, item.id);
      req.session.cart = cart;

      res.redirect('/registry#shop');
    }
  });
};

/**Reduce Item Qty in DB**/
function reduceItemQty(req, res, next){
  var itemId = req.params.id;
  Item.findOne({_id: itemId}, function(err, foundObject) {
    if(err) {
      console.log(err);
    } else {
      if(!foundObject) {
        console.log(err);
      } else {
        foundObject.qty = foundObject.qty - 1;

        foundObject.save();
        next();
      }
    }
  });
};



router.get('/reduce/:id', addItemBack, function(req, res, next){
  var itemId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne( itemId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');

});

/**Add Item back to DB by 1**/
function addItemBack(req, res, next){
  var itemId = req.params.id;
  Item.findOne({_id: itemId}, function(err, foundObject) {
    if(err) {
      console.log(err);
    } else {
      if(!foundObject) {
        console.log(err);
      } else {
        foundObject.qty = foundObject.qty + 1;

        foundObject.save();
        next();
      }
    }
  });
};


router.get('/remove/:id/:qty', addItemBackAll, function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');

});

/**Add item back to DB by All in cart**/
function addItemBackAll(req, res, next){
  var itemId = req.params.id;
  var itemQty = req.params.qty;

  console.log("Item qty is: " + itemQty);

  Item.findOne({_id: itemId}, function(err, foundObject) {
    if(err) {
      console.log(err);
    } else {
      if(!foundObject) {
        console.log(err);
      } else {
        foundObject.qty += parseInt(itemQty);

        foundObject.save();
        next();
      }
    }
  });
};


/*GET cart page*/
router.get('/shopping-cart', function(req, res, next) {
  if(!req.session.cart){
    return res.render('shop/shopping-cart', {items: null});
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/shopping-cart', {items: cart.generateArray(), totalPrice: cart.totalPrice, errMsg: errMsg, noError: !errMsg}) ;
});


router.post('/checkout', function(req, res, next){
  if(!req.session.cart){
    return res.redirect('shop/shopping-cart', {items: null});
  }
  var cart = new Cart(req.session.cart);
  var cartString = JSON.stringify(cart);

  //token.id from front-end checkout.js page
  var token = req.body.token;

  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  var stripe = require("stripe")("sk_live_zySwPZjX4vpNv7jD4Bbq380o");

  // Charge the user's card:
  var charge = stripe.charges.create({
    amount: cart.totalPrice*100,
    currency: "usd",
    description: cartString,
    source: token,
  }, function(err, charge) {
    // asynchronously called
    if(err){
      req.flash('error', err.message);
      return res.redirect('shopping-cart');
    }
      req.flash('success', 'Successful Purchase!');
      req.session.cart = null;

      //change to Thank You page
      res.redirect('/thank-you');

  });
});

router.get('/thank-you', function(req, res, next) {
  res.render('shop/thank-you');
});





module.exports = router;
