import React, { useState, useEffect } from 'react';

const ModalEditarForm = ({ tarefa, onSalvar, onCancelar }) => {
    const [titulo, setTitulo] = useState(tarefa.titulo);
    const [descricao, setDescricao] = useState(tarefa.descricao);
    const [status, setStatus] = useState(tarefa.status);

    useEffect(() => {
        setStatus(tarefa.status);
    }, [tarefa.status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSalvar({
            id: tarefa.id,
            titulo,
            descricao,
            status
        });
    };

    return (
        <form onSubmit={handleSubmit} className="modal-body">
            <label>Título:</label>
            <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />
            <label>Descrição:</label>
            <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
            />
            <label>Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="A Fazer">A Fazer</option>
                <option value="Em Progresso">Em Progresso</option>
                <option value="Concluída">Concluída</option>
            </select>
            <div className="modal-footer">
                <button type="submit" className="salvar-btn">Salvar</button>
                <button type="button" className="cancelar-btn" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
};

export default ModalEditarForm;
