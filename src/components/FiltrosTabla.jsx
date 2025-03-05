import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { obtenerTarea } from "../store/tasksSlice.jsx";
import { useTranslation } from 'react-i18next'; // Importamos useTranslation

const FiltrosTabla = () => {
    const { t } = useTranslation(); // Inicializamos useTranslation
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.tarea);

    const onSubmit = (data) => {
        data.paginaActual = 1;
        data.numeroFilas = formData.numeroFilas;
        dispatch(obtenerTarea(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-4 bg-white p-6 rounded-lg mx-auto">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">{t('filtersTable.title')}</label>
                    <input type="text" {...register("titulo")} defaultValue={formData.titulo}
                           className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">{t('filtersTable.description')}</label>
                    <input type="text" {...register("descripcion")} defaultValue={formData.descripcion}
                           className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">{t('filtersTable.status')}</label>
                    <select {...register("estado")} defaultValue={formData.estado}
                            className="w-full mt-1 p-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none">
                        <option value="0">{t('filtersTable.select')}</option>
                        <option value="1">{t('filtersTable.pending')}</option>
                        <option value="2">{t('filtersTable.inProgress')}</option>
                        <option value="3">{t('filtersTable.completed')}</option>
                    </select>
                </div>
                <div className="flex-1">
                    <br />
                    <button type="submit"
                            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">{t('filtersTable.filter')}</button>
                </div>
            </div>
        </form>
    );
};

export default FiltrosTabla;
