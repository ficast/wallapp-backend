"use strict";
const config = require("../config");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(config.sendgridKey);

exports.send = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: "filipe@queplanta.com",
      subject,
      text: "Wellcome to The Wall",
      html,
    });

    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};
