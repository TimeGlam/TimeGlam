import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cliente from "../models/Cliente";
import Agendamento from "../models/Agendamento";

import EstabelecimentoCliente from "../models/relacionamentos/EstabelecimentoCliente";
// import authMiddleware from "../middlewares/authmiddleware";

const routes = express.Router();
const { JWT_SECRET } = process.env;

routes.post("/", async (req, res) => {
  // const db = mongoose.connect;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { cliente } = req.body; // estabelecimentoId removido
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

    // // VERIFOCA SE JA EXISTE O RELACIONAMENTO COM O ESTABELECIMENTO
    // const existentRelationship = await EstabelecimentoCliente.findOne({
    //   estabelecimentoId,
    //   clienteId,
    // });

    // SE NAO ESTA VINCULADO
    if (!newCliente) {
      await new EstabelecimentoCliente({
        clienteId,
      }).save({ session });
    }
    // // SE JA EXISTIR UM VINCULO ENTRE CLIENTE E ESTABELECIMENTO
    // if (existentCliente) {
    //   await EstabelecimentoCliente.findOneAndUpdate(
    //     {
    //       estabelecimentoId,
    //       clienteId,
    //     },
    //     { status: "A" },
    //     { session }
    //   );
    // }

    await session.commitTransaction();
    session.endSession();

    if (existentCliente) {
      res.json({ erro: true, message: "Cliente já cadastrado." });
    } else {
      res.json({ erro: false });
    }
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ erro: true, message: err.message });
  }
});

routes.post("/filter", async (req, res) => {
  try {
    const clientes = await Cliente.find(req.body.filters);
    res.json({ erro: false, clientes });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.get("/estabelecimento/:estabelecimentoId", async (req, res) => {
  try {
    const { estabelecimentoId } = req.params;

    // RECUPERAR VINCULOS
    const clientes = await EstabelecimentoCliente.find({
      estabelecimentoId,
      status: { $ne: "E" },
    })
      .populate("clienteId")
      .select("clienteId dataCadastro");

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
routes.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res
        .status(400)
        .json({ erro: true, message: "Email não encontrado." });
    }

    const isMatch = await bcrypt.compare(senha, cliente.senha);
    if (!isMatch) {
      return res.status(400).json({ erro: true, message: "Senha incorreta." });
    }

    const payload = {
      cliente: {
        _id: cliente._id,
        nome: cliente.nome,
        documento: cliente.documento,
        endereco: cliente.endereco,
        telefone: cliente.telefone,
        email: cliente.email,
        dataNascimento: cliente.dataNascimento,
        genero: cliente.genero,
        status: cliente.status,
        dataCadastro: cliente.dataCadastro,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

    return res.json({ erro: false, token, payload });
  } catch (err) {
    return res.status(500).json({ erro: true, message: err.message });
  }
});

routes.get("/clientes", async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json({ erro: false, clientes });
  } catch (err) {
    res.status(500).json({ erro: true, message: err.message });
  }
});

routes.get("/:clienteId", async (req, res) => {
  try {
    const { clienteId } = req.params;

    const agendamentos = await Agendamento.find({ clienteId })
      .populate({
        path: "servicoId",
        select: "titulo duracao",
      })
      .populate({
        path: "estabelecimentoId",
        select: "nome",
      })
      .populate({
        path: "colaboradorId",
        select: "nome",
      })
      .select("-__v"); // Excluir o campo '__v' do resultado

    res.json({ error: false, agendamentos });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

routes.delete("/vinculo/:id", async (req, res) => {
  try {
    await EstabelecimentoCliente.findByIdAndUpdate(req.params.id, {
      status: "E",
    });
    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.delete("/agendamento/:id", async (req, res) => {
  try {
    await Agendamento.findByIdAndDelete(req.params._id);
    res.json({ erro: false });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

export default routes;
