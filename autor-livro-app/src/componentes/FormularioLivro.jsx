// src/componentes/FormularioLivro.js
import React, { useState } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import BuscaAutor from './BuscaAutor';

const FormularioLivro = ({ autores }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState(null);
  const [livros, setLivros] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!autor) {
      alert('Por favor, selecione um autor.');
      return;
    }

    if (titulo.trim() === '') {
      alert('Por favor, insira o título do livro.');
      return;
    }

    const novoLivro = {
      id: livros.length + 1,
      titulo: titulo.trim(),
      autorId: autor.id,
      autorNome: autor.nome,
    };

    setLivros([...livros, novoLivro]);
    setTitulo('');
    setAutor(null);
    alert('Livro cadastrado com sucesso!');
  };

  return (
    <div className="mt-5">
      <h3>Cadastrar Livro</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTituloLivro">
          <Form.Label>Título do Livro:</Form.Label>
          <Form.Control
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o título do livro"
          />
        </Form.Group>
        <Form.Group controlId="formAutorLivro">
          <Form.Label>Autor:</Form.Label>
          <BuscaAutor autores={autores} aoSelecionarAutor={setAutor} />
          {autor && (
            <p className="mt-2">
              <strong>Autor selecionado:</strong> {autor.nome}
            </p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar Livro
        </Button>
      </Form>
      <h4 className="mt-4">Livros Cadastrados</h4>
      <ListGroup>
        {livros.map((livro) => (
          <ListGroup.Item key={livro.id}>
            <strong>{livro.titulo}</strong> - {livro.autorNome}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default FormularioLivro;
