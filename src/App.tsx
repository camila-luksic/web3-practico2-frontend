import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./navigation/routerConfig"; // (ajusta si está en otro path)
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa JS de Bootstrap (incluye Popper.js)
function App() {
  return (
    <BrowserRouter>
    <RouterConfig />
  </BrowserRouter>
  );
}

export default App;
