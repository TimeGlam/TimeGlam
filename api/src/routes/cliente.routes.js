import express from 'express';
import mongoose from 'mongoose';
import Cliente from '../models/Cliente';
import EstabelecimentoCliente from '../models/relacionamentos/EstabelecimentoCliente';

const routes = express.Router();

routes.post('/', async (req, res) => {
  // const db = mongoose.connect;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { cliente, estabelecimentoId } = req.body;
    let newCliente = null;

    // VERIFICAR SE O CLIENTE EXISTE
    const existentCliente = await Cliente.findOne({
      $or: [{ email: cliente.email }, { telefone: cliente.telefone }],
    });
    // SE NAO EXISTIR O CLIENTE
    if (!existentCliente) {
      // CRIANDO CLIENTE
      newCliente = await new Cliente({
        ...cliente,
      }).save({ session });
    }

    // RELACIONAMENTO
    const clienteId = existentCliente ? existentCliente._id : newCliente._id;

    // VERIFOCA SE JA EXISTE O RELACIONAMENTO COM O ESTABELECIMENTO
    const existentRelationship = await EstabelecimentoCliente.findOne({
      estabelecimentoId,
      clienteId,
      status: { $ne: 'E' },
    });

    // SE NAO ESTA VINCULADO
    if (!existentRelationship) {
      await new EstabelecimentoCliente({
        estabelecimentoId,
        clienteId,
      }).save({ session });
    }
    // SE JA EXISTIR UM VINCULO ENTRE CLIENTE E ESTABELECIMENTO
    if (existentCliente) {
      await EstabelecimentoCliente.findOneAndUpdate(
        {
          estabelecimentoId,
          clienteId,
        },
        { status: 'A' },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    if (existentCliente && existentRelationship) {
      res.json({ erro: true, message: 'Cliente já cadastrado.' });
    } else {
      res.json({ erro: false });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ erro: true, message: err.message });
  }
});

routes.post('/filter', async (req, res) => {
  try {
    const clientes = await Cliente.find(req.body.filters);
    res.json({ erro: false, clientes });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.get('/estabelecimento/:estabelecimentoId', async (req, res) => {
  try {
    const { estabelecimentoId } = req.params;

    // RECUPERAR VINCULOS
    const clientes = await EstabelecimentoCliente.find({
      estabelecimentoId,
      status: { $ne: 'E' },
    })
      .populate('clienteId')
      .select('clienteId dataCadastro');

    res.json({
      erro: false,
      clientes: clientes.map((vinculo) => ({
        ...vinculo.clienteId._doc,
        vinculoId: vinculo._id,
        dataCadastro: vinculo.dataCadastro,
      })),
    });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.delete('/vinculo/:id', async (req, res) => {
  try {
    await EstabelecimentoCliente.findByIdAndUpdate(req.params.id, {
      status: 'E',
    });
    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

export default routes;
