import mongoose from 'mongoose';

const { Schema } = mongoose;

const ColaboradorSchema = new Schema({
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
    default: null,
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
  ContaBancaria: {
    titular: {
      type: String,
    },
    cpfCnpj: {
      type: String,
    },
    banco: {
      type: String,
    },
    tipo: {
      type: String,
    },
    agencia: {
      type: String,
    },
    numeroConta: {
      type: String,
    },
    cvv: {
      type: String,
    },
  },
  recipientId: {
    // recebedor na api pagamento
    type: String,
  },

  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const Colaborador = mongoose.model('Colaborador', ColaboradorSchema);
export default Colaborador;
