import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootreducer';
import rootSaga from './modules/rootSaga';
import Reactotron from '../config/reactotron';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  compose(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer()),
);
sagaMiddleware.run(rootSaga);
export default DevToolsSettingsManager;
