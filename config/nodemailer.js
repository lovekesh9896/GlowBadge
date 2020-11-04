const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

smtp = {
    service : "gmail",
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth : {
        user : process.env.USER_NAME,
        pass : process.env.PASS, // enter your password // dont' forgot to change above email
    }
}

let transporter = nodeMailer.createTransport(smtp);

let renderTemplate = (data, relativePath)=> {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer', relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering template ",err);
                return;
            }
            mailHTML = template;

        }
    )
    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}