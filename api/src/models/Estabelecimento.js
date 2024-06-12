import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const EstabelecimentoSchema = new Schema({
  nome: {
    type: String,
    required: [true, "name is required."],
  },
  foto: String,
  capa: String,
  email: {
    type: String,
    required: [true, "email is required"],
  },
  senha: {
    type: String,
    required: [true, "password is required"],
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
    coordinates: [Number],
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

EstabelecimentoSchema.index({
  geo: "2dsphere",
});
EstabelecimentoSchema.pre("save", async function (next) {
  if (this.isModified("senha")) {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
  }
  next();
});

const Estabelecimento = mongoose.model(
  "Estabelecimento",
  EstabelecimentoSchema
);
export default Estabelecimento;
