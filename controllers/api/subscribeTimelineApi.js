const { request } = require('express');
const Student = require('../../models/student');
const Timeline = require('../../models//timeline');

module.exports.subscribe = async function(req,res){ 
    try {
        let student = await Student.findById(req.body.studentId);
        if(!student){
            return res.status(200).json({
                message : 'student not found',
                success : false
            });
        }else{
            let timeline = await Timeline.findById(req.body.timelineId);
            if(!timeline){
                return res.status(200).json({
                    message : 'timeline not found',
                    success : false
                });
            }else{
                timeline.timesUsed = timeline.timesUsed + 1;
                await timeline.save();
                await student.subscribed.addToSet(timeline);
                await student.save();
                return res.status(200).json({
                    message : 'all done',
                    success : true
                })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(200).json({
            message : 'Internal server error',
            success : false
        });
    }
    
}