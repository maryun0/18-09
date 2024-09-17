// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './componentes/Login';
import FormularioAutor from './componentes/FormularioAutor';
import FormularioLivro from './componentes/FormularioLivro';
import { Container, Button, Navbar, Nav } from 'react-bootstrap';

const App = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAutenticado(true);
    }
  }, []);

  const aoLogar = () => {
    setAutenticado(true);
  };

  const aoDeslogar = () => {
    localStorage.removeItem('token');
    setAutenticado(false);
  };

  return (
    <div>
      {autenticado ? (
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#">Sistema de Livros</Navbar.Brand>
            <Nav className="ml-auto">
              <Button variant="outline-light" onClick={aoDeslogar}>
                Logout
              </Button>
            </Nav>
          </Navbar>
          <Container>
            <FormularioAutor autores={autores} setAutores={setAutores} />
            <FormularioLivro autores={autores} />
          </Container>
        </>
      ) : (
        <Login aoLogar={aoLogar} />
      )}
    </div>
  );
};

export default App;
