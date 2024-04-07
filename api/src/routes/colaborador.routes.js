import express from 'express';
import mongoose from 'mongoose';
import Colaborador from '../models/Colaborador';
import EstabelecimentoColaborador from '../models/relacionamentos/EstabelecimentoColaborador';
import ColaboradorServico from '../models/relacionamentos/ColaboradorServico';

const routes = express.Router();

routes.post('/', async (req, res) => {
  // const db = mongoose.connect;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
  const { colaborador, estabelecimentoId } = req.body;
    let newColaborador = null;

    // VERIFICAR SE O COLABORADOR EXISTE
    const existentColaborador = await Colaborador.findOne({
      $or: [{ email: colaborador.email }, { telefone: colaborador.telefone }],
    });
    // SE NAO EXISTIR O COLABORADOR
    if (!existentColaborador) {
      // CRIANDO COLABORADOR
      newColaborador = await Colaborador({
        ...colaborador,
      }).save({ session });
    }

    // RELACIONAMENTO
    const colaboradorId = existentColaborador
      ? existentColaborador._id
      : newColaborador._id;

    // VERIFOCA SE JA EXISTE O RELACIONAMENTO COM O ESTABELECIMENTO
    const exitentRelationship = await EstabelecimentoColaborador.findOne({
      estabelecimentoId,
      colaboradorId,
      status: { $ne: 'E' },
    });

    // SE NAO ESTA VINCULADO
    if (!exitentRelationship) {
      await new EstabelecimentoColaborador({
        estabelecimentoId,
        colaboradorId,
        status: colaborador.vinculo,
      }).save({ session });
    }
    // SE JA EXISTIR UM VINCULO ENTRE COLABORADOR E ESTABELECIMENTO
    if (existentColaborador) {
      const exitentRelationship = await EstabelecimentoColaborador.findOneAndUpdate(
        {
          estabelecimentoId,
          colaboradorId,
        },
        { status: colaborador.vinculo },
        { session },
      );
    }
    // RELACAO COM AS ESPECIALIDADES
    await ColaboradorServico.insertMany(
      colaborador.especialidade.map(
        (servicoId) => ({
          servicoId,
          colaboradorId,
        }),
        { session },
      ),
    );

    await session.commitTransaction();
    session.endSession();

    if (existentColaborador && exitentRelationship) {
      res.json({ erro: true, message: 'Colaborador já cadastrado.' });
    } else {
      res.json({ erro: false });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ erro: true, message: err.message });
  }
});

routes.put('/:colaboradorId', async (req, res) => {
  try {
    const { vinculo, vinculoId, especialidade } = req.body;
    const { colaboradorId } = req.params;

    // VINCULO
    await EstabelecimentoColaborador.findByIdAndUpdate(vinculoId, {
      status: vinculo,
    });

    // ESPECIALIDADES
    await ColaboradorServico.deleteMany({
      colaboradorId,
    });

    await ColaboradorServico.insertMany(
      especialidade.map((servicoId) => ({
        servicoId,
        colaboradorId,
      })),
    );

    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.delete('/vinculo/:id', async (req, res) => {
  try {
    await EstabelecimentoColaborador.findByIdAndUpdate(req.params.id, {
      status: 'E',
    });
    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.post('/filter', async (req, res) => {
  try {
    const colaboradores = await Colaborador.find(req.body.filters);
    res.json({ erro: false, colaboradores });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.get('/estabelecimento/:estabelecimentoId', async (req, res) => {
  try {
    const { estabelecimentoId } = req.params;
    const listaColaboradores = [];

    // RECUPERAR VINCULOS
    const estabelecimentoColaboradores = await EstabelecimentoColaborador.find({
      estabelecimentoId,
      status: { $ne: 'E' },
    })
      .populate([{ path: 'colaboradorId', select: '-senha -ContaBancaria' }])
      .select('colaboradorId dataCadastro status');

    for (const vinculo of estabelecimentoColaboradores) {
      const especialidades = await ColaboradorServico.find({
        colaboradorId: vinculo.colaboradorId._id,
      });

      listaColaboradores.push({
        ...vinculo._doc,
        especialidades,
      });
    }

    res.json({
      erro: false,
      colaboradores: listaColaboradores.map((vinculo) => ({
        ...vinculo.colaboradorId._doc,
        vinculoId: vinculo._id,
        vinculo: vinculo.status,
        especialidades: vinculo.especialidades,
        dataCadastro: vinculo.dataCadastro,
      })),
    });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

export default routes;
