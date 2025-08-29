import { Route, Routes } from 'react-router-dom';

import { Home } from '@pages/home';

export const App = () => {
  return (
    <div className="app" data-cy="app">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};
