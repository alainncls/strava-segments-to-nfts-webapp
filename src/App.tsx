import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StravaLogin from './components/StravaLogin';

function App() {
  return (
    <Routes>
      <Route path="/oauth" element={<StravaLogin />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="about" element={<About />} />
       <Route path="features" element={<Dashboard />} />
       <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default App;
