import express from "express";
import * as Turf from "@turf/turf";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Estabelecimento from "../models/Estabelecimento";
import Servico from "../models/Servico";

const routes = express.Router();
const { JWT_SECRET } = process.env;

routes.post("/", async (req, res) => {
  try {
    const estabelecimento = await new Estabelecimento(req.body).save();
    res.json({ estabelecimento });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});
routes.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const estabelecimento = await Estabelecimento.findOne({ email });
    if (!estabelecimento) {
      return res
        .status(400)
        .json({ erro: true, message: "Email não encontrado" });
    }

    const isMatch = await bcrypt.compare(senha, estabelecimento.senha);
    if (!isMatch) {
      return res.status(400).json({ erro: true, message: "Senha incorreta" });
    }

    const payload = {
      id: estabelecimento._id,
      nome: estabelecimento.nome,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });

    return res.json({ erro: false, token });
  } catch (err) {
    return res.status(500).json({ erro: true, message: err.message });
  }
});

routes.get("/login/logout", (req, res) => {
  res.json({ message: "Logout realizado com sucesso" });
  res.redirect("/login");
});

routes.get("/servicos/:estabelecimentoId", async (req, res) => {
  try {
    const { estabelecimentoId } = req.params;
    const servicos = await Servico.find({
      estabelecimentoId,
      status: "A",
    }).select("_id titulo");
    res.json({
      servicos: servicos.map((s) => ({ label: s.titulo, value: s._id })),
    });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});

routes.get("/estabelecimentos", async (req, res) => {
  try {
    const estabelecimentos = await Estabelecimento.find().select(
      "nome telefone email capa foto endereco.cidade geo.coordinates"
    );
    res.json({ error: false, estabelecimentos });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const estabelecimento = await Estabelecimento.findById(
      req.params.id
    ).select("capa nome endereco.cidade geo.coordinates telefone");

    // Verificar se as coordenadas do usuário foram passadas como query params
    const userLat = parseFloat(req.query.userLat);
    const userLon = parseFloat(req.query.userLon);

    if (isNaN(userLat) || isNaN(userLon)) {
      return res
        .status(400)
        .json({ error: true, message: "Coordenadas inválidas" });
    }

    // Calcular a distância entre o estabelecimento e a localização do usuário
    const distanceLocation = Turf.distance(
      Turf.point(estabelecimento.geo.coordinates),
      Turf.point([userLat, userLon])
    );

    res.json({ error: false, estabelecimento, distanceLocation });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});
export default routes;
