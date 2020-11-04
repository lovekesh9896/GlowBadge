const Badge = require('../../models/badges');
const Timeline = require('../../models/timeline');
const User = require('../../models/user');

let updateTimelineWithUrl = async function(timeline){
    let stringToSearch = 'class="tf-nc">';
    let indexOfFoundString = timeline.indexOf(stringToSearch);
    while(indexOfFoundString != -1){
        let nameOfBadge = timeline.slice(indexOfFoundString+14, timeline.indexOf('<',indexOfFoundString));
        let badge = await Badge.findOne({name : nameOfBadge});
        let replaceText;
        if(badge != null){
            let badgeUrl = badge.url;
            replaceText = `<img src="${badgeUrl}" alt="${nameOfBadge}">`;
            timeline = timeline.replace(nameOfBadge, replaceText);
            indexOfFoundString = timeline.indexOf(stringToSearch, indexOfFoundString+14+replaceText.length);
            
        }else{
            indexOfFoundString = timeline.indexOf(stringToSearch, indexOfFoundString+14);
        }
        
    }
    return timeline;
}

module.exports.addTimeline = async function(req,res){
    
    try {
        if(req.isAuthenticated()){

            let userTimeline = await updateTimelineWithUrl(req.body.timeline);
            let timelineInDb = await Timeline.findOne({name : req.body.timelineName});
            if(timelineInDb){
                timelineInDb.content = userTimeline;
                await timelineInDb.save();
                return res.status(200).json({
                    success : true,
                    message : 'Time line updated'
                })
            }else{
                let newTimeline = await Timeline.create({
                    name : req.body.timelineName,
                    content : userTimeline
                });
                
                let user = await User.findById(req.user._id);
                await user.timeline.push(newTimeline);
                await user.save();
                if(newTimeline){
                    return res.status(200).json({
                        success : true,
                        message : 'Timeline created succesfully'
                    })
                }else{
                    return res.status(400).json({
                        success : false,
                        message : 'Internal server error'
                    })
                }
            }
        }
    } catch (err) {
        return res.status(400).json({
            success : false,
            error : err,
            message : 'Internal server error'
        })
    }
    
}
