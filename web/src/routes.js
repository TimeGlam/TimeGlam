// src/routes.js

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './styles.css';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import Agendamentos from './pages/Agendamentos';
import Clientes from './pages/Clientes';
import Colaboradores from './pages/Colaboradores/Index';
import Servicos from './pages/Servicos/index';
import Horarios from './pages/horarios/index';
import Login from './pages/Login/index';

const AppRoutes = () => {
    const { token } = useSelector((state) => state.auth);

    return (
        <BrowserRouter>
            {token && <Header />}
            <div className="container-fluid h-100">
                <div className="row h-100">
                    {token && <SideBar />}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/"
                            element={
                                token ? (
                                    <Agendamentos />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/clientes"
                            element={
                                token ? <Clientes /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/colaboradores"
                            element={
                                token ? (
                                    <Colaboradores />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/servicos"
                            element={
                                token ? <Servicos /> : <Navigate to="/login" />
                            }
                        />
                        <Route
                            path="/horarios"
                            element={
                                token ? <Horarios /> : <Navigate to="/login" />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;
