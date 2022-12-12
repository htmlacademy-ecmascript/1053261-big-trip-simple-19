import dayjs from 'dayjs';
import { DATE_TIME_FORMAT } from './constants/date-time-format';

function getRandomArrayElement (items) {
  return items[Math.floor(Math.random() * items.length)];
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export const formatDateTimeForHtmlAttribute = (date) => dayjs(date).format(DATE_TIME_FORMAT.HTML);
export const formatDateForDisplay = (date) => dayjs(date).format(DATE_TIME_FORMAT.POINT_DATE);
export const formatTimeForDisplay = (date) => dayjs(date).format(DATE_TIME_FORMAT.POINT_TIME);
export const formatDateTimeForForm = (date) => dayjs(date).format(DATE_TIME_FORMAT.POINT_DATE_TIME_FORM);

export { getRandomArrayElement, onlyUnique };
