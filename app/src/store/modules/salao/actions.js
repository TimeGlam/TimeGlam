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

export function updateAgendamento(key, value) {
  return { type: types.UPDATE_AGENDAMENTO, key, value };
}

export function updateForm(key, value) {
  return { type: types.UPDATE_FORM, key, value };
}

export function filterAgenda() {
  return { type: types.FILTER_AGENDA };
}

export function updateAgenda(agenda) {
  return { type: types.UPDATE_AGENDA, agenda };
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
