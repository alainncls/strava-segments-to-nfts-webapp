import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import StravaLogin from './screens/StravaLogin/StravaLogin';

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
