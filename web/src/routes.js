import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import Agendamentos from './pages/Agendamentos';
import Clientes from './pages/Clientes';

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
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
};

export default routes;
