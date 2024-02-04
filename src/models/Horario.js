import mongoose from 'mongoose';

const Schema = mongoose;

const HorarioSchema = new Schema({

  estabelecimentoId: {
    type: mongoose.Types.ObjectId,
    ref: 'Estabelecimento',
    required: true,
  },
  especialidades: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Servico',
      required: true,
    },
  ],
  colaboradores: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Colaborador',
      required: true,
    },
  ],
  dias: {
    type: [Number],
    required: true,
  },
  inicio: {
    type: Date,
    required: true,
  },
  fim: {
    type: Date,
    required: true,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

const Horario = mongoose.model('Horario', HorarioSchema);
export default Horario;
