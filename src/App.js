import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import "bootstrap-icons/font/bootstrap-icons.css";


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// importing components
import LandingPage from "./pages/landingPage";
import Notfound from "./pages/notfound";
import Properties from "./pages/properties";
import Fav from "./pages/favourites";
import PropertyInfo from "./pages/propertyInfo";


function App() {
  return (
    <>
    <Router>
      <Routes>
        
        <Route path="/" element={<LandingPage />} />

        <Route path="/properties" element={<Properties />} />

        <Route path="/fav" element={<Fav />} />


        <Route path="/property/:propertyId" element={<PropertyInfo />} />

        <Route path="*" element={<Notfound />} />

      </Routes>
    </Router>
    </>
  );
}

export default App;
