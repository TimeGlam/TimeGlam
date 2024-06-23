import { produce } from "immer";
import types from "./types";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return produce(state, (draft) => {
        draft.loading = true;
        draft.error = null;
      });
    case types.LOGIN_SUCCESS:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.token = action.payload.token;
      });
    case types.LOGIN_FAILURE:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.error = action.payload.error;
      });
    default:
      return state;
  }
}

export default auth;
