import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CadastroUser from './components/CadastroUser';
import CadastroProduto from './components/CadastroProduto';
import Venda from './components/Venda';
import Menu from './menu'; // Import the Menu component


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Menu /> {/* Add the Menu component here */}
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/cadastro-usuario" element={<CadastroUser />} />
              <Route path="/cadastro-produto" element={<CadastroProduto />} />
              <Route path="/venda" element={<Venda />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();