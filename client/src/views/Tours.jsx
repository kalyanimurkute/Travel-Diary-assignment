import React from 'react'
import { useEffect } from 'react';
import { setPageTitle } from "./../utils.jsx";
import Navbar from '../components/Navbar';

function Tours() {
      useEffect(() => {
      setPageTitle("Edit Tour - TinyTours");
      },[]);
  return (
    <div>
      <Navbar />
      Tours</div>
  )
}

export default Tours