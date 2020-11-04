const mongoose = require('mongoose');
//  Do not change this
let defaultFileSystem = [
  {
    "name": "Folder1",
    "isDirectory": true,
    "__KEY__": "91c2d1b3-1072-c3ce-d2a0-32ac9e2ddc29",
    "items": [
      {
        "name": "Folder3",
        "isDirectory": true,
        "__KEY__": "5cda6deb-e460-f658-39cf-387118edbb22",
        "items": [
          {
            "name": "Group 26491.jpg",
            "isDirectory": false,
            "__KEY__": "c5b16774-52a9-388e-afbb-63104e094b29",
            "size": 9950,
            "dateModified": "2020-11-04T17:48:49.685Z",
            "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512241/fdzczqnlvs1wkmsadix2.jpg"
          },
          {
            "name": "Group 26493.jpg",
            "isDirectory": false,
            "__KEY__": "7ddb98d5-3838-176e-ecb9-6c2e79839256",
            "size": 10017,
            "dateModified": "2020-11-04T17:48:49.703Z",
            "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512243/vljhx2cm0nomaoytbfqn.jpg"
          },
          {
            "name": "Group 26495.jpg",
            "isDirectory": false,
            "__KEY__": "cf2db4ce-a190-a4fa-426d-d3258e33fe4a",
            "size": 10085,
            "dateModified": "2020-11-04T17:48:49.720Z",
            "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512244/egzwi2rijmlvfl7uoycn.jpg"
          },
          {
            "name": "Group 26497.jpg",
            "isDirectory": false,
            "__KEY__": "f68785e3-42c5-cecf-1d48-7e424e8d0721",
            "size": 10791,
            "dateModified": "2020-11-04T17:48:49.738Z",
            "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512246/uvgc3lx6mwl82y4h28jf.jpg"
          }
        ]
      },
      {
        "name": "Group 26485.jpg",
        "isDirectory": false,
        "__KEY__": "0c021f6e-c52b-a86a-dce7-b53b73cd9564",
        "size": 9164,
        "dateModified": "2020-11-04T17:48:49.629Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512247/g19yn9fku7hdza1nohdh.jpg"
      },
      {
        "name": "Group 26487.jpg",
        "isDirectory": false,
        "__KEY__": "1d934dd8-7db8-2c5b-1dd7-4876d792519c",
        "size": 12755,
        "dateModified": "2020-11-04T17:48:49.650Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512249/chzalwqfar38ysqx0kw2.jpg"
      },
      {
        "name": "Group 26489.jpg",
        "isDirectory": false,
        "__KEY__": "ca921432-4b4a-a582-8446-a6eb6bc906e6",
        "size": 7862,
        "dateModified": "2020-11-04T17:48:49.667Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512250/ikvpmr94qjqsynhkfs34.jpg"
      }
    ]
  },
  {
    "name": "Folder2",
    "isDirectory": true,
    "__KEY__": "dcc1b29d-9447-c97d-5426-649b152abd83",
    "items": [
      {
        "name": "Folder4",
        "isDirectory": true,
        "__KEY__": "7da96e7a-5678-082b-3801-174fd4037121",
        "items": [
          {
            "name": "Group 26503.jpg",
            "isDirectory": false,
            "__KEY__": "0995dc72-fbae-7950-337b-8f3e4fa03e88",
            "size": 7952,
            "dateModified": "2020-11-04T17:48:49.791Z",
            "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512252/kwcsry8apofwqyinbd5j.jpg"
          },
          {
            "name": "Group 26505.jpg",
            "isDirectory": false,
            "__KEY__": "c14918a2-a700-e77f-9101-4ebcec1535e9",
            "size": 7993,
            "dateModified": "2020-11-04T17:48:49.811Z",
            "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512253/jtjrgrltzktgpuz47a5p.jpg"
          }
        ]
      },
      {
        "name": "Group 26499.jpg",
        "isDirectory": false,
        "__KEY__": "7dad1d2f-457f-4068-9789-2578e92a2b2e",
        "size": 7823,
        "dateModified": "2020-11-04T17:48:49.755Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512254/jze6egtaajdp11kv8ddo.jpg"
      },
      {
        "name": "Group 26501.jpg",
        "isDirectory": false,
        "__KEY__": "f699c856-8d51-d85b-bccb-aa728af4d722",
        "size": 9181,
        "dateModified": "2020-11-04T17:48:49.773Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512255/o05ypxcix9ty5kvi2w87.jpg"
      }
    ]
  },
  {
    "name": "Folder5",
    "isDirectory": true,
    "__KEY__": "f64e4b16-2c8f-49ed-0c7c-5a003ce3b603",
    "items": [
      {
        "name": "Group 26507.jpg",
        "isDirectory": false,
        "__KEY__": "f12beed4-a872-ace8-a4b8-e4168f2d8c6a",
        "size": 9608,
        "dateModified": "2020-11-04T17:48:49.829Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512256/jo7stv8pco4tczdeuskn.jpg"
      },
      {
        "name": "Group 26509.jpg",
        "isDirectory": false,
        "__KEY__": "65e56613-974e-6fd3-de7a-8425d7455c2c",
        "size": 7481,
        "dateModified": "2020-11-04T17:48:49.847Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512258/lge1mewcjomgsvl0rbpn.jpg"
      },
      {
        "name": "Group 26511.jpg",
        "isDirectory": false,
        "__KEY__": "2e45e941-a83e-d924-3749-9ab272539582",
        "size": 9601,
        "dateModified": "2020-11-04T17:48:49.865Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512259/bydu6xgpgzhxu2fwq9vn.jpg"
      },
      {
        "name": "Group 26513.jpg",
        "isDirectory": false,
        "__KEY__": "3e83c221-0db5-2273-b38e-e9b3cb7aee82",
        "size": 6625,
        "dateModified": "2020-11-04T17:48:49.883Z",
        "url": "http://res.cloudinary.com/lovekesh9896/image/upload/v1604512260/ce7e6dwl0pwxfxd0sp7j.jpg"
      }
    ]
  }
]

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fileSystem : {
        type : Object,
        default : defaultFileSystem
    },
    clientId : {
        type : String,
        required : true
    },
    clientSecret : {
        type : String,
        required : true
    },
    badgeId : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Badge'
        }
    ],
    timeline : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Timeline'
        }
    ],
    students : [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ],
    badgeStatics : [
        Number
    ]
}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;