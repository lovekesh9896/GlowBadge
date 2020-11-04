const Jimp = require('jimp');
const path = require('path');
const cloudinary = require('cloudinary');
const { update } = require('../../models/user');

let name = "Lovekesh";
let clientLogo = 'https://res.cloudinary.com/lovekesh9896/image/upload/v1604510459/oyfdl4e45fxujwfwo7of.jpg' ;
let clientName = "Coding Ninjas";

cloudinary.config({
    cloud_name : 'lovekesh9896',
    api_key : '227636549261121',
    api_secret : 'jG5cJhufoxCQNGd7-Uc8aShrGos'
});

//  This function takes the cirtificate the timeline template
// badge url and badgeQR and puts them on top of each other
let createCirtificate = async function(badgeURL, badgeQr){
    try {
        let bottom = await Jimp.read('https://res.cloudinary.com/lovekesh9896/image/upload/v1604509331/lgmw5gwhetgj0thwvcpm.jpg');
        let top1 = await Jimp.read(clientLogo);
        let badge = await Jimp.read(badgeURL);
        let qr = await Jimp.read(badgeQr);
        let font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
        await bottom.print(font,900, 600, name);
        await bottom.print(font, 800, 250, "Coding Ninjas");
        await top1.resize(300,300);
        await badge.resize(350,350);
        await qr.resize(300,300);
        await bottom.composite(top1, 500,1100)
                .composite(badge, 1000, 1100)
                .composite(qr, 1600, 1100)
                .writeAsync('./final.png');

        let upload = await cloudinary.uploader.upload('./final.png');
        return upload;
    } catch (err) {
        console.log("controllers > api > Cirtificate.js", err);
        return {error : "error"}
    }
}

module.exports.cirtificate = async function(req, res){
    try {
        let badgeUrl = req.body.badgeUrl;
        let badgeQr = req.body.badgeQr;
        let upload = await createCirtificate(badgeUrl, badgeQr);
        return res.status(200).json({
            success : true,
            data : upload
        })
    } catch (err) {
        console.log("controllers > api > Cirtificate.js", err);
        return res.status(200).json({
            success : false,
            message : "Interval server error"
        })
    }
    
}
