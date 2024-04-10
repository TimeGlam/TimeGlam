import { all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';
export function* filtrarAgendamento({ start, end }) {
    try {
    } catch (error) {}
}

export default all([takeLatest('@agendamento/FILTER', filtrarAgendamento)]);
