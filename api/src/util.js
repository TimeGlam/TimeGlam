import moment from "moment";

module.exports = {
  SLOT_DURATION: 30, // MINUTOS
  isOpened: async (horarios) => {
    // VERIFICANDO SE EXISTE REGISTRO NAQUELE DIA DA SEMANA
    const horariosDia = horarios.filter((h) => h.dias.includes(moment().day()));
    if (horariosDia.length > 0) {
      // VERIFICANDO HORARIOS
      for (let h of horariosDia) {
        const inicio = moment(moment(h.inicio).format("HH:mm"), "HH:mm:ss");
        const fim = moment(moment(h.fim).format("HH:mm"), "HH:mm:ss");
        if (moment().isBetween(inicio, fim)) {
          return true;
        }
      }
      return false;
    }
    return false;
  },
  toCents: (price) => {
    return parseInt(price.toString().replace(".", "").replace(",", ""));
  },
  hourToMinutes: (hourMinute) => {
    const [hour, minutes] = hourMinute.split(":");
    return parseInt(parseInt(hour) * 60 + parseInt(minutes));
  },
  sliceMinutes: (start, end, duration, validation = true) => {
    const slices = [];
    let count = 0;

    const now = moment();
    start = moment(start);
    end = moment(end);

    while (end > start) {
      if (
        start.format("YYYY-MM-DD") === now.format("YYYY-MM-DD") &&
        validation
      ) {
        if (start.isAfter(now)) {
          slices.push(start.format("HH:mm"));
        }
      } else {
        slices.push(start.format("HH:mm"));
      }

      start = start.add(duration, "minutes");
      count++;
    }
    return slices;
  },
  mergeDateTime: (date, time) => {
    const merged = `${moment(date).format("YYYY-MM-DD")}T${moment(time).format(
      "HH:mm"
    )}`;
    return merged;
  },
  splitByValue: (array, value) => {
    let newArray = [[]];
    array.forEach((item) => {
      if (item !== value) {
        newArray[newArray.length - 1].push(item);
      } else {
        newArray.push([]);
      }
    });
    return newArray;
  },
};
