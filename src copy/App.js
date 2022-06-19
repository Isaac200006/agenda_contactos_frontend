import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Componentes
import Contactos from './components/Contacto';
import NuevoContacto from './components/NuevoContacto';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact path="/"
          element={<Contactos />}
        />

        <Route
          exact path="/nuevo"
          element={<NuevoContacto />}
        />

        <Route
          path="/contactos/:id/editar"
          element={<NuevoContacto />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
