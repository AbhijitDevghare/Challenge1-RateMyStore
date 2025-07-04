import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StoreList from './pages/user/StoreList';
import CustomeRoutes from './routes/CustomRoutes';

function App() {
  return (
    <>
      <CustomeRoutes/>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
