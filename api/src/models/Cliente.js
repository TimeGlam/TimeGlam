import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    required: [true, "password is required"],
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
ClienteSchema.pre("save", async function (next) {
  if (this.isModified("senha")) {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  }
  next();
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;
