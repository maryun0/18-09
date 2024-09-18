const urlBase = "http://localhost:4000/autor";

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
        throw new Error('Erro ao consultar autores.');
    }

    const data = await response.json();
    return data.listaAutores;
};

export const gravar = async (autor, token) => {
    const response = await fetch(urlBase, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao gravar autor.');
    }

    const data = await response.json();
    return data;
};

export const alterar = async (autor, token) => {
    const response = await fetch(urlBase, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(autor),
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Erro ao alterar autor.');
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
        throw new Error('Erro ao excluir autor.');
    }

    const data = await response.json();
    return data;
};
