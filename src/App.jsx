import React from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Home from './pages/HomePage';
import {Routes, Route} from 'react-router-dom'
import AuthRoute from './components/AuthRoute';

function App() {

  return (
    <>
      <div className="App">
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path={'/home'} element={<Home />} />
        </Route>
        <Route path={'/'} element={<LoginPage />} />
      </Routes> 
    </div>
    </>
    );
}

export default App;
