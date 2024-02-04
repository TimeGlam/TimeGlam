import mongoose from 'mongoose';

const Schema = mongoose;

const EstabelecimentoColaboradorSchema = new Schema({

  estabelecimentoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Estabelecimento',
    required: true,
  },

  ColaboradorId: {
    type: mongoose.Types.ObjectId,
    ref: 'Colaborador',
    required: true,
  },
  status: {
    type: String,
    enum: ['A', 'I'],
    required: true,
    default: 'A',
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const EstabelecimentoColaborador = mongoose.model('EstabelecimentoColaborador', EstabelecimentoColaboradorSchema);
export default EstabelecimentoColaborador;
