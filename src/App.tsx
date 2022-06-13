import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './screens/Home/Home';
import StravaLogin from './screens/StravaLogin/StravaLogin';
import Login from './screens/Login/Login';

function App() {
  return (
    <Routes>
      <Route path="/oauth" element={<StravaLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="about" element={<About />} />
       <Route path="features" element={<Dashboard />} />
       <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default App;
