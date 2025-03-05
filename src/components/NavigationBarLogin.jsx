import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import Login from "../views/login";
import ProtectedRoute from "../config/ProtectedRoute";
import {useDispatch, useSelector} from "react-redux";
import {Tareas} from "../views/Tareas";
import Registrese from "../views/Registrese";
import {cerrarSesion} from "../store/authSlice.jsx";
import LangSelector from "./LangSelector.jsx";
import { useTranslation } from "react-i18next";

const NavigationBarLogin = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(cerrarSesion());
        history.push("/"); // Redirige a la página de login o inicio
    };

    return (
        <Router>
            <Navbar bg="light" variant="light" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">{t("navbar.home")}</Nav.Link>
                        <Nav.Link as={Link} to="/registrese">{t("navbar.register")}</Nav.Link>
                        {
                            user?.roles.map((rol) => {
                                if (rol === 'ROLE_ADMIN') {
                                    return <Nav.Link as={Link} key={rol} to="/tareas">{t("navbar.taskList")}</Nav.Link>;
                                }
                                if (rol === 'ROLE_USER') {
                                    return <Nav.Link as={Link} key={rol} to="/tareas">{t("navbar.taskList")}</Nav.Link>;
                                }
                            })
                        }
                    </Nav>
                    <Nav>
                        <LangSelector/>
                        {user && <button variant="outline-danger" onClick={handleLogout}>{t("navbar.logout")}</button>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route path="/registrese" element={<Registrese/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/tareas" element={<Tareas/>}/>
                </Route>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>
    );
};

export default NavigationBarLogin;
