import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { AppWithProvider } from './appWithProvider';
import { setupStore } from './src/store/store';

export default function App() {

  const store = setupStore()

  return <>
    <Provider store={store}>
      <AppWithProvider />
      <StatusBar style="auto" />
    </Provider>
  </>;
}


