import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/authSlice";
import { setLoading } from "../store/loadingSlice";
import { Button, Card, CardBody, CardHeader, CardTitle } from "react-bootstrap";
import Loading from "../components/Loading.jsx";
import { useTranslation } from "react-i18next";

export default function Login() {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.loading);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/tareas"); // Redirige a tareas si el usuario ya está autenticado
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        dispatch(setLoading(true));
        try {
            const result = await dispatch(loginUser(data)).unwrap();
            if (result.token) navigate("/tareas");
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <>
            {isLoading && <Loading />}
            <h2>{t("home.welcome")}</h2>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <Card className="w-96 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-center">{t("login.loginButton")}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-group">
                                <input type="text" className="form-control"
                                       placeholder={t("login.username")} {...register("username", { required: t("login.username") })} />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"
                                       placeholder={t("login.password")} {...register("password", { required: t("login.password") })} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? t("login.loading") : t("login.loginButton")}
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
