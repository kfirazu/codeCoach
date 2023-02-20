import React from 'react';
import { AppHeader } from './components/app-header';
import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Lobby } from './pages/lobby';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='lobby' element={<Lobby />} />
      </Routes>

    </div>
  )
}

export default App;
