import express from 'express';
import * as Turf from '@turf/turf';
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
routes.get('/:id', async (req, res) => {
  try {
    const estabelecimento = await Estabelecimento
      .findById(req.params.id)
      .select('capa nome endereco.cidade geo.coordinates telefone');

    const distanceLocation = Turf.distance(
      Turf.point(estabelecimento.geo.coordinates),
      Turf.point([-23.660847245983103, -46.813597441037395]),
    );
    res.json({ error: false, estabelecimento, distanceLocation });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});
export default routes;
