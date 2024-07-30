import React,{useEffect, useContext} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthContext, FirebaseContext } from './store/Context'
import Post from './store/PostContext'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import View from './Pages/ViewPost'

/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';

function App() {
  const {setUser} = useContext(AuthContext)
  const {auth} = useContext(FirebaseContext)
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user)
    })
  })
  return (
    <>
    
    <div>
      <Post>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/view' element={<View/>}/>
      </Routes>
      </BrowserRouter>
      </Post>
    </div>
    </>
  );
}

export default App;
