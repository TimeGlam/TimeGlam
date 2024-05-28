import logo from '../../assets/timeglamLogo.png';
import { Link, useLocation } from 'react-router-dom';
import MemberIcon from '@rsuite/icons/Member';

function SideBar() {
    const location = useLocation();

    return (
        <sidebar className="col-2 h-100">
            <img src={logo} className="img-fluid px-3 py-4" alt="Logo" />
            <ul className="p-0 m-0">
                <li>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        <span className="mdi mdi-calendar-multiselect"></span>
                        <span> Agendamentos</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/clientes"
                        className={
                            location.pathname === '/clientes' ? 'active' : ''
                        }
                    >
                        <span className="mdi mdi-account-group-outline"></span>
                        <span> Clientes</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/colaboradores"
                        className={
                            location.pathname === '/colaboradores'
                                ? 'active'
                                : ''
                        }
                    >
                        <span className="mdi mdi-account-hard-hat"></span>
                        <span> Colaboradores</span>
                    </Link>
                </li>
            </ul>
        </sidebar>
    );
}

export default SideBar;
