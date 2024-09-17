// src/componentes/GerenciarAutores.js
import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const GerenciarAutores = ({ autores, setAutores }) => {
  const [nomeAutor, setNomeAutor] = useState('');

  const adicionarAutor = (e) => {
    e.preventDefault();
    if (nomeAutor.trim() === '') {
      alert('Por favor, insira o nome do autor.');
      return;
    }

    const novoAutor = {
      id: autores.length + 1,
      nome: nomeAutor.trim(),
    };

    setAutores([...autores, novoAutor]);
    setNomeAutor('');
  };

  return (
    <div className="mt-4">
      <h3>Gerenciar Autores</h3>
      <Form onSubmit={adicionarAutor}>
        <Form.Group controlId="formNomeAutor">
          <Form.Label>Nome do Autor:</Form.Label>
          <Form.Control
            type="text"
            value={nomeAutor}
            onChange={(e) => setNomeAutor(e.target.value)}
            placeholder="Digite o nome do autor"
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Adicionar Autor
        </Button>
      </Form>
      <h4 className="mt-4">Autores Cadastrados</h4>
      <ListGroup>
        {autores.map((autor) => (
          <ListGroup.Item key={autor.id}>{autor.nome}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default GerenciarAutores;
