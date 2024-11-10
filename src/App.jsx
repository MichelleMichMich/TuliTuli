import './App.css'

import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { Navigate } from 'react-router-dom'
import { Login } from './components/Login'
import { Registration } from './components/Registration'
import { NavBar } from './components/NavBar'
import { Home } from './components/Home'
import { CatsPage } from './components/CatsPage'
import { DogsPage } from './components/DogsPage'
import { AnimalDetail } from './components/AnimalDetail'
import { CatsReservation } from './components/CatsReservation'
import { DogsReservation } from './components/DogsReservation'
import { GiftsPage } from './components/GiftsPage'
import { ActionsPage } from './components/ActionsPage'
import { ContactPage } from './components/ContactPage'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <AuthProvider>
      <Router>
          { isAuthenticated && <NavBar setIsAuthenticated={setIsAuthenticated} /> } 
        <Routes>
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/' element={isAuthenticated ? <Home setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/login" />} />
          <Route path='/cats' element={<CatsPage/>}/>
          <Route path='/cats/catsReservation' element={<CatsReservation/>}/>
          <Route path='/dogs' element={<DogsPage/>}/>
          <Route path='/dogs/dogsReservation' element={<DogsReservation/>}/>
          <Route path='/:animalType/:id' element={<AnimalDetail/>}/>
          <Route path='/gifts' element={<GiftsPage/>}/>
          <Route path='/actions' element={<ActionsPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
        </Routes>
      </Router>
      </AuthProvider>
    </>
  )
}

export default App
