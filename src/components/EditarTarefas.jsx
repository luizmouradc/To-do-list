import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editarTarefas } from '../features/controleTarefas';

const EditarTarefas = ({ tarefa }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [titulo, setTitulo] = useState(tarefa.titulo);
    const [descricao, setDescricao] = useState(tarefa.descricao);
    const [status, setStatus] = useState(tarefa.status);
    const dispatch = useDispatch();

    useEffect(() => {
        setStatus(tarefa.status);
    }, [tarefa.status]);

    const handleEdit = () => {
        dispatch(editarTarefas({
            id: tarefa.id,
            titulo,
            descricao,
            status
        }));
        setIsEditing(false);
    };

    const handleClose = () => {
        setIsEditing(false);
    };

    return (
        <>
            <button className="editar-btn" onClick={() => setIsEditing(true)}>Editar</button>

            {isEditing && (
                <div className="modal-overlay" onClick={handleClose}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Editar Tarefa</h2>
                        <div className="modal-body">
                            <label>Título:</label>
                            <input
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
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
                        </div>
                        <div className="modal-footer">
                            <button className="salvar-btn" onClick={handleEdit}>Salvar</button>
                            <button className="cancelar-btn" onClick={handleClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditarTarefas;
