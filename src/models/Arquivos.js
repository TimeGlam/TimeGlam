import mongoose from 'mongoose';

const { Schema } = mongoose;

const ArquivoSchema = new Schema({
  referenceId: {
    type: Schema.Types.ObjectId, // id do model pertencente
    refPath: 'model', // busca o id pertencente no model abaixo
  },
  model: {
    type: String,
    required: true,
    enum: ['Servico', 'Estabelecimento'],
  },
  arquivo: {
    type: String,
    required: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const Arquivo = mongoose.model('Arquivo', ArquivoSchema);
export default Arquivo;
