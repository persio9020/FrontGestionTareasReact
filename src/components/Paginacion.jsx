import {useDispatch, useSelector} from "react-redux";
import {obtenerTarea} from "../store/tasksSlice";

const Paginacion = () => {
    const dispatch = useDispatch();

    const {paginaActual, totalPaginas, titulo, descripcion, estado, numeroFilas} = useSelector(state => state.tarea);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            const datos = {
                titulo: titulo,
                descripcion: descripcion,
                estado: estado,
                paginaActual: nuevaPagina,
                numeroFilas: numeroFilas
            }
            dispatch(obtenerTarea(datos));
        }
    };

    return (
        <nav>
            <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => cambiarPagina(paginaActual - 1)}>
                        Anterior
                    </button>
                </li>

                {[...Array(totalPaginas)].map((_, index) => (
                    <li key={index} className={`page-item ${paginaActual === index + 1 ? "active" : ""}`}>
                        <button className="page-link" onClick={() => cambiarPagina(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => cambiarPagina(paginaActual + 1)}>
                        Siguiente
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Paginacion;