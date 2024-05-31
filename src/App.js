import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FormScreen from './components/FormScreen';
import DataScreen from './components/DataScreen';

function App() {
  const [formData, setFormData] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FormScreen setFormData={setFormData} />} />
          <Route 
            path="/data" 
            element={formData ? <DataScreen formData={formData} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
