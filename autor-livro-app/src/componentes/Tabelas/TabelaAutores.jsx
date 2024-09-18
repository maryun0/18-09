import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TabelaAutores = ({ autores, onEditar, onExcluir }) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {autores.map((autor) => (
                    <tr key={autor.codigo}>
                        <td>{autor.codigo}</td>
                        <td>{autor.nome}</td>
                        <td>
                            <Button variant="warning" onClick={() => onEditar(autor)}>
                                Editar
                            </Button>{' '}
                            <Button variant="danger" onClick={() => onExcluir(autor.codigo)}>
                                Excluir
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TabelaAutores;
