import React from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css'
const MainLayout = () => {
  return (
    <div className='div-wrapper'>
     
      
      <Outlet /> 
      
    </div>
  );
};

export default MainLayout;
