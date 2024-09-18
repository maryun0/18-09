// src/App.js
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GerenciarAutores from './componentes/GerenciarAutores.jsx';
import GerenciarLivros from './componentes/GerenciarLivros.jsx';
import Login from './componentes/Login';

export const ContextoUsuarioLogado = createContext();

const App = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  return (
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <Router>
        <Routes>
          {/* Altere o caminho de /autor para /autores */}
          <Route path="/autores" element={<GerenciarAutores />} />
          
          {/* Altere o caminho de /livro para /livros */}
          <Route path="/livros" element={<GerenciarLivros />} />
          
          {/* Definir a rota de login na raiz */}
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ContextoUsuarioLogado.Provider>
  );
};

export default App;
