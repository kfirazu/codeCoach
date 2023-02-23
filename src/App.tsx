import React, { useState } from 'react';
import { AppHeader } from './components/app-header';
import './assets/styles/main.scss'
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Lobby } from './pages/lobby';
import { User } from './interfaces/user.interface';
import { CodeBlockDetails } from './pages/code-block-details';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"


function App() {

  const [loggedInUser, setLoggedInUser] = useState<User>()
  return (
    <div className="App main-layout">
      <ToastContainer />
      <AppHeader />
      <Routes>
        <Route path='/' element={<Login setLoggedInUser={setLoggedInUser} />} />
        <Route path='/lobby' element={<Lobby loggedInUser={loggedInUser} />} />
        <Route path='/codeBlock/:codeBlockId' element={<CodeBlockDetails loggedInUser={loggedInUser} />} />

      </Routes>

    </div>
  )
}

export default App;
