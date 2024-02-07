import mongoose from 'mongoose';

const { Schema } = mongoose;

const EstabelecimentoSchema = new Schema({
  nome: {
    type: String,
    required: [true, 'name is required.'],
  },
  foto: String,
  capa: String,
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  senha: {
    type: String,
    default: null,
  },
  telefone: String,
  endereco: {
    cidade: String,
    uf: String,
    cep: String,
    numero: String,
    pais: String,

  },
  geo: {
    tipo: String,
    coordinates: Array,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

EstabelecimentoSchema.index({
  geo: '2dsphere',
});

const Estabelecimento = mongoose.model('Estabelecimento', EstabelecimentoSchema);
export default Estabelecimento;
