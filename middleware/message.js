var twilioClient = require('../server');
// var fs = require('fs');
var admins = require('../config/userNumbers.json');

function formatMessage(messageToReport) {
  return 'Alert someone you\'ve come in contact with has COVID-19';
};

exports.notifyOnError = function(appMessage, request, response, next) {
  admins.forEach(function(admin) {
    var messageToSend = formatMessage(appMessage.message);
    twilioClient.sendSms(admin.phoneNumber, messageToSend);
  });
  next(appMessage);
};
