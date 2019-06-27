const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

if (process.env.DEV_MODE) {
    aws.config.update({
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey,
        region: 'eu-central-1'
    })
}

const s3 = new aws.S3({});

exports.fileStorage = multerS3({
    s3: s3,
    bucket: 's3-grocery',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
});

exports.fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false);
    }
}