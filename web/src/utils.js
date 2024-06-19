export default {
    hourToMinutes: (hourMinute) => {
        const [hour, minutes] = hourMinute.split(':');
        return parseInt(hour, 10) * 60 + parseInt(minutes, 10);
    },
};
