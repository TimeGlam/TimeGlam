import express from 'express';
import _ from 'lodash';
import Horario from '../models/Horario';
import ColaboradorServico from '../models/relacionamentos/ColaboradorServico';

const routes = express.Router();

routes.post('/', async (req, res) => {
  try {
    const horario = await new Horario(req.body).save();
    res.json({ horario });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.get('/estabelecimento/:estabelecimentoId', async (req, res) => {
  try {
    const { estabelecimentoId } = req.params;
    const horarios = await Horario.find({
      estabelecimentoId,
    });
    res.json({ horarios });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.put('/:horarioId', async (req, res) => {
  try {
    const { horarioId } = req.params;
    const horario = req.body;
    await Horario.findByIdAndUpdate(horarioId, horario);

    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.delete('/:horarioId', async (req, res) => {
  try {
    const { horarioId } = req.params;

    await Horario.findByIdAndDelete(horarioId);

    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.post('/colaboradores', async (req, res) => {
  try {
    const colaboradorServico = await ColaboradorServico.find({
      servicoId: { $in: req.body.especialidades },
      status: 'A',
    })
      .populate('colaboradorId', 'nome')
      .select('colaboradorId -_id');

    const listaColaboradores = _.uniqBy(colaboradorServico, (vinculo) =>
      vinculo.colaboradorId._id.toString(),
    ).map((vinculo) => ({
      label: vinculo.colaboradorId.nome,
      value: vinculo.colaboradorId._id,
    }));

    res.json({ erro: false, listaColaboradores });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

export default routes;
