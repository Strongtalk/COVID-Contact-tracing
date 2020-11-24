function sendSMS (to, message) {
    var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    return client.api.messages
      .create({
        body: message,
        to: to,
        from: process.env.TWILIO_NUMBER,
      }).then(function(data) {
        console.log('Message Sent');
      }).catch(function(err) {
        console.error('Could not notify administrator');
        console.error(err);
      });
  };

module.exports = sendSMS