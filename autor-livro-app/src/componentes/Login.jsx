// src/componentes/Login.js
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const Login = ({ aoLogar }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de autenticação
    if (usuario === 'admin' && senha === '1234') {
      const tokenSimulado = 'token_simulado';
      localStorage.setItem('token', tokenSimulado);
      aoLogar();
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

            <Button variant="primary" type="submit" block>
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
