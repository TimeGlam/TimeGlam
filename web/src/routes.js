import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import Agendamentos from './pages/Agendamentos';
import Clientes from './pages/Clientes';
import Colaboradores from './pages/Colaboradores/Index';
import Servicos from './pages/Servicos/index';
import Horarios from './pages/horarios/index';
const routes = () => {
    return (
        <>
            <Header />
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <BrowserRouter>
                        <SideBar />
                        <Routes>
                            <Route path="/" exact Component={Agendamentos} />
                            <Route
                                path="/clientes"
                                exact
                                Component={Clientes}
                            />
                            <Route
                                path="/colaboradores"
                                exact
                                Component={Colaboradores}
                            />
                            <Route
                                path="/servicos"
                                exact
                                Component={Servicos}
                            />
                            <Route
                                path="/horarios"
                                exact
                                Component={Horarios}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
};

export default routes;
