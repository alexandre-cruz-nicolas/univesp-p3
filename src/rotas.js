import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddPet from './pages/AddPet';
import AdoptPet from './pages/AdoptPet';

const Rotas = () => {
    return(
          <BrowserRouter>  
            <Routes>
               <Route path="/" element={<Home />} exact />
               <Route path="/add-pet" element={<AddPet />}/>
               <Route path="/adopt-pet" element={<AdoptPet />}/>
            </Routes> 
          </BrowserRouter>
    );
}

export default Rotas;