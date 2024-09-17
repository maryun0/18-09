// src/componentes/FormularioAutor.js
import React, { useState } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';

const FormularioAutor = ({ autores, setAutores }) => {
  const [nomeAutor, setNomeAutor] = useState('');
  const [autorEditando, setAutorEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const iniciarEdicao = (autor) => {
    setAutorEditando(autor);
    setNomeAutor(autor.nome);
    setShowModal(true);
  };

  const salvarEdicao = () => {
    if (nomeAutor.trim() === '') {
      alert('Por favor, insira o nome do autor.');
      return;
    }

    const autoresAtualizados = autores.map((autor) =>
      autor.id === autorEditando.id ? { ...autor, nome: nomeAutor.trim() } : autor
    );

    setAutores(autoresAtualizados);
    cancelarEdicao();
  };

  const cancelarEdicao = () => {
    setAutorEditando(null);
    setNomeAutor('');
    setShowModal(false);
  };

  const excluirAutor = (id) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este autor?');
    if (confirmacao) {
      const autoresAtualizados = autores.filter((autor) => autor.id !== id);
      setAutores(autoresAtualizados);
    }
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.nome}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => iniciarEdicao(autor)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => excluirAutor(autor.id)}>
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para edição */}
      <Modal show={showModal} onHide={cancelarEdicao}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Autor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditarNomeAutor">
              <Form.Label>Nome do Autor:</Form.Label>
              <Form.Control
                type="text"
                value={nomeAutor}
                onChange={(e) => setNomeAutor(e.target.value)}
              />
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

export default FormularioAutor;
