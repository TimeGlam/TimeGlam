import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.set('port', 3000);

app.listen(app.get('port'), () => {
  console.log(`escutando na porta  ${app.get('port')}`);
});

console.log('Hello world');
