import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import appStateReducer from '../reducer/appState';


const appReducer = combineReducers({
  app: appStateReducer,
});
// const middlewares = [
//   /* other middlewares */
// ];


const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;