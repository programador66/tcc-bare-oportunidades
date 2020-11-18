
import * as nodemailer from "nodemailer";

const confgMail = require('../config/mail.json')

const transport = nodemailer.createTransport({
  // requireTLS: true,
  host: 'smtp-mail.outlook.com',
  port: 587,
  tls: {
    ciphers:'SSLv3'
  },
  auth: {
      user: confgMail.user,
      pass: confgMail.pass
  },
  
  });

export default transport;