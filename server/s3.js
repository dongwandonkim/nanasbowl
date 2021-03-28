require('dotenv').config();

const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

var s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

//upload
async function uploadImage(key, buffer, mimetype) {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: bucketName,
        ContentType: mimetype,
        Key: key,
        Body: buffer,
      },
      () => resolve()
    );
    console.log('s3 upload success');
  });
}

//get image
function getSignedUrl(key) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: bucketName,
        Key: key,
      },
      function (err, url) {
        if (err) throw new Error(err);
        resolve(url);
      }
    );
  });
}

module.exports = {
  uploadImage,
  getSignedUrl,
};
