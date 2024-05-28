import mongoose from "mongoose";

const { Schema } = mongoose;

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
    default: null,
  },
  foto: {
    type: String,
  },

  dataNascimento: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    enum: ["M", "F", "O"],
    required: true,
  },

  status: {
    type: String,
    enum: ["A", "I"],
    required: true,
    default: "A",
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
  documento: {
    tipo: {
      type: String,
      enum: ["cpf", "cnpj"],
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
    logradouro: String,
  },
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;
