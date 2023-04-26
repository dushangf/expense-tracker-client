import Dashboard from './pages/Dashboard';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Expenses from './pages/Expenses';
import Profile from './pages/Profile';
import ArchivedExpenses from './pages/ArchivedExpenses';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';
import { getUserDetails } from './store/UserSlice';
import { useIsAuthenticated } from 'react-auth-kit';

const Layout = () => {
  const auth = useIsAuthenticated();

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails())
  }, [auth]);

  return (
    <div className='h-screen'>
      <Header />
      <div className='flex h-screen'>
        <NavBar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/expenses/archived' element={<ArchivedExpenses />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
