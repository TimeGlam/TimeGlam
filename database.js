import mongoose from 'mongoose';

const URI = '';

mongoose.set('userNewUrlParser', true);
mongoose.set('userFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
  .connect(URI)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));
