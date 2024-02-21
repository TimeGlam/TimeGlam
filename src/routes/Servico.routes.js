import express from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import Arquivos from '../models/Arquivos';
import Servico from '../models/Servico';

const routes = express.Router();
const upload = multer(multerConfig);

routes.post('/', upload.any(), async (req, res) => {
  try {
    const { estabelecimentoId } = req.body;
    const { files } = req;
    const arquivos = [];

    if (files && files.length > 0) {
      for (const file of files) {
        const path = file.key; // O caminho no S3 é obtido automaticamente pelo multer-s3
        arquivos.push(path);
      }
    }

    // CRIAR SERVIÇO
    const jsonServico = JSON.parse(req.body.servico);
    jsonServico.estabelecimentoId = estabelecimentoId;
    const servico = await new Servico(jsonServico).save();

    // CRIAR ARQUIVO
    const arquivosDocument = arquivos.map((path) => ({
      referenceId: servico._id,
      model: 'Servico',
      path,
    }));
    await Arquivos.insertMany(arquivosDocument);

    res.json({ error: false, servico, arquivos });
  } catch (err) {
    res.status(500).json({ error: true, message: err.message });
  }
});

export default routes;
