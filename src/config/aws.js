/* import AWS from 'aws-sdk';

const config = {
  IAM_USER_KEY: process.env.AWS_ACCESS_KEY_ID,
  IAM_USER_SECRET: process.env.AWS_SECRET_ACCESS_KEY,
  BUCKET_NAME: 'timeglam-dev',
  AWS_REGION: 'sa-east-1',
  uploadToS3(file, filename, acl = 'public-read') {
    return new Promise((resolve, reject) => {
      const s3bucket = new AWS.S3({
        accessKeyId: this.IAM_USER_KEY,
        secretAccessKey: this.IAM_USER_SECRET,
        Bucket: this.BUCKET_NAME,
      });

      s3bucket.headBucket((err) => {
        if (err) {
          console.log("Bucket doesn't exist or you don't have permission to access it.");
          return reject(new Error("Bucket doesn't exist or y
          ou don't have permission to access it."));
        }

        const params = {
          Bucket: this.BUCKET_NAME,
          Key: filename,
          Body: file.data,
          ACL: acl,
        };

        s3bucket.upload(params, (err, data) => {
          if (err) {
            console.log(err);
            return reject(new Error(err.message));
          }
          console.log(data);
          return resolve({ error: false, message: data });
        });
      });
    });
  },
  deleteFileS3(key) {
    return new Promise((resolve, reject) => {
      const s3bucket = new AWS.S3({
        accessKeyId: this.IAM_USER_KEY,
        secretAccessKey: this.IAM_USER_SECRET,
        Bucket: this.BUCKET_NAME,
      });

      s3bucket.deleteObject(
        {
          Bucket: this.BUCKET_NAME,
          Key: key,
        },
        (err, data) => {
          if (err) {
            console.log(err);
            return reject(new Error(err.message));
          }
          console.log(data);
          return resolve({ error: false, message: data });
        },
      );
    });
  },
};
export default config;
*/
