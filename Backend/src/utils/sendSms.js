// utils/sendSms.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN ;
const client = new twilio(accountSid, authToken);

const sendSms = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: "+12543473179",
      to
    });
    return message;
  } catch (error) {
    throw new Error(`Failed to send SMS: ${error.message}`);
  }
};

module.exports = sendSms;
