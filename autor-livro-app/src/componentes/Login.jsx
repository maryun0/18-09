// src/componentes/Login.jsx
import React, { useState, useContext } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const { setUsuarioLogado } = useContext(ContextoUsuarioLogado);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (usuario === 'admin' && senha === '1234') {
      setUsuarioLogado({ nome: 'Administrador' });
      localStorage.setItem('token', 'token_simulado');
      navigate('/autores');
    } else {
      alert('Usuário ou senha inválidos.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formUsuario">
              <Form.Label>Usuário:</Form.Label>
              <Form.Control
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite seu usuário"
              />
            </Form.Group>

            <Form.Group controlId="formSenha">
              <Form.Label>Senha:</Form.Label>
              <Form.Control
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
