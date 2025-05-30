import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'
const MainLayout = () => {
  return (
    <div className='div-wrapper'>
      <h1>MainLayout</h1>
      
      <Outlet /> 
      
    </div>
  );
};

export default MainLayout;
