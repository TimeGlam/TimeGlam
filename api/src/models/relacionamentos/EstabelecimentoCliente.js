import mongoose from 'mongoose';

const Schema = mongoose;

const EstabelecimentoClienteSchema = new Schema({
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

const EstabelecimentoCliente = mongoose.model(
  'EstabelecimentoCliente',
  EstabelecimentoClienteSchema,
);
export default EstabelecimentoCliente;
