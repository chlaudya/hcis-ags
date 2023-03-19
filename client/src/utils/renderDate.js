import moment from 'moment';
import 'moment/locale/id';

export const renderDate = (date) => {
  moment.locale('id');
  const dateFormatted = new Date(date);
  return moment(dateFormatted).format('LL');
};

export const getMonthYearDate = (date) => {
  moment.locale('id');
  return moment(date).format('l');
};
