// src/componentes/Templates/Pagina.js
import React, { useContext } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../App';
import { useNavigate } from 'react-router-dom';

const Pagina = ({ children }) => {
  const { usuarioLogado, setUsuarioLogado } = useContext(ContextoUsuarioLogado);
  const navigate = useNavigate();

  const aoDeslogar = () => {
    setUsuarioLogado(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-4">
        <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Sistema de Livros
        </Navbar.Brand>
        {usuarioLogado && (
          <Nav className="ml-auto">
            <Button variant="outline-light" onClick={() => navigate('/autores')} className="mr-2">
              Autores
            </Button>
            <Button variant="outline-light" onClick={() => navigate('/livros')} className="mr-2">
              Livros
            </Button>
            <Button variant="outline-light" onClick={aoDeslogar}>
              Logout
            </Button>
          </Nav>
        )}
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Pagina;
