import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {filmsSlice} from './films-slice';
import { createAPI } from '../services/api';
import { NameSpace } from '../const';
import { userSlice } from './user-slice';

export const api = createAPI();

const reducer = combineReducers( {
  [NameSpace.data] : filmsSlice.reducer,
  [NameSpace.user] : userSlice.reducer,
})

export const store = configureStore(
  {
    reducer: reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        }
      })
  }
);
