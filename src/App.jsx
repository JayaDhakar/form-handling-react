import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FormHandle from './pages/form';
import DisplayForm from './pages/displayForm';

function App() {
  const [formState, setFormState] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormHandle setFormState={setFormState} />} />
        <Route path="/displayForm" element={<DisplayForm formState={formState} />} />
      </Routes>
    </Router>
  );
}

export default App;
