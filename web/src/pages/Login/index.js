import React, { useState, useEffect } from 'react';
import logo from '../../assets/timeglamLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../store/modules/estabelecimento/actions';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'rsuite';
import '../../styles.css'; // Importa o arquivo de estilos CSS

const Login = () => {
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            navigate('/');
        }
    }, [token, navigate]);

    const handleChange = (value, name) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const { email, password } = formData;
        dispatch(loginRequest(email, password));
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center gradient-background"
            style={{ minHeight: '100vh' }}
        >
            <img src={logo} className="logo " alt="Logo" />
            <div className="col-md-6">
                <Form fluid>
                    <Form.Group>
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control
                            name="email"
                            value={formData.email}
                            placeholder="Digite seu email"
                            onChange={(value) => handleChange(value, 'email')}
                            style={{ width: '60%' }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Senha</Form.ControlLabel>
                        <Form.Control
                            name="password"
                            type="password"
                            placeholder="Digite sua senha"
                            value={formData.password}
                            onChange={(value) =>
                                handleChange(value, 'password')
                            }
                            style={{ width: '60%' }}
                        />
                    </Form.Group>
                    <Button
                        className="custom-primary-button"
                        appearance="primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Form>
            </div>
        </div>
    );
};

export default Login;
