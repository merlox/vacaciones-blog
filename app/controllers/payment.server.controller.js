var paypal = require('paypal-rest-sdk'),
  config = require('../../config/config.js');
paypal.configure({
  'mode': config.paypal.mode,
  'client_id': config.paypal.client_id,
  'client_secret': config.paypal.client_secret
});

exports.paymentPaypal = function(req, res){
  var paymentDetails = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:8080/payment/paypal/callback",
      "cancel_url": "http://localhost:8080/payment/cancel"
    },
    "transactions": [{
      "amount": {
        "total": "10.00",
        "currency": "USD"
      },
      "description": "Example of a payment"
    }]
  };
  paypal.payment.create(paymentDetails, function(err, payment){
    if(err) return console.log(err);
    if(payment.payer.payment_method === 'paypal'){
      var redirectUrl;
      req.session.paymentId = payment.id;
      for (var i = 0; i < payment.links.length; i++) {
        var link = payment.links[i];
        if(link.method === 'REDIRECT'){
          redirectUrl = link.href;
        }
      }
      return res.send(redirectUrl);
    }
  });
};

exports.paypalCallback = function(req, res){
  var paymentId = req.session.paymentId;
  var details = {'payer_id': req.query.PayerID};

  paypal.payment.execute(paymentId, details, function(err, payment){
    req.session.paypalName = payment.payer.payer_info.first_name;
    req.session.paypalAddress = payment.payer.payer_info.shipping_address;
    req.session.paypalEmail = payment.payer.payer_info.email;
    if(err){
      console.log(err);
      throw err;
    }else{
      return res.redirect('/paymentDone');
    }
  });
};
exports.cancel = function(req, res){
  return res.send('The payment got cancelled');
}
exports.getPayedSession = function(req, res){
  res.json({'name': req.session.paypalName, 'address': req.session.paypalAddress, 'email': req.session.paypalEmail});
  req.session.paypalName = '';
  req.session.paypalAddress = '';
  req.session.paypalEmail = '';
}
