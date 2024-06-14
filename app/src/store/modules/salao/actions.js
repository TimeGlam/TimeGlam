import types from "./types";

export function getEstabelecimento() {
  return { type: types.GET_ESTABELECIMENTO };
}

export function updateEstabelecimento(estabelecimento) {
  return { type: types.UPDATE_ESTABELECIMENTO, estabelecimento };
}

export function allServicos() {
  return { type: types.ALL_SERVICOS };
}

export function updateServicos(servicos) {
  return { type: types.UPDATE_SERVICOS, servicos };
}

export const updateForm = (field, value) => ({
  type: types.UPDATE_FORM,
  payload: { [field]: value },
});

// export const updateAgendamento = (key, value) => ({
//   type: types.UPDATE_AGENDAMENTO,
//   agendamento: { [key]: value },
// });

export const updateAgendamento = (agendamento) => ({
  type: types.UPDATE_AGENDAMENTO,
  agendamento,
});

export const updateAgenda = (agenda) => ({
  type: types.UPDATE_AGENDA,
  agenda,
});

export function filterAgenda() {
  return { type: types.FILTER_AGENDA };
}

export function updateColaboradores(colaboradores) {
  return { type: types.UPDATE_COLABORADORES, colaboradores };
}

export function resetAgendamento() {
  return { type: types.RESET_AGENDAMENTO };
}

export function saveAgendamento() {
  return { type: types.SAVE_AGENDAMENTO };
}
