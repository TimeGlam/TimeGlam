import express from 'express';
import morgan from 'morgan';
import './database';

const app = express();

app.use(morgan('dev'));

app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log(`server is running in ${app.get('port')} port 🚀`);
});
