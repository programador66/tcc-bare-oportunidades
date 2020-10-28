
import * as nodemailer from "nodemailer";

const confgMail = require('../config/mail.json')

const transport = nodemailer.createTransport({
  host: confgMail.host,
  port: confgMail.port,
  secure: false,
  auth: {
      user: confgMail.user,
      pass: confgMail.pass
  },
  
  });

export default transport;