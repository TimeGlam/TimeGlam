import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { extname } from 'path';

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'sa-east-1',
});

const multerConfig = {
  storage: multerS3({
    s3,
    bucket: 'timeglam-dev',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `${Date.now()}${extname(file.originalname)}`);
    },
  }),
};

export default multer(multerConfig);
