import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

const Rotas = () => {
    return(
          <BrowserRouter>  
            <Routes>
               <Route path="/" element={<Home />} exact />
            </Routes> 
          </BrowserRouter>
    );
}

export default Rotas;