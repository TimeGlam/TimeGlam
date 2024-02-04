import mongoose from 'mongoose';

const Schema = mongoose;

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
  ContaBancaria: {
    titular: {
      type: String,
      required: true,
    },
    cpfCnpj: {
      type: String,
      required: true,
    },
    banco: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    agencia: {
      type: String,
      required: true,
    },
    numeroConta: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
  },
  recipientId: { // recebedor na api pagamento
    type: String,
    required: true,
  },

  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const Colaborador = mongoose.model('Colaborador', ColaboradorSchema);
export default Colaborador;
