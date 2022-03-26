import React, { useState } from 'react';
import { Contract, User } from '../../types/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from '../../components/Customer/Nav/Nav';
import { Footer } from '../../components/Customer/Footer/Footer';

//pages
import { Home } from './Home/Home';
import { Restaurant } from './Restaurant/Restaurant';
import { LeafletMap } from './LeafletMap/LeafletMap';
import { Eat } from './Eat/Eat';

interface Props {
  contract: Contract | null;
}

const Customer: React.FC<Props> = ({ contract }) => {
  const [user, setUser] = useState<User>({ login: false });

  return (
    <>
      <Nav user={user} setUser={setUser} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/*" element={<Restaurant />} />
          <Route path="/map" element={<LeafletMap />} />
          <Route path="/eat" element={<Eat />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Customer;
