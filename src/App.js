import React from 'react';
import './App.scss';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter >
      <Routes />
    </BrowserRouter>
  );
}

export default App;
