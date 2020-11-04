const nodeMailer = require("../config/nodemailer");
// const nodemailer = require('../config/nodemailer');

// this is another way of exporting method
exports.newBadge = async (email, badge, info) => {
    console.log("inside new badge mailer");
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
        console.log(a);
    } catch (err) {
        console.log(err);
    }
};
