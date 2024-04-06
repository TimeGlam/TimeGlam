import mongoose from 'mongoose';

const Schema = mongoose;

const ClienteSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },

  dataNascimento: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    enum: ['M', 'F', 'LGBT'],
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
  documento: {
    tipo: {
      type: String,
      enum: ['individual', 'corporation'],
      required: true,
    },
    numero: {
      type: String,
      required: true,
    },
  },
  endereco: {
    cidade: String,
    uf: String,
    cep: String,
    numero: String,
    pais: String,
  },
});

const Cliente = mongoose.model('Cliente', ClienteSchema);
export default Cliente;
