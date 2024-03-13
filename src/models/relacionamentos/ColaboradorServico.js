import mongoose from 'mongoose';

const { Schema } = mongoose;

const ColaboradorServicoSchema = new Schema({
  colaboradorId: {
    type: mongoose.Types.ObjectId,
    ref: 'Colaborador',
    required: true,
  },
  servicoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Servico',
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

const ColaboradorServico = mongoose.model(
  'ColaboradorServico',
  ColaboradorServicoSchema,
);
export default ColaboradorServico;
