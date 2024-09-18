import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const FormCadAutor = ({ onGravar, autorSelecionado, setAutorSelecionado }) => {
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (autorSelecionado) {
            setNome(autorSelecionado.nome);
        } else {
            setNome('');
        }
    }, [autorSelecionado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGravar({ codigo: autorSelecionado ? autorSelecionado.codigo : undefined, nome });
        setNome('');
        setAutorSelecionado(null); 
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNomeAutor">
                <Form.Label>Nome do Autor</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o nome do autor"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {autorSelecionado ? 'Atualizar Autor' : 'Adicionar Autor'}
            </Button>
        </Form>
    );
};

export default FormCadAutor;
