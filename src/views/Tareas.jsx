import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eliminar, listarUsuarios, obtenerTarea, obtenerTareaPorId } from "../store/tasksSlice";
import { setLoading } from "../store/loadingSlice";
import FiltrosTabla from "../components/FiltrosTabla";
import Paginacion from "../components/Paginacion";
import ModalTarea from "../components/ModalTarea";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import { useTranslation } from 'react-i18next';

export function Tareas() {
    const { t } = useTranslation(); // Inicializamos la traducción
    const dispatch = useDispatch();
    const { tareas, ...formData } = useSelector((state) => state.tarea);
    const { tareaSeleccionada } = useSelector((state) => state.tarea);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(setLoading(true));
        try {
            dispatch(obtenerTarea(formData));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const toggleModal = () => setModal(!modal);

    const handleEditar = (id) => {
        try {
            dispatch(setLoading(true));
            dispatch(obtenerTareaPorId(id));
            toggleModal();
        } catch (error) {
            console.error("Error al editar la tarea:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleEliminar = (id) => {
        if (window.confirm(t('confirmDelete'))) {
            dispatch(eliminar(id));
            toast.warn(t('taskDeleted'));
        }
    };

    const handleCrear = async () => {
        await dispatch(listarUsuarios());
        toggleModal();
    };

    return (
        <>

            <div className="container mt-4">
                <h2 className="text-center">{t('taskManagement')}</h2>
                <div className="d-flex justify-content-end mb-3">
                    <Button color="success" onClick={handleCrear}>{t('createTask')}</Button>
                </div>
                <FiltrosTabla />
                <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                        <thead>
                        <tr>
                            <th>{t('table.title')}</th>
                            <th>{t('table.description')}</th>
                            <th>{t('table.creationDate')}</th>
                            <th>{t('table.status')}</th>
                            <th>{t('table.user')}</th>
                            <th>{t('table.actions')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tareas?.length > 0 ? (
                            tareas.map((tarea) => (
                                <tr key={tarea.id}>
                                    <td>{tarea.titulo}</td>
                                    <td>{tarea.descripcion}</td>
                                    <td>{tarea.fechaCreacion}</td>
                                    <td>{tarea.nombreEstado}</td>
                                    <td>{tarea.nombreUsuario}</td>
                                    <td>
                                        <Button color="success" className="me-2" onClick={() => handleEditar(tarea.id)}>{t('edit')}</Button>
                                        <Button color="danger" onClick={() => handleEliminar(tarea.id)}>{t('delete')}</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">{t('noTasksAvailable')}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                <Paginacion />
            </div>
            <ModalTarea isOpen={modal} toggle={toggleModal} tarea={tareaSeleccionada} />
        </>
    );
}
