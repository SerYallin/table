import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.scss';
import { App } from '@components/app';
import { Provider } from 'mobx-react';
import tableStore from '@services/stores/table-store';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider tableStore={tableStore}>
      <App />
    </Provider>
  </BrowserRouter>
);
