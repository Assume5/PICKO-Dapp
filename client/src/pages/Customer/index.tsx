import React from 'react';
import { Contract } from '../../types/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//pages
import { Home } from './Home/Home';
import { Restaurant } from './Restaurant/Restaurant';
import { LeafletMap } from './LeafletMap/LeafletMap';
import { Eat } from './Eat/Eat';

interface Props {
  contract: Contract | null;
}

const Customer: React.FC<Props> = ({ contract }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/*" element={<Restaurant />} />
        <Route path="/map" element={<LeafletMap />} />
        <Route path="/eat" element={<Eat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Customer;
