const urlBase = 'http://localhost:4000/livro';

export const consultarTodos = async (token) => {
    const response = await fetch(urlBase, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao consultar livros.');
    }

    const data = await response.json();
    return data.listaLivros;
};

export const gravar = async (livro, token) => {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar livro.');
    }

    const data = await response.json();
    return data;
};

export const alterar = async (livro, token) => {
    const response = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(livro),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar livro.');
    }

    const data = await response.json();
    return data;
};

export const excluir = async (codigo, token) => {
    const response = await fetch(urlBase, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ codigo }),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao excluir livro.');
    }

    const data = await response.json();
    return data;
};
