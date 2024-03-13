import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import './database';
import EstabelecimentoRoutes from './src/routes/Estabelecimento.routes';
import ServicoRoutes from './src/routes/Servico.routes';
import HorarioRoutes from './src/routes/horario.routes';
import ColaboradorRoutes from './src/routes/colaborador.routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.set('port', 3000);

app.use('/estabelecimento', EstabelecimentoRoutes);
app.use('/servico', ServicoRoutes);
app.use('/horario', HorarioRoutes);
app.use('/colaborador', ColaboradorRoutes);

app.listen(app.get('port'), () => {
  console.log(`server is running in ${app.get('port')} port 🚀`);
});
