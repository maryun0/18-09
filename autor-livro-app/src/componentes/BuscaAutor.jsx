// src/componentes/BuscaAutor.js
import React, { useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';

const BuscaAutor = ({ autores, aoSelecionarAutor }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [autoresFiltrados, setAutoresFiltrados] = useState([]);

  const handleChange = (e) => {
    const termo = e.target.value;
    setTermoBusca(termo);
    if (termo) {
      const filtrados = autores.filter((autor) =>
        autor.nome.toLowerCase().includes(termo.toLowerCase())
      );
      setAutoresFiltrados(filtrados);
    } else {
      setAutoresFiltrados([]);
    }
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="Buscar autor..."
        value={termoBusca}
        onChange={handleChange}
      />
      {autoresFiltrados.length > 0 && (
        <ListGroup className="mt-2">
          {autoresFiltrados.map((autor) => (
            <ListGroup.Item
              key={autor.id}
              action
              onClick={() => {
                aoSelecionarAutor(autor);
                setAutoresFiltrados([]);
                setTermoBusca('');
              }}
            >
              {autor.nome}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default BuscaAutor;
