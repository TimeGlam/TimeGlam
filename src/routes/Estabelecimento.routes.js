import express from 'express';
import Estabelecimento from '../models/Estabelecimento';
import Servico from '../models/Servico';

const routes = express.Router();

routes.post('/', async (req, res) => {
  try {
    const estabelecimento = await new Estabelecimento(req.body).save();
    res.json({ estabelecimento });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.get('/servicos/:estabelecimentoId', async (req, res) => {
  try {
    const { estabelecimentoId } = req.params;
    const servicos = await Servico.find({
      estabelecimentoId,
      status: 'A',
    }).select('_id titulo');
    res.json({
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
    });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});
export default routes;
