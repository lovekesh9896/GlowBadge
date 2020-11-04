const nodeMailer = require("../config/nodemailer");
// const nodemailer = require('../config/nodemailer');

// this is another way of exporting method
exports.newBadge = async (email, badge, info) => {
    try {
        let htmlString = nodeMailer.renderTemplate(
            { badge: badge, info: info },
            "./direct_share.ejs"
        );
        let a = await nodeMailer.transporter.sendMail({
            from: "kumarehlan@gmail.com",
            to: email,
            subject: "New badge earned",
            html: htmlString,
        });
        console.log("Email sent successfully");
    } catch (err) {
        console.log("mailers > badeg_mailers.js", err);
    }
};
