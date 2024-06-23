import { combineReducers } from "redux";
import estabelecimento from "../modules/salao/reducer";
import auth from "./loginCliente/auth";
export default combineReducers({
  estabelecimento,
  auth,
});
