import express from 'express';
import multer from 'multer';
import { multerConfig, s3 } from '../config/multer';
import Arquivos from '../models/Arquivos';
import Servico from '../models/Servico';

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/', upload.any(), async (req, res) => {
  try {
    const { estabelecimentoId } = req.body;
    const arquivos = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const path = file.key;
        arquivos.push(path);
      }
    }

    // CRIAR SERVIÇO
    const jsonServico = JSON.parse(req.body.servico);
    jsonServico.estabelecimentoId = estabelecimentoId;
    const servico = await new Servico(jsonServico).save();

    // CRIAR ARQUIVO
    const arquivosDocument = arquivos.map((arquivo) => ({
      referenceId: servico._id,
      model: 'Servico',
      arquivo,
    }));
    console.log(arquivosDocument);
    await Arquivos.insertMany(arquivosDocument);

    res.json({ error: false, servico, arquivos: arquivosDocument });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

routes.put('/:id', upload.any(), async (req, res) => {
  try {
    const arquivos = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const path = file.key;
        arquivos.push(path);
      }
    }

    // CRIAR SERVIÇO
    const jsonServico = JSON.parse(req.body.servico);
    await Servico.findByIdAndUpdate(req.params.id, jsonServico);

    // CRIAR ARQUIVO
    const arquivosDocument = arquivos.map((arquivo) => ({
      referenceId: req.params.id,
      model: 'Servico',
      arquivo,
    }));
    console.log(arquivosDocument);
    await Arquivos.insertMany(arquivosDocument);

    res.json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});
routes.get('/estabelecimento/:estabelecimentoId', async (req, res) => {
  try {
    const servicosEstabelecimento = [];
    const servicos = await Servico.find({
      estabelecimentoId: req.params.estabelecimentoId,
      status: { $ne: 'E' },
    });

    for (const servico of servicos) {
      const arquivos = await Arquivos.find({
        model: 'Servico',
        referenceId: servico._id,
      });
      servicosEstabelecimento.push({ ...servico._doc, arquivos });
    }
    res.json({
      servicos: servicosEstabelecimento,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});
routes.post('/delete-arquivo', async (req, res) => {
  try {
    const { id } = req.body;

    const path = id;
    const params = {
      Bucket: 'timeglam-dev',
      Key: path,
    };

    await s3.deleteObject(params).promise();

    await Arquivos.findOneAndDelete({
      arquivo: id,
    });

    res.json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Servico.findByIdAndUpdate(id, { status: 'E' });

    await Arquivos.findOneAndDelete({
      arquivo: id,
    });

    res.json({ error: false });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});
export default routes;
