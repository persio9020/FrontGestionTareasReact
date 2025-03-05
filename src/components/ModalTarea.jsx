import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { agregar, actualizar, setId } from "../store/tasksSlice";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label } from "reactstrap";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next'; // Importamos useTranslation

const estados = [
    { id: 1, nombre: "Pendiente" },
    { id: 2, nombre: "En proceso" },
    { id: 3, nombre: "Completado" }
];

const ModalTarea = ({ isOpen, toggle, tarea }) => {
    const { t } = useTranslation(); // Inicializamos useTranslation
    const dispatch = useDispatch();
    const usuarios = useSelector(state => state.tarea.usuarios) || [];

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const valoresIniciales = {
        id: null,
        titulo: "",
        descripcion: "",
        fechaCreacion: new Date().toISOString().split("T")[0],
        estadoId: 1,
        usuarioId: ""
    };
    useEffect(() => {
        reset(tarea?.id ? tarea : valoresIniciales);
    }, [tarea, reset]);

    const onSubmit = (data) => {
        if (tarea?.id) {
            data.id = tarea.id;
            dispatch(actualizar({ tarea: data, id: tarea.id }));
        } else {
            delete data.id;
            dispatch(agregar(data));
        }
        toggle();
        toast.info(t('taskModal.saveTask'));
    };
    const cerrar = ()=> {
        dispatch(setId(null));
        reset(valoresIniciales);
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} onClosed={()=>cerrar()}>
            <ModalHeader toggle={toggle}>{t(`taskModal.${tarea?.id ? "editTask" : "createTask"}`)}</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup>
                        <Label for="titulo">{t('taskModal.title')}</Label>
                        <input type="text" className="form-control" {...register("titulo", { required: t('taskModal.requiredField') })} />
                        {errors.titulo && <div className="text-danger">{errors.titulo.message}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="descripcion">{t('taskModal.description')}</Label>
                        <textarea className="form-control" {...register("descripcion", { required: t('taskModal.requiredField') })}></textarea>
                        {errors.descripcion && <div className="text-danger">{errors.descripcion.message}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="fechaCreacion">{t('taskModal.creationDate')}</Label>
                        <input type="date" className="form-control" {...register("fechaCreacion", { required: t('taskModal.requiredField') })} />
                        {errors.fechaCreacion && <div className="text-danger">{errors.fechaCreacion.message}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="estadoId">{t('taskModal.status')}</Label>
                        <select className="form-control" {...register("estadoId", { required: t('taskModal.requiredField') })}>
                            {estados.map(estado => (
                                <option key={estado.id} value={estado.id}>{estado.nombre}</option>
                            ))}
                        </select>
                        {errors.estadoId && <div className="text-danger">{errors.estadoId.message}</div>}
                    </FormGroup>
                    <FormGroup>
                        <Label for="usuarioId">{t('taskModal.assignUser')}</Label>
                        <select className="form-control" {...register("usuarioId", { required: t('taskModal.requiredField') })} defaultValue="">
                            <option value="">{t('taskModal.selectUser')}</option>
                            {usuarios?.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                            ))}
                        </select>
                        {errors.usuarioId && <div className="text-danger">{errors.usuarioId.message}</div>}
                    </FormGroup>
                    <ModalFooter>
                        <Button color="primary" type="submit">{t(`taskModal.${tarea?.id ? "update" : "createTask"}`)}</Button>{" "}
                        <Button color="secondary" onClick={toggle}>{t('taskModal.cancel')}</Button>
                    </ModalFooter>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default ModalTarea;
