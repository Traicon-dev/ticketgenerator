import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import QrCodeGenerator from './components/QrCodeGenerator';
import QrCodeDownload from './components/QrCodeDownload';
import NavBar from './components/NavBar';


function App() {
  return (
    <div>
          <Router>
      <NavBar/>
   <Routes>
   <Route path="/dcis2025/philippines/ticket_generator" element={<QrCodeGenerator />} />
        <Route path="/downloadqr" element={<QrCodeDownload />} />
        </Routes>
        </Router>
    </div>
  );
}

export default App;
