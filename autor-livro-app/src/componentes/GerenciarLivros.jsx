import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FormCadLivro from './Formularios/FormCadLivro';
import TabelaLivros from './Tabelas/TabelaLivros';
import Pagina from './Templates/Pagina';
import { ContextoUsuarioLogado } from '../App';
import { consultarTodos, gravar, alterar, excluir } from '../servicos/livroService';

const GerenciarLivros = () => {
    const [livros, setLivros] = useState([]);
    const [livroSelecionado, setLivroSelecionado] = useState(null); // Para edição
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState(''); // success ou danger
    const { token } = useContext(ContextoUsuarioLogado); // Token de autenticação

    useEffect(() => {
        carregarLivros();
    }, []);

    const carregarLivros = async () => {
        try {
            const resultado = await consultarTodos(token);
            setLivros(resultado);
        } catch (erro) {
            setMensagem('Erro ao carregar livros.');
            setTipoMensagem('danger');
        }
    };

    const handleGravar = async (dadosLivro) => {
        try {
            if (livroSelecionado) {
                await alterar(dadosLivro, token);
                setMensagem('Livro atualizado com sucesso!');
            } else {
                await gravar(dadosLivro, token);
                setMensagem('Livro gravado com sucesso!');
            }
            setTipoMensagem('success');
            carregarLivros();
            setLivroSelecionado(null); // Limpar seleção após gravar
        } catch (erro) {
            setMensagem('Erro ao gravar livro.');
            setTipoMensagem('danger');
        }
    };

    const handleEditar = (livro) => {
        setLivroSelecionado(livro); // Selecionar livro para edição
    };

    const handleExcluir = async (codigo) => {
        try {
            await excluir(codigo, token);
            setMensagem('Livro excluído com sucesso!');
            setTipoMensagem('success');
            carregarLivros();
        } catch (erro) {
            setMensagem('Erro ao excluir livro.');
            setTipoMensagem('danger');
        }
    };

    return (
        <Pagina titulo="Gerenciar Livros">
            {mensagem && <Alert variant={tipoMensagem}>{mensagem}</Alert>}
            
            <FormCadLivro 
                onGravar={handleGravar} 
                livroSelecionado={livroSelecionado} 
                setLivroSelecionado={setLivroSelecionado}
            />

            <TabelaLivros 
                livros={livros} 
                onEditar={handleEditar} 
                onExcluir={handleExcluir} 
            />
        </Pagina>
    );
};

export default GerenciarLivros;
