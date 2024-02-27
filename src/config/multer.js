import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

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
      const { estabelecimentoId } = req.body;
      const nameParts = file.originalname.split('.');
      const uniqueIdentifier = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const fileName = `${uniqueIdentifier}.${nameParts[nameParts.length - 1]}`;
      const path = `servico/${estabelecimentoId}/${fileName}`;
      cb(null, path);
    },
  }),
};

export { multerConfig, s3 };
