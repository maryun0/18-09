// src/componentes/FormularioLivro.js
import React, { useState } from 'react';
import { Form, Button, ListGroup, Modal } from 'react-bootstrap';
import BuscaAutor from './BuscaAutor';

const FormularioLivro = ({ autores }) => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState(null);
  const [livros, setLivros] = useState([]);
  const [livroEditando, setLivroEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const iniciarEdicao = (livro) => {
    setLivroEditando(livro);
    setTitulo(livro.titulo);
    const autorSelecionado = autores.find((a) => a.id === livro.autorId);
    setAutor(autorSelecionado);
    setShowModal(true);
  };

  const salvarEdicao = () => {
    if (!autor) {
      alert('Por favor, selecione um autor.');
      return;
    }

    if (titulo.trim() === '') {
      alert('Por favor, insira o título do livro.');
      return;
    }

    const livrosAtualizados = livros.map((livro) =>
      livro.id === livroEditando.id
        ? { ...livro, titulo: titulo.trim(), autorId: autor.id, autorNome: autor.nome }
        : livro
    );

    setLivros(livrosAtualizados);
    cancelarEdicao();
  };

  const cancelarEdicao = () => {
    setLivroEditando(null);
    setTitulo('');
    setAutor(null);
    setShowModal(false);
  };

  const excluirLivro = (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este livro?');
    if (confirmacao) {
      const livrosAtualizados = livros.filter((livro) => livro.id !== id);
      setLivros(livrosAtualizados);
    }
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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{livro.titulo}</strong> - {livro.autorNome}
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => iniciarEdicao(livro)}
                  className="mr-2"
                >
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => excluirLivro(livro.id)}>
                  Excluir
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal para edição */}
      <Modal show={showModal} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditarTituloLivro">
              <Form.Label>Título do Livro:</Form.Label>
              <Form.Control
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              /> 
            </Form.Group>
            <Form.Group controlId="formEditarAutorLivro">
              <Form.Label>Autor:</Form.Label>
              <BuscaAutor autores={autores} aoSelecionarAutor={setAutor} />
              {autor && (
                <p className="mt-2">
                  <strong>Autor selecionado:</strong> {autor.nome}
                </p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarEdicao}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={salvarEdicao}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FormularioLivro;
