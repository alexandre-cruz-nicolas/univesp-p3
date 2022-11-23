import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddPet from './pages/AddPet';

const Rotas = () => {
    return(
          <BrowserRouter>  
            <Routes>
               <Route path="/" element={<Home />} exact />
               <Route path="/add-pet" element={<AddPet />}/>
            </Routes> 
          </BrowserRouter>
    );
}

export default Rotas;