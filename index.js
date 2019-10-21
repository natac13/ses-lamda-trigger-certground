'use strict';

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log('Received event:', JSON.stringify(event, null, 2));
  const message = JSON.parse(event.Records[0].Sns.Message);

  switch (message.notificationType) {
    case 'Bounce':
      handleBounce(message, callback);
      break;
    case 'Complaint':
      handleComplaint(message);
      break;
    default:
      callback('Unknown notification type: ' + message.notificationType);
  }
  console.log('end');
  return;
};

function handleBounce(message, callback) {
  const messageId = message.mail.messageId;
  const addresses = message.bounce.bouncedRecipients.map(function(recipient) {
    return recipient.emailAddress;
  });
  const bounceType = message.bounce.bounceType;

  console.log(
    'Message ' +
      messageId +
      ' bounced when sending to ' +
      addresses.join(', ') +
      '. Bounce type: ' +
      bounceType
  );

  // fire off the messageId to CertSpire to blacklist the member in the fromEmail field on the email doc matching the messageId
  for (var i = 0; i < addresses.length; i++) {
    // do something with each address that bounced the email
  }

  return 'Success';
}

function handleComplaint(message) {
  const messageId = message.mail.messageId;
  const addresses = message.complaint.complainedRecipients.map(function(
    recipient
  ) {
    return recipient.emailAddress;
  });

  console.log(
    'A complaint was reported by ' +
      addresses.join(', ') +
      ' for message ' +
      messageId +
      '.'
  );

  // fire off the messageId to CertSpire to blacklist the member in the fromEmail field on the email doc matching the messageId
  for (var i = 0; i < addresses.length; i++) {
    // do something with each address that bounced the email
  }
}
