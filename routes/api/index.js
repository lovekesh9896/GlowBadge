const express = require('express');
const router = express.Router();

const timeline = require('../../controllers/api/addTimelineApi');
const share = require('../../controllers/api/directShareApi');
const sendbadge = require('../../controllers/api/sendBadgeApi');
const fileSystem = require('../../controllers/api/FileSystemApi');
const subscribe = require('../../controllers/api/subscribeTimelineApi');
const statics = require('../../controllers/api/staticsApi');
const cirtificate = require('../../controllers/api/Cirtificate');

router.get('/get-file-system',fileSystem.sendFileSystem);
router.post('/update-file-system',fileSystem.updateFileSystem);
router.post('/request-badge',sendbadge.sendBadge);
router.post('/direct-share', share.directShare);
router.post('/submit-timeline',timeline.addTimeline);
router.post('/subscribe-timeline', subscribe.subscribe);
//  statics
router.get('/badge-statics', statics.badgeStatics);
router.get('/timeline-statics', statics.timelineSubs);
//  ciritficate
router.post('/get-cirtificate', cirtificate.cirtificate);

module.exports = router;
