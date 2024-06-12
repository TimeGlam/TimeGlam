import express from "express";
import mongoose from "mongoose";
import moment from "moment";
import _ from "lodash";
import Colaborador from "../models/Colaborador";
import Servico from "../models/Servico";
import Horario from "../models/Horario";
import Agendamento from "../models/Agendamento";
import util from "../util";

const routes = express.Router();

routes.post("/", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { servicoId } = req.body;

    const servico = await Servico.findById(servicoId).select("preco comissao");

    let agendamento = req.body;
    agendamento = {
      ...agendamento,
      comissao: servico.comissao,
      valor: servico.preco,
    };
    await new Agendamento(agendamento).save();

    await session.commitTransaction();
    session.endSession();
    res.json({ error: false });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.json({ erro: true, message: err.message });
  }
});

routes.post("/filter", async (req, res) => {
  try {
    const { range, estabelecimentoId } = req.body;

    const agendamentos = await Agendamento.find({
      estabelecimentoId,
      data: {
        $gte: moment(range.start).startOf("day"),
        $lte: moment(range.end).endOf("day"),
      },
    }).populate([
      { path: "servicoId", select: "titulo duracao" },
      { path: "colaboradorId", select: "nome" },
      { path: "clienteId", select: "nome" },
    ]);

    res.json({ error: false, agendamentos });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

routes.post("/dias-disponiveis", async (req, res) => {
  try {
    const { data, estabelecimentoId, servicoId } = req.body;
    const horarios = await Horario.find({ estabelecimentoId });
    const servico = await Servico.findById(servicoId).select("duracao");
    let colaboradores = [];

    let agenda = [];
    let lastDay = moment(data);

    // DURAÇÃO DO SERVIÇO
    const servicoDuracao = util.hourToMinutes(
      moment(servico.duracao).format("HH:mm")
    );

    const servicoDuracaoSlots = util.sliceMinutes(
      servico.duracao,
      moment(servico.duracao).add(servicoDuracao, "minutes"),
      util.SLOT_DURATION
    ).length;

    for (let i = 0; i <= 365 && agenda.length <= 7; i++) {
      const espacosValidos = horarios.filter((horario) => {
        // VERIFICAR DIA DA SEMANA

        const diaSemanaDisponivel = horario.dias.includes(
          moment(lastDay).day()
        );

        // VERIFICAR ESPECIALIDADE DISPONÍVEL
        const servicosDisponiveis = horario.especialidades.includes(servicoId);

        return diaSemanaDisponivel && servicosDisponiveis;
      });

      if (espacosValidos.length > 0) {
        // TODOS OS HORÁRIOS DISPONÍVEIS DAQUELE DIA
        let todosHorariosDia = {};
        for (let espaco of espacosValidos) {
          for (let colaboradorId of espaco.colaboradores) {
            if (!todosHorariosDia[colaboradorId]) {
              todosHorariosDia[colaboradorId] = [];
            }
            todosHorariosDia[colaboradorId] = [
              ...todosHorariosDia[colaboradorId],
              ...util.sliceMinutes(
                util.mergeDateTime(lastDay, espaco.inicio),
                util.mergeDateTime(lastDay, espaco.fim),
                util.SLOT_DURATION
              ),
            ];
          }
        }
        for (let colaboradorId of Object.keys(todosHorariosDia)) {
          // LER AGENDAMENTOS DAQUELE ESPECIALISTA NAQUELE DIA
          const agendamentos = await Agendamento.find({
            colaboradorId: colaboradorId,
            data: {
              $gte: moment(lastDay).startOf("day"),
              $lte: moment(lastDay).endOf("day"),
            },
          })
            .select("data servicoId -_id")
            .populate("servicoId", "duracao");

          let horariosOcupado = agendamentos.map((a) => ({
            inicio: moment(a.data),
            fim: moment(a.data).add(
              util.hourToMinutes(moment(a.servicoId.duracao).format("HH:mm")),
              "minutes"
            ),
          }));
          horariosOcupado = horariosOcupado
            .map((h) => util.sliceMinutes(h.inicio, h.fim, util.SLOT_DURATION))
            .flat();

          // REMOVENDO TODOS OS HORÁRIOS QUE ESTÃO OCUPADOS
          let horariosLivres = util
            .splitByValue(
              todosHorariosDia[colaboradorId].map((horariosLivre) => {
                return horariosOcupado.includes(horariosLivre)
                  ? "-"
                  : horariosLivre;
              }),
              "-"
            )
            .filter((space) => space.length > 0);

          horariosLivres = horariosLivres.filter(
            (h) => h.length >= servicoDuracaoSlots
          );

          horariosLivres = horariosLivres
            .map((slot) =>
              slot.filter(
                (horario, index) => slot.length - index >= servicoDuracaoSlots
              )
            )
            .flat();

          horariosLivres = _.chunk(horariosLivres, 2);

          if (horariosLivres.length === 0) {
            todosHorariosDia = _.omit(todosHorariosDia, colaboradorId);
          } else {
            todosHorariosDia[colaboradorId] = horariosLivres;
          }
        }
        const totalColaboradores = Object.keys(todosHorariosDia).length;

        if (totalColaboradores > 0) {
          colaboradores.push(Object.keys(todosHorariosDia));
          agenda.push({
            [lastDay.format("YYYY-MM-DD")]: todosHorariosDia,
          });
        }
      }
      lastDay = lastDay.add(1, "day");
    }

    colaboradores = _.uniq(colaboradores.flat());

    colaboradores = await Colaborador.find({
      _id: { $in: colaboradores },
    }).select("nome foto");

    colaboradores = colaboradores.map((c) => ({
      ...c._doc,
      nome: c.nome.split(" ")[0],
    }));

    res.json({
      error: false,
      colaboradores,
      agenda,
    });
  } catch (err) {
    res.json({ error: true, message: err.message });
  }
});

export default routes;
