import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.error(err));
