import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';
import './assets/scss/global.scss';

function App() {
  return (
    <div className="wrap">
          <Router>
              <Header />
              <div className='container'>
                <AppRoutes />
              </div>
          </Router>
      </div>
  );
}

export default App;
