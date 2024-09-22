import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

const FormCadLivro = ({ onGravar, livroSelecionado, setLivroSelecionado }) => {
    const [titulo, setTitulo] = useState('');
    const [isbn, setIsbn] = useState('');
    const [dataPublicacao, setDataPublicacao] = useState('');
    const [autorCodigo, setAutorCodigo] = useState('');

    useEffect(() => {
        if (livroSelecionado) {
            setTitulo(livroSelecionado.titulo);
            setIsbn(livroSelecionado.isbn);
            setDataPublicacao(livroSelecionado.dataPublicacao);
            setAutorCodigo(livroSelecionado.autor.codigo);
        } else {
            setTitulo('');
            setIsbn('');
            setDataPublicacao('');
            setAutorCodigo('');
        }
    }, [livroSelecionado]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGravar({
            codigo: livroSelecionado ? livroSelecionado.codigo : undefined,
            titulo,
            isbn,
            dataPublicacao,
            autor: { codigo: autorCodigo }
        });
        setTitulo('');
        setIsbn('');
        setDataPublicacao('');
        setAutorCodigo('');
        setLivroSelecionado(null);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTituloLivro">
                <Form.Label>Título</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o título do livro"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formIsbnLivro">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Digite o ISBN do livro"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formDataPublicacaoLivro">
                <Form.Label>Data de Publicação</Form.Label>
                <Form.Control
                    type="date"
                    value={dataPublicacao}
                    onChange={(e) => setDataPublicacao(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formAutorLivro">
                <Form.Label>Código do Autor</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Digite o código do autor"
                    value={autorCodigo}
                    onChange={(e) => setAutorCodigo(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {livroSelecionado ? 'Atualizar Livro' : 'Adicionar Livro'}
            </Button>
        </Form>
    );
};

export default FormCadLivro;
