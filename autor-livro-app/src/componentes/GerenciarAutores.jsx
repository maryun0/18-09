import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import FormCadAutor from './Formularios/FormCadAutor';
import TabelaAutores from './Tabelas/TabelaAutores';
import Pagina from './Templates/Pagina';
import { ContextoUsuarioLogado } from '../App';
import { consultarTodos, gravar, alterar, excluir } from '../servicos/autorService';

const GerenciarAutores = () => {
    const [autores, setAutores] = useState([]);
    const [autorSelecionado, setAutorSelecionado] = useState(null); 
    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState(''); 
    const { token } = useContext(ContextoUsuarioLogado); 

    useEffect(() => {
        carregarAutores();
    }, []);

    const carregarAutores = async () => {
        try {
            const resultado = await consultarTodos(token);
            setAutores(resultado);
        } catch (erro) {
            setMensagem('Erro ao carregar autores.');
            setTipoMensagem('danger');
        }
    };

    const handleGravar = async (dadosAutor) => {
        try {
            if (autorSelecionado) {
                await alterar(dadosAutor, token);
                setMensagem('Autor atualizado com sucesso!');
            } else {
                await gravar(dadosAutor, token);
                setMensagem('Autor gravado com sucesso!');
            }
            setTipoMensagem('success');
            carregarAutores();
            setAutorSelecionado(null); 
        } catch (erro) {
            setMensagem('Erro ao gravar autor.');
            setTipoMensagem('danger');
        }
    };

    const handleEditar = (autor) => {
        setAutorSelecionado(autor); 
    };

    const handleExcluir = async (codigo) => {
        try {
            await excluir(codigo, token);
            setMensagem('Autor excluído com sucesso!');
            setTipoMensagem('success');
            carregarAutores();
        } catch (erro) {
            setMensagem('Erro ao excluir autor.');
            setTipoMensagem('danger');
        }
    };

    return (
        <Pagina titulo="Gerenciar Autores">
            {mensagem && <Alert variant={tipoMensagem}>{mensagem}</Alert>}
            
            <FormCadAutor 
                onGravar={handleGravar} 
                autorSelecionado={autorSelecionado} 
                setAutorSelecionado={setAutorSelecionado}
            />

            <TabelaAutores 
                autores={autores} 
                onEditar={handleEditar} 
                onExcluir={handleExcluir} 
            />
        </Pagina>
    );
};

export default GerenciarAutores;
