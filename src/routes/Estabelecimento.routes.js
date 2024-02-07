import express from 'express';
import Estabelecimento from '../models/Estabelecimento';

const routes = express.Router();

routes.post('/', async (req, res) => {
  try {
    const estabelecimento = await new Estabelecimento(req.body).save();
    res.json({ estabelecimento });
  } catch (err) {
    res.json({ erro: true, message: err.message });
  }
});
export default routes;
