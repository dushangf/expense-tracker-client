import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <AuthProvider authType={'localstorage'} authName={'_auth'} cookieDomain={window.location.hostname} cookieSecure={false}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/*'
            element={
              <RequireAuth loginPath='/login'>
                <Layout />
              </RequireAuth>
            }
          />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
