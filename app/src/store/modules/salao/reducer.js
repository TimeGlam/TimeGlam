import types from "./types";
import { produce } from "immer";
import consts from "../../../consts";

const INITIAL_STATE = {
  estabelecimento: {},
  servicos: [],
  agenda: [
    {
      "2021-05-08": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-09": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-10": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-11": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-15": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-16": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-17": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
    {
      "2021-05-18": {
        "65f1d53b4a3ffb765337264d": [
          ["10:00", "10:30"],
          ["11:00", "11:30"],
          ["12:00", "12:30"],
          ["13:00", "13:30"],
          ["14:00", "14:30"],
          ["15:00", "15:30"],
          ["16:00", "16:30"],
          ["17:00", "17:30"],
        ],
      },
    },
  ],
  colaboradores: [
    {
      _id: "6668b9a3156e565786908d9b",
      nome: "teste colaborador",
      telefone: "11975469830",
      email: "teste@colaborador.com",
      foto: "https://s2-galileu.glbimg.com/uNEmxS89cbcamZwvIpRCkWquGwI=/0x0:1386x888/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_fde5cd494fb04473a83fa5fd57ad4542/internal_photos/bs/2023/m/e/F8xdjfQDGBUXCLqg7oMw/21.jpg",
      dataNascimento: "1820-04-24",
      genero: "M",
      status: "A",
      dataCadastro: "2024-06-11T20:54:59.730Z",
      __v: 0,
      vinculoId: "6668b9a3156e565786908d9e",
      vinculo: "A",
    },
  ],
  agendamento: {
    clienteId: consts.clienteId,
    estabelecimentoId: consts.estabelecimentoId,
    servicoId: "66662ea27a71294bab169326",
    colaboradorId: "6668b9a3156e565786908d9b",
    data: null,
  },
  form: {
    inputFiltro: "",
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false,
  },
};
function estabelecimento(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_ESTABELECIMENTO: {
      return produce(state, (draft) => {
        draft.estabelecimento = {
          ...state.estabelecimento,
          ...action.estabelecimento,
        };
      });
    }
    case types.UPDATE_SERVICOS: {
      return produce(state, (draft) => {
        draft.servicos = action.servicos;
      });
    }
    case types.UPDATE_FORM: {
      return produce(state, (draft) => {
        Object.keys(action.payload).forEach((key) => {
          draft.form[key] = action.payload[key];
        });
      });
    }
    // case types.UPDATE_AGENDA: {
    //   return produce(state, (draft) => {
    //     draft.agenda = [...state.agenda, ...action.agenda];
    //   });
    // }
    case types.UPDATE_AGENDA: {
      return produce(state, (draft) => {
        Object.keys(action.payload).forEach((key) => {
          draft.form[key] = action.payload[key];
        });
      });
    }
    case types.UPDATE_AGENDAMENTO: {
      return produce(state, (draft) => {
        if (action.agendamento.servicoId) {
          draft.form.modalAgendamento = 2;
        }
        draft.agendamento = { ...draft.agendamento, ...action.agendamento };
      });
    }
    default:
      return state;
  }
}
export default estabelecimento;
