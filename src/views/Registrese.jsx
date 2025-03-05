import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { registrarse } from "../store/authSlice";

const Registrese = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const formattedData = {
                nombre: data.nombre,
                contrasenia: data.contrasenia,
                correo: data.correo,
                roles: (Array.isArray(data.rol) ? data.rol : [data.rol]).map(role => ({ id: parseInt(role) }))
            };

            await dispatch(registrarse(formattedData));
            toast.success("Usuario registrado con éxito");
            navigate("/");
        } catch (error) {
            toast.error("Error al registrar usuario");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
                <h2 className="text-center">Registro de Usuario</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            {...register("nombre", { required: "El nombre es obligatorio" })}
                        />
                        {errors.nombre && <p className="text-danger">{errors.nombre.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-control"
                            {...register("correo", {
                                required: "El correo es obligatorio",
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: "Formato de correo inválido",
                                },
                            })}
                        />
                        {errors.correo && <p className="text-danger">{errors.correo.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            {...register("contrasenia", { required: "La contraseña es obligatoria" })}
                        />
                        {errors.contrasenia && <p className="text-danger">{errors.contrasenia.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Rol</label>
                        <select
                            className="form-control"
                            multiple
                            {...register("rol", { required: "Seleccione al menos un rol" })}
                        >
                            <option value="1">Administrador</option>
                            <option value="2">Usuario</option>
                        </select>
                        {errors.rol && <p className="text-danger">{errors.rol.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Registrar</button>
                </form>
            </div>
        </div>
    );
};

export default Registrese;
