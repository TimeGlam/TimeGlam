import { useEffect } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';
import Table from '../../components/Table/Index';
import { useDispatch, useSelector } from 'react-redux';
import { allClientes } from '../../store/modules/cliente/actions';
function Clientes() {
    const dispatch = useDispatch();

    const { clientes } = useSelector((state) => state.clientes);
    useEffect(() => {
        dispatch(allClientes);
    }, []);
    return (
        <div className="col p-5 overflow-auto h-100">
            <div className="row">
                <div className="col-12">
                    <div className="w-100 d-flex justify-content-between">
                        <h2 className="mb-4 mt-0">Clientes</h2>
                        <div>
                            <button className="btn btn-primary btn-lg">
                                {/*
                                <span className="mdi mdi-plus">
                                    Adicionar cliente
                                </span>  */}

                            </button>
                        </div>
                    </div>
                    <Table
                        data={clientes}
                        config={[
                            {
                                label: 'Nome',
                                key: 'nome',
                                width: 300,
                                fixed: true,
                            },
                            {
                                label: 'E-mail',
                                key: 'email',
                            },
                        ]}
                        actions={(cliente) => (
                            <Button appearance="primary" color="blue" size="xs">
                                INFORMAÇÕES
                            </Button>
                        )}
                        onRowClick={(cliente) => {
                            alert(cliente.firstName);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Clientes;
