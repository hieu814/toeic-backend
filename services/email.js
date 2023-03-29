/** 
 * emailService.js
 * @description :: exports function used in sending mails using mailgun provider
 */

const nodemailer = require('nodemailer');
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD
  }
});

const sendMail = async (obj) => {

  if (!Array.isArray(obj.to)) {
    obj.to = [obj.to];
  }

  let htmlText = '';

  if (obj.template && !obj.template.includes("handlebars")) {
    htmlText = await ejs.renderFile(`${__basedir}${obj.template}/html.ejs`, obj.data || null);
  } else {
    const source = fs.readFileSync(path.join(__basedir, obj.template), "utf8");
    const compiledTemplate = handlebars.compile(source);
    var payload = {
      link: `${process.env.CLIENT_URL}reset-password/${obj.data.resetPasswordLink.code}/${obj.data.email}`,
      name: obj.data.username

    }
    htmlText = compiledTemplate(payload)
  }




  let mailOpts = {
    from: obj.from || 'noreply@yoyo.co',
    subject: obj.subject || 'Sample Subject',
    to: obj.to,
    cc: obj.cc || [],
    bcc: obj.bcc || [],
    html: htmlText,
    attachments: obj.attachments || []
  };
  return transporter.sendMail(mailOpts);
};

module.exports = { sendMail };
