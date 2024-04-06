import mongoose from 'mongoose';

const Schema = mongoose;

const AgendamentoSchema = new Schema({

  estabelecimentoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Estabelecimento',
    required: true,
  },
  clienteId: {
    type: mongoose.Types.ObjectId,
    ref: 'Cliente',
    required: true,
  },
  servicoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Servico',
    required: true,
  },
  colaboradorId: {
    type: mongoose.Types.ObjectId,
    ref: 'Colaborador',
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  comissao: {
    type: Number,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);
export default Agendamento;
