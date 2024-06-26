import React from 'react';
import Modal from 'react-bootstrap/Modal'; // Supondo que você esteja usando Bootstrap para o modal

const EventoModal = ({ evento, mostrar, fecharModal }) => {
    return (
        <Modal show={mostrar} onHide={fecharModal}>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Evento</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>Título:</strong> {evento.title}
                </p>
                <p>
                    <strong>Início:</strong> {evento.start.toLocaleString()}
                </p>
                <p>
                    <strong>Fim:</strong> {evento.end.toLocaleString()}
                </p>
                {/* Adicione mais informações do evento conforme necessário */}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-danger" onClick={fecharModal}>
                    Fechar
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default EventoModal;
