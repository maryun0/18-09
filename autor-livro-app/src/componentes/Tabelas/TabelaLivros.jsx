import React, { useState } from 'react';
import { Table, Button, Form, FormControl } from 'react-bootstrap';

const TabelaLivros = ({ livros, onEditar, onExcluir }) => {
    const [termoBusca, setTermoBusca] = useState('');

    // Função para filtrar os livros com base no termo de busca
    const livrosFiltrados = livros.filter((livro) => {
        const termo = termoBusca.toLowerCase();
        return (
            livro.titulo.toLowerCase().includes(termo) ||
            (livro.autor?.nome.toLowerCase().includes(termo))
        );
    });

    return (
        <>
            <Form inline className="mb-3">
                <FormControl
                    type="text"
                    placeholder="Pesquisar por título ou autor"
                    className="mr-sm-2"
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                />
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Título</th>
                        <th>ISBN</th>
                        <th>Data de Publicação</th>
                        <th>Autor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {livrosFiltrados.map((livro) => (
                        <tr key={livro.codigo}>
                            <td>{livro.codigo}</td>
                            <td>{livro.titulo}</td>
                            <td>{livro.isbn}</td>
                            <td>{livro.dataPublicacao}</td>
                            <td>{livro.autor?.nome}</td>
                            <td>
                                <Button variant="warning" onClick={() => onEditar(livro)}>
                                    Editar
                                </Button>{' '}
                                <Button variant="danger" onClick={() => onExcluir(livro.codigo)}>
                                    Excluir
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TabelaLivros;
