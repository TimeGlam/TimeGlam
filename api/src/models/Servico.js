import mongoose from "mongoose";

const { Schema } = mongoose;

const ServicoSchema = new Schema({
  estabelecimentoId: {
    type: mongoose.Types.ObjectId,
    ref: "Estabelecimento",
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  preco: {
    type: Number,
    required: true,
  },
  comissao: {
    type: Number, // % sob preco
    required: true,
  },
  duracao: {
    type: String, // minutos
    required: true,
  },
  recorrencia: {
    type: Number, // minutos
    required: true,
  },
  descricao: {
    type: String, // minutos
    required: true,
  },
  status: {
    type: String,
    enum: ["A", "I", "E"],
    required: true,
    default: "A",
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const Servico = mongoose.model("Servico", ServicoSchema);
export default Servico;
