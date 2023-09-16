import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import store from './store/store';

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
});

function App() {
  return (
    <>
      <Provider store={store}>
        <Home />
      </Provider>
    </>
  )
}

export default App;
