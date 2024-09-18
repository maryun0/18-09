import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TabelaLivros = ({ livros, onEditar, onExcluir }) => {
    return (
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
                {livros.map((livro) => (
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
    );
};

export default TabelaLivros;
