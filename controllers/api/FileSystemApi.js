const User = require('../../models/user');
const Badge = require('../../models/badges');

const cloudinary = require('cloudinary').v2;

cloudinary.config({ // Shoudl be kept in process.env
    cloud_name : 'lovekesh9896',
    api_key : '227636549261121',
    api_secret : 'jG5cJhufoxCQNGd7-Uc8aShrGos'
});
// This funciton takes the fileSystem (JavaScript Object not JSON)
// Find all the bagdes and then upload them cloudinary 
// and update the content with badge url from cloudinary
// earlier badge is in Base 64 URI
let findbase64AndUpload = async function(fileSystem ,user){
    for(let i=0;i<fileSystem.length;i++){
        let a = fileSystem[i];
        if(a.hasOwnProperty('isDirectory') && a.isDirectory){
            for(let j=0;fileSystem[i].items && j<fileSystem[i].items.length;j++){
                let b = await findbase64AndUpload(fileSystem[i].items, user);
                if(b!=null){
                    if(b.hasOwnProperty('content')){
                        let base64Uri = b.content;
                        delete b['content'];
                        let upload = await cloudinary.uploader.upload(`data:image/png;base64,${base64Uri}`);
                        let badge = await Badge.create({
                            name : b.name,
                            url : upload.url,
                            user : user._id,
                            clientId : user.clientId
                        });
                        b.url = upload.url;
                        await user.badgeId.push(badge);
                        await user.save();
                    }
                }
                
            }
            
        }else if(a.hasOwnProperty('isDirectory') && !a.isDirectory){
            if(a.hasOwnProperty('content')){
                let base64Uri = a.content;
                delete a['content'];
                let upload = await cloudinary.uploader.upload(`data:image/png;base64,${base64Uri}`);
                let badge = await Badge.create({
                    name : a.name,
                    url : upload.url,
                    user : user._id,
                    clientId : user.clientId
                });
                a.url = upload.url;
                await user.badgeId.push(badge);
                await user.save();
            }
        }
    }
    return fileSystem;
}

module.exports.updateFileSystem = async function(req,res){
    try {
        let user = await User.findById(req.user._id);
        let fileSystem = JSON.parse(req.body.data);
        fileSystem = await findbase64AndUpload(fileSystem, user);
        console.log(fileSystem);
        user.fileSystem = fileSystem;
        await user.save();
        console.log(user);
        if(req.xhr){
            return res.status(200).json({
                message : "success"
            })
        }
    } catch (err) {
        console.log("Controllers > api > fileSystemapi", err);
        if(req.xhr){
            return res.status(200).json({
                message : "error"
            })
        }
    }
    
}

module.exports.sendFileSystem = async function(req,res){
    try {
        let user = await User.findById(req.user._id);
        let fileSystem = user.fileSystem;
        if(req.xhr){
            return res.status(200).json({
                data : fileSystem,
                message : "success"
            })
        }
    } catch (err) {
        console.log(err);
        if(req.xhr){
            return res.status(200).json({
                message : "error"
            })
        }
    }
}