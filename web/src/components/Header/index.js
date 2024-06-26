import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            navigate('/login');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="container-fluid d-flex justify-content-end">
            <div className="d-flex align-items-center">
                <div className="text-align-right mr-3">
                    <span className="d-block m-0 p-0 text-white">TimeGlam</span>
                    <small className="m-0 p-0 text-white">
                        {' '}
                        Plano: Premium 💎
                    </small>
                </div>
                <div className="ml-auto dropdown" ref={dropdownRef}>
                    <Dropdown
                        show={dropdownOpen}
                        onToggle={handleDropdownToggle}
                    >
                        <Dropdown.Toggle
                            style={{
                                border: 'none', // Remover borda
                                boxShadow: 'none', // Remover sombra
                                backgroundColor: 'transparent', // Remover cor de fundo
                            }}
                            id="dropdown-basic"
                        >
                            <img
                                src="https://i.pinimg.com/originals/7a/9c/c3/7a9cc36f478969da92e2e9fee391a5b2.jpg"
                                alt="Profile"
                                style={{
                                    width: '50px',
                                    borderRadius: '100%',
                                    cursor: 'pointer',
                                }}
                            />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleLogout}>
                                Sair
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
}

export default Header;
