import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import reducers from './reducers';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  blackList : []
};

const persistedReducers = persistReducer(persistConfig, reducers);


export const store = createStore(
  persistedReducers,
  composeWithDevTools(applyMiddleware(thunk))
);

console.log('Data from Store', store.getState());

export const persistor = persistStore(store);
