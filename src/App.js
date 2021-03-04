import './App.css';
import Routes from './routes';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

const App = () => (
  <ReduxProvider store={store}>
      <Routes />
  </ReduxProvider>
);

export default App;
