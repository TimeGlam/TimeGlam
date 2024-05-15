import { Notification } from 'rsuite';

export const notification = (type, params) => {
    Notification[type](params);
};
