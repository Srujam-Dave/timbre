import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Login from './Login.jsx'
import Callback from './Callback.jsx'
import Landing from './Landing.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Navigate replace to='/login' />} />
        <Route path='/login' element={ <Login /> } />
        <Route path='/callback' element={ <Callback />} />
        <Route path='/landing' element={ <Landing />} />
      </Routes>
    </Router>
  )
}

export default App;