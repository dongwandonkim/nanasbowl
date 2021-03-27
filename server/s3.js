require('dotenv').config();

const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

var s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload
function uploadImage(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}

//get image
function getImage(key) {
  const uploadParams = {
    Bucket: bucketName,
    Key: key,
  };
  return s3.getObject(uploadParams).createReadStream();
}
exports.uploadImage = uploadImage;
