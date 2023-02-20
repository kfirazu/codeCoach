import React, { useState } from 'react';
import { AppHeader } from './components/app-header';
import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom';
import  Login  from './pages/login';
import { Lobby } from './pages/lobby';
import { User } from './interfaces/user.interface';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User>()
  return (
    <div className="App main-layout">
      <AppHeader />
      <Routes>
        <Route path='/' element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path='/lobby' element={<Lobby loggedInUser={loggedInUser}/>} />
      </Routes>

    </div>
  )
}

export default App;
